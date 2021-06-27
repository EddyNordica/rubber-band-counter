import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, Matcher } from '@testing-library/svelte';
import App from '../App.svelte';
import { DefaultAppSettings } from '../app/consts/DefaultAppSettings';
import { TestAutomationId } from '../app/consts/TestAutomationId';
import { MaxCount } from '../db/counter';

const enterCounterAmount = async (
  amount: number | string,
  getByTestId: (id: string) => HTMLElement,
  queryByTestId: (text: Matcher) => HTMLElement | null,
  expectError?: boolean
): Promise<void> => {
  const counterSetButton = getByTestId(TestAutomationId.CounterSetButton);
  await fireEvent.click(counterSetButton);

  const counterAmountInput = getByTestId(TestAutomationId.CounterAmountInput);
  await fireEvent.change(counterAmountInput, { target: { value: amount } });

  const submitFromButton = getByTestId(TestAutomationId.FormSaveButton);
  await fireEvent.click(submitFromButton);

  // Wait until the modal is closed.
  await waitFor(() => {
    expectError
      ? expect(getByTestId(TestAutomationId.FormFieldError)).toBeInTheDocument()
      : expect(
          queryByTestId(TestAutomationId.CounterAmountInput)
        ).not.toBeInTheDocument();
  });
};

describe('Counter and buttons', () => {
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

    const parsedCounterValue = parseInt(`${counterValue.textContent}`);

    await fireEvent.click(increaseButton);

    expect(counterValue.textContent).toBe(`${parsedCounterValue + 1}`);
    expect(decreaseButton).toBeEnabled();

    await fireEvent.click(decreaseButton);

    expect(counterValue.textContent).toBe(`${parsedCounterValue}`);
    expect(decreaseButton).toHaveAttribute('aria-disabled', 'true');
    expect(decreaseButton).not.toBeDisabled();
  });

  test('Slider can change the counter amount', async () => {
    const { getByTestId } = render(App);
    const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
    const decreaseButton = getByTestId(TestAutomationId.DecreaseButton);
    const counterValue = getByTestId(TestAutomationId.CounterValue);
    const slider = getByTestId(TestAutomationId.CounterAmountSlider);

    const parsedCounterValue = parseInt(`${counterValue.textContent}`);

    await fireEvent.input(slider, { target: { value: 100 } });

    await fireEvent.click(increaseButton);

    expect(counterValue.textContent).toBe(`${parsedCounterValue + 100}`);

    await fireEvent.click(decreaseButton);

    expect(counterValue.textContent).toBe(`${parsedCounterValue}`);
  });

  test('Reset button clears the counter value', async () => {
    const { getByTestId } = render(App);
    const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
    const counterValue = getByTestId(TestAutomationId.CounterValue);
    const counterResetButton = getByTestId(TestAutomationId.CounterResetButton);

    await fireEvent.click(increaseButton);

    expect(counterValue.textContent).not.toBe('0');

    await fireEvent.click(counterResetButton);

    const yesButton = getByTestId(TestAutomationId.ConfirmDialogYesButton);

    await fireEvent.click(yesButton);

    expect(counterValue.textContent).toBe('0');
  });

  test('The counter can be manually changed', async () => {
    const { getByTestId, queryByTestId } = render(App);
    const counterValue = getByTestId(TestAutomationId.CounterValue);

    const initialParsedCounterValue = parseInt(`${counterValue.textContent}`);

    const amount = 1234;
    await enterCounterAmount(amount, getByTestId, queryByTestId);

    const parsedCounterValue = parseInt(`${counterValue.textContent}`);
    expect(initialParsedCounterValue).not.toBe(parsedCounterValue);
    expect(parsedCounterValue).toBe(amount);
  });

  test('The increase button is disabled if maximum number is reached', async () => {
    const { getByTestId, queryByTestId } = render(App);
    const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
    const counterValue = getByTestId(TestAutomationId.CounterValue);

    // Verify that the warning text is not shown.
    expect(() => getByTestId(TestAutomationId.WarningText)).toThrow();

    // Set the counter to the maximum value.
    await enterCounterAmount(MaxCount, getByTestId, queryByTestId);

    expect(increaseButton).toHaveAttribute('aria-disabled', 'true');
    expect(increaseButton).not.toBeDisabled(); // Disabled buttons use aria-disabled instead of allow focus.

    // Try to increase the counter.
    await fireEvent.click(increaseButton);

    // Verify that clicking on the button doesn't change the count.
    const parsedCounterValue = parseInt(`${counterValue.textContent}`);
    expect(parsedCounterValue).toBe(MaxCount);

    // Verify that the warning text is shown.
    expect(() => getByTestId(TestAutomationId.WarningText)).not.toThrow();
  });
});

describe('Updating counter', () => {
  const testCases = [
    {
      name: 'Valid integer',
      value: '1234567890',
      pass: true,
    },
    { name: 'Parsable integer', value: '123 :)', pass: false },
    { name: 'Decimal number', value: '1.5', pass: false },
    { name: 'Zero', value: '0', pass: true },
    {
      name: 'Maximum possible count - 1',
      value: `${MaxCount - 1}`,
      pass: true,
    },
    { name: 'Maximum possible count', value: `${MaxCount}`, pass: true },
    {
      name: 'Maximum possible count + 1',
      value: `${MaxCount + 1}`,
      pass: false,
    },
    { name: 'Negative integer', value: '-1234567890', pass: false },
    { name: 'Invalid integer', value: '１２３', pass: false },
    { name: 'Large integer', value: '999999999999999999999999', pass: false },
  ];

  testCases.forEach((testCase) => {
    test(testCase.name, async () => {
      const { getByTestId, queryByTestId } = render(App);
      const counterValue = getByTestId(TestAutomationId.CounterValue);
      const increaseButton = getByTestId(TestAutomationId.IncreaseButton);

      // Increase the counter once so setting to 0 can be tested.
      await fireEvent.click(increaseButton);

      await enterCounterAmount(
        testCase.value,
        getByTestId,
        queryByTestId,
        !testCase.pass
      );

      if (testCase.pass) {
        expect(counterValue.textContent).toBe(testCase.value);
      }
    });
  });
});

describe('Settings', () => {
  test('Settings can be updated and cleared', async () => {
    const CounterName = 'CounterName';
    const CounterUnit = 'Unit';
    const CounterAmount = '123';

    const { getByTestId, getByRole, getByText, queryByTestId } = render(App);

    // First, reset the counter.
    const counterResetButton = getByTestId(TestAutomationId.CounterResetButton);
    await fireEvent.click(counterResetButton);
    const doResetButton = getByTestId(TestAutomationId.ConfirmDialogYesButton);
    await fireEvent.click(doResetButton);
    await waitFor(() => {
      expect(
        queryByTestId(TestAutomationId.ConfirmDialogYesButton)
      ).not.toBeInTheDocument();
    });

    const settingsButton = getByTestId(TestAutomationId.AppSettingsButton);
    await fireEvent.click(settingsButton);

    // Set custom settings.
    const dialog = getByRole('dialog');
    const counterName = dialog.querySelector("[name='counterName']");
    if (counterName != null) {
      await fireEvent.change(counterName, { target: { value: CounterName } });
    }
    const counterUnit = dialog.querySelector("[name='counterUnit']");
    if (counterUnit != null) {
      await fireEvent.change(counterUnit, { target: { value: CounterUnit } });
    }
    const counterAmount = dialog.querySelector("[name='counterAmount']");
    if (counterAmount != null) {
      await fireEvent.change(counterAmount, {
        target: { value: CounterAmount },
      });
    }

    // Submit the form.
    const submitFromButton = getByTestId(TestAutomationId.FormSaveButton);
    await fireEvent.click(submitFromButton);
    await waitFor(() => {
      expect(
        queryByTestId(TestAutomationId.FormSaveButton)
      ).not.toBeInTheDocument();
    });

    // Verify the settings are applied.
    expect(getByText(CounterName)).toBeInTheDocument();
    expect(getByText(`${CounterAmount}${CounterUnit}ずつ`));

    // Verify that the counter amount is changed.
    const increaseButton = getByTestId(TestAutomationId.IncreaseButton);
    const counterValue = getByTestId(TestAutomationId.CounterValue);
    let initialParsedCounterValue = parseInt(`${counterValue.textContent}`);
    await fireEvent.click(increaseButton);
    let parsedCounterValue = parseInt(`${counterValue.textContent}`);
    expect(parsedCounterValue).toBe(
      initialParsedCounterValue + parseInt(CounterAmount)
    );

    // Reset the settings.
    await fireEvent.click(settingsButton);
    const resetSettings = getByTestId(TestAutomationId.ResetSettingsButton);
    await fireEvent.click(resetSettings);
    const yesButton = getByTestId(TestAutomationId.ConfirmDialogYesButton);
    await fireEvent.click(yesButton);
    await waitFor(() => {
      expect(
        queryByTestId(TestAutomationId.ConfirmDialogYesButton)
      ).not.toBeInTheDocument();
    });
    const dismissIcon = getByTestId(TestAutomationId.ModalDismissIcon);
    await fireEvent.click(dismissIcon);
    await waitFor(() => {
      expect(
        queryByTestId(TestAutomationId.ModalDismissIcon)
      ).not.toBeInTheDocument();
    });

    // Verify the settings are reverted.
    expect(getByText(DefaultAppSettings.counterName)).toBeInTheDocument();
    expect(
      getByText(
        `${DefaultAppSettings.counterAmount}${DefaultAppSettings.counterUnit}ずつ`
      )
    ).toBeInTheDocument();

    // Verify that the counter amount is reverted.
    initialParsedCounterValue = parseInt(`${counterValue.textContent}`);
    await fireEvent.click(increaseButton);
    parsedCounterValue = parseInt(`${counterValue.textContent}`);
    expect(parsedCounterValue).toBe(
      initialParsedCounterValue + DefaultAppSettings.counterAmount
    );
  });

  test('Counter Amount cannot be less than 1', async () => {
    const { getByTestId, getByRole, queryByTestId } = render(App);

    const settingsButton = getByTestId(TestAutomationId.AppSettingsButton);
    await fireEvent.click(settingsButton);

    // Set the counter amount to 0.
    const dialog = getByRole('dialog');
    const counterAmount = dialog.querySelector("[name='counterAmount']");
    if (counterAmount != null) {
      await fireEvent.change(counterAmount, {
        target: { value: 0 },
      });
    }

    // Submit the form. This should result in an error.
    const submitFromButton = getByTestId(TestAutomationId.FormSaveButton);
    await fireEvent.click(submitFromButton);
    await waitFor(() => {
      expect(getByTestId(TestAutomationId.FormFieldError)).toBeInTheDocument();
    });

    // Set the counter amount to 1.
    if (counterAmount != null) {
      await fireEvent.change(counterAmount, {
        target: { value: 1 },
      });
    }

    // Submit the form. This should succeed.
    await fireEvent.click(submitFromButton);
    await waitFor(() => {
      expect(
        queryByTestId(TestAutomationId.ModalDismissIcon)
      ).not.toBeInTheDocument();
    });
  });
});
