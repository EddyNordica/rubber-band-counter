import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';
import App from '../App.svelte';
import { TestAutomationId } from '../app/consts/TestAutomationId';

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

  test('The increase button is enabled by defalut', () => {
    const { getByTestId } = render(App);
    const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
  
    expect(increaseButton).toBeInTheDocument();
    expect(increaseButton).toBeEnabled();
  });
  
  test('The decrease button is diasbled by defalut', () => {
    const { getByTestId } = render(App);
    const decreaseButton = getByTestId(TestAutomationId.DecreaseButton);
  
    expect(decreaseButton).toBeInTheDocument();
    expect(decreaseButton).toHaveAttribute('aria-disabled', 'true');
    expect(decreaseButton).not.toBeDisabled();
  });
  
  test('Clicknig on the increase/decrease buttons updates the counter', async () => {
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
    jest.spyOn(window, 'prompt').mockImplementation(() => '9007199254740990'); // Maximum safe integer - 1.

    const { getByTestId } = render(App);
    const counterValue = getByTestId(TestAutomationId.CounterValue);
    const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
    const counterSetButton = getByTestId(TestAutomationId.CounterSetBUtton);

    await fireEvent.click(counterSetButton);

    expect(increaseButton).toBeEnabled();

    await fireEvent.click(increaseButton);

    expect(increaseButton).toHaveAttribute('aria-disabled', 'true');
    expect(increaseButton).not.toBeDisabled();
  });
});

describe('Updating conuter', () => {
  const testCases = [
    { name: 'Valid integer', value: '1234567890', pass: true },
    { name: 'Parsable integer', value: '123 :)', expected: '123', pass: true },
    { name: 'Decimal number', value: '1.5', expected: '1', pass: true },
    { name: 'Zero', value: '0', pass: true },
    { name: 'Largest possible integer', value: '9007199254740990', pass: true }, // Maximum safe interger - 1
    { name: 'Largest possible integer + 1', value: '9007199254740991', pass: false }, // Maximum safe interger
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
      const counterSetButton = getByTestId(TestAutomationId.CounterSetBUtton);

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
