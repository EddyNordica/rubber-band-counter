import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';
import App from '../App.svelte';
import { TestAutomationId } from '../app/consts/TestAutomationId';
import { MaxCount } from '../app/counter';

window.alert = jest.fn().mockImplementation(() => true);
window.confirm = jest.fn().mockImplementation(() => true);

describe('Counter and buttons', () => {
  afterEach(() => {
    // Restore the mocked 'window.prompt' method.
    jest.restoreAllMocks();
  });

  test('The counter is 0 by default', () => {
    const { getByTestId } = render(App);
    const counterValue = getByTestId(TestAutomationId.CounterValue);

    expect(counterValue).toBeInTheDocument();
    expect(counterValue.textContent).toBe('0');
  });

  test('The increase button is enabled by default', () => {
    const { getByTestId } = render(App);
    const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
  
    expect(increaseButton).toBeInTheDocument();
    expect(increaseButton).toBeEnabled();
  });
  
  test('The decrease button is disabled by default', () => {
    const { getByTestId } = render(App);
    const decreaseButton = getByTestId(TestAutomationId.DecreaseButton);
  
    expect(decreaseButton).toBeInTheDocument();
    expect(decreaseButton).toHaveAttribute('aria-disabled', 'true');
    expect(decreaseButton).not.toBeDisabled();
  });
  
  test('Clicking on the increase/decrease buttons updates the counter', async () => {
    const { getByTestId } = render(App);
    const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
    const decreaseButton = getByTestId(TestAutomationId.DecreaseButton);
    const counterValue = getByTestId(TestAutomationId.CounterValue);
  
    const parsedCounterValue = parseInt(counterValue.textContent);
  
    await fireEvent.click(increaseButton);
  
    expect(counterValue.textContent).toBe(`${parsedCounterValue + 1}`);
    expect(decreaseButton).toBeEnabled();
  
    await fireEvent.click(decreaseButton);
  
    expect(counterValue.textContent).toBe(`${parsedCounterValue}`);
    expect(decreaseButton).toHaveAttribute('aria-disabled', 'true');
    expect(decreaseButton).not.toBeDisabled();
  });

  test('Reset button clears the counter value', async () => {
    const { getByTestId } = render(App);
    const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
    const counterValue = getByTestId(TestAutomationId.CounterValue);
    const counterResetButton = getByTestId(TestAutomationId.CounterResetButton);

    await fireEvent.click(increaseButton);

    expect(counterValue.textContent).not.toBe('0');

    await fireEvent.click(counterResetButton);

    expect(counterValue.textContent).toBe('0');
  });

  test('The increase button is disabled if maximum number is reached', async () => {
    jest.spyOn(window, 'prompt').mockImplementation(() => `${MaxCount}`);

    const { getByTestId } = render(App);
    const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
    const counterSetButton = getByTestId(TestAutomationId.CounterSetButton);
    const counterValue = getByTestId(TestAutomationId.CounterValue);

    // Verify that the warning text is not shown.
    expect(() => getByTestId(TestAutomationId.WarningText)).toThrow();

    // Set the counter to the maximum value.
    await fireEvent.click(counterSetButton);

    expect(increaseButton).toHaveAttribute('aria-disabled', 'true');
    expect(increaseButton).not.toBeDisabled();

    // Try to increase the counter.
    await fireEvent.click(increaseButton);

    // Verify that clicking on the button doesn't change the count.
    const parsedCounterValue = parseInt(counterValue.textContent);
    expect(parsedCounterValue).toBe(MaxCount);

    // Verify that the warning text is shown.
    expect(() => getByTestId(TestAutomationId.WarningText)).not.toThrow();
  });
});

describe('Updating counter', () => {
  const testCases = [
    { name: 'Valid integer', value: '1234567890', pass: true },
    { name: 'Parsable integer', value: '123 :)', expected: '123', pass: true },
    { name: 'Decimal number', value: '1.5', expected: '1', pass: true },
    { name: 'Zero', value: '0', pass: true },
    { name: 'Maximum possible count - 1', value: `${MaxCount - 1}`, pass: true },
    { name: 'Maximum possible count', value: `${MaxCount}`, pass: true },
    { name: 'Maximum possible count + 1', value: `${MaxCount}`, pass: false },
    { name: 'Negative integer', value: '-1234567890', pass: false },
    { name: 'Invalid integer', value: '１２３', pass: false },
    { name: 'Large integer', value: '999999999999999999999999', pass: false },
  ];

  testCases.forEach(testCase => {
    test(testCase.name, async () => {
      jest.spyOn(window, 'prompt').mockImplementation(() => `${testCase.value}`);

      const { getByTestId } = render(App);
      const counterValue = getByTestId(TestAutomationId.CounterValue);
      const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
      const counterSetButton = getByTestId(TestAutomationId.CounterSetButton);

      // Increase the counter once so setting to 0 can be tested.
      await fireEvent.click(increaseButton);

      const originalCounterValue = counterValue.textContent;

      await fireEvent.click(counterSetButton);

      if (testCase.pass) {
        expect(counterValue.textContent).toBe(testCase.expected ?? testCase.value);
      } else {
        expect(counterValue.textContent).toBe(originalCounterValue);
      }
    });
  });
});

describe('Bulk Buttons', () => {
  test('Using the bulk-add button does not crash when the count overflows', async () => {
    const initialValue = MaxCount - 60;
    jest.spyOn(window, 'prompt').mockImplementation(() => `${initialValue}`);

    const { getByTestId } = render(App);
    const counterValue = getByTestId(TestAutomationId.CounterValue);
    const add100Button = getByTestId(TestAutomationId.Add100Button);
    const counterSetButton = getByTestId(TestAutomationId.CounterSetButton);

    await fireEvent.click(counterSetButton);

    // Make sure the button is set to the correct value first.
    let parsedCounterValue = parseInt(counterValue.textContent);
    expect(parsedCounterValue).toBe(initialValue);

    await fireEvent.click(add100Button);

    // If adding 100 exceeds the limit, the counter should be set to the max possible value.
    parsedCounterValue = parseInt(counterValue.textContent);
    expect(parsedCounterValue).toBe(MaxCount);
  });

  test('Using the bulk-remove button does not crash when the count underflows', async () => {
    const initialValue = 60;
    jest.spyOn(window, 'prompt').mockImplementation(() => `${initialValue}`);

    const { getByTestId } = render(App);
    const counterValue = getByTestId(TestAutomationId.CounterValue);
    const remove100Button = getByTestId(TestAutomationId.Remove100Button);
    const counterSetButton = getByTestId(TestAutomationId.CounterSetButton);

    await fireEvent.click(counterSetButton);

    // Make sure the button is set to the correct value first.
    let parsedCounterValue = parseInt(counterValue.textContent);
    expect(parsedCounterValue).toBe(initialValue);

    await fireEvent.click(remove100Button);

    // If adding 100 exceeds the limit, the counter should be set to the max possible value.
    parsedCounterValue = parseInt(counterValue.textContent);
    expect(parsedCounterValue).toBe(0);
  });
});
