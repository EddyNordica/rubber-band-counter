import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';
import { TestAutomationId } from '../../app/consts/TestAutomationId';
import ConfirmDialog from './ConfirmDialog.svelte';

const DefaultConfirmDialogOptions = {
  text: 'ConfirmDialog',
  restoreFocusId: '',
  onClose: () => {},
  onConfirm: () => {},
};

test('Focus is set on the No button on mount', (done) => {
  const { getByTestId } = render(ConfirmDialog, DefaultConfirmDialogOptions);
  const noButton = getByTestId(TestAutomationId.ConfirmDialogNoButton);

  window.setTimeout(() => {
    expect(document.activeElement).toBe(noButton);
    done();
  }, 0);
});

test('It is a blocking dialog', async () => {
  let onCloseInvoked = false;
  const { getByTestId } = render(ConfirmDialog, {
    ...DefaultConfirmDialogOptions,
    onClose: () => {
      onCloseInvoked = true;
    },
  });
  const overlay = getByTestId(TestAutomationId.ModalOverlay);

  await fireEvent.click(overlay);

  expect(onCloseInvoked).toBe(false);
});

test('Description Id is set', () => {
  const { getByRole, getByText } = render(
    ConfirmDialog,
    DefaultConfirmDialogOptions
  );
  const modal = getByRole('dialog');
  const textElement = getByText(DefaultConfirmDialogOptions.text);

  expect(textElement.id).toBe(modal.getAttribute('aria-describedby'));
});

test('Dismiss icon is hidden', async () => {
  const { getByTestId } = render(ConfirmDialog, DefaultConfirmDialogOptions);

  expect(() => getByTestId(TestAutomationId.ModalDismissIcon)).toThrow();
});

test('onConfirm is invoked when clicking on the yes button', async () => {
  let onConfirmInvoked = false;
  const onCancelInvoked = false;
  let onCloseInvoked = false;
  const { getByTestId } = render(ConfirmDialog, {
    ...DefaultConfirmDialogOptions,
    onConfirm: () => {
      onConfirmInvoked = true;
    },
    onClose: () => {
      onCloseInvoked = true;
    },
  });
  const yesButton = getByTestId(TestAutomationId.ConfirmDialogYesButton);

  expect(onConfirmInvoked).toBe(false);
  expect(onCancelInvoked).toBe(false);
  expect(onCloseInvoked).toBe(false);

  await fireEvent.click(yesButton);

  expect(onConfirmInvoked).toBe(true);
  expect(onCancelInvoked).toBe(false);
  expect(onCloseInvoked).toBe(true);
});

test('onCancel is invoked when clicking on the yes button', async () => {
  const onConfirmInvoked = false;
  let onCancelInvoked = false;
  let onCloseInvoked = false;
  const { getByTestId } = render(ConfirmDialog, {
    ...DefaultConfirmDialogOptions,
    onCancel: () => {
      onCancelInvoked = true;
    },
    onClose: () => {
      onCloseInvoked = true;
    },
  });
  const noButton = getByTestId(TestAutomationId.ConfirmDialogNoButton);

  expect(onConfirmInvoked).toBe(false);
  expect(onCancelInvoked).toBe(false);
  expect(onCloseInvoked).toBe(false);

  await fireEvent.click(noButton);

  expect(onConfirmInvoked).toBe(false);
  expect(onCancelInvoked).toBe(true);
  expect(onCloseInvoked).toBe(true);
});
