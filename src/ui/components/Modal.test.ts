import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/svelte';
import { KeyCode } from '../../app/consts/KeyCode';
import { TestAutomationId } from '../../app/consts/TestAutomationId';
import Modal from './Modal.svelte';

const DefaultModalOptions = {
  title: 'Modal',
  restoreFocusId: '',
  onClose: () => {},
};

describe('a11y tests', () => {
  test('Verify a11y attributes are set', () => {
    const { getByRole } = render(Modal, DefaultModalOptions);
    const modal = getByRole('dialog');

    expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  test('aria-labelledby is set', () => {
    const { getByRole, getByText } = render(Modal, DefaultModalOptions);
    const modal = getByRole('dialog');
    const title = getByText(DefaultModalOptions.title);

    expect(modal).toHaveAttribute('aria-labelledby', title.id);
  });

  test('aria-describedby is set', async () => {
    const descriptionId = 'description-id';
    const { getByRole } = render(Modal, {
      ...DefaultModalOptions,
      descriptionId,
    });
    const modal = getByRole('dialog');

    expect(modal).toHaveAttribute('aria-describedby', descriptionId);
  });
});

describe('Closing modal', () => {
  test('Clicking dismiss icon closes the modal', async () => {
    let onCloseInvoked = false;
    const { getByTestId } = render(Modal, {
      ...DefaultModalOptions,
      onClose: () => {
        onCloseInvoked = true;
      },
    });
    const dismissIcon = getByTestId(TestAutomationId.ModalDismissIcon);

    await fireEvent.click(dismissIcon);

    expect(onCloseInvoked).toBe(true);
  });

  test('Clicking on the overlay closes the modal', async () => {
    let onCloseInvoked = false;
    const { getByTestId } = render(Modal, {
      ...DefaultModalOptions,
      onClose: () => {
        onCloseInvoked = true;
      },
    });
    const dismissIcon = getByTestId(TestAutomationId.ModalOverlay);

    await fireEvent.click(dismissIcon);

    expect(onCloseInvoked).toBe(true);
  });

  test('Clicking on the overlay does not close the modal if it is blocking', async () => {
    let onCloseInvoked = false;
    const { getByTestId } = render(Modal, {
      ...DefaultModalOptions,
      isBlocking: true,
      onClose: () => {
        onCloseInvoked = true;
      },
    });
    const dismissIcon = getByTestId(TestAutomationId.ModalOverlay);

    await fireEvent.click(dismissIcon);

    expect(onCloseInvoked).toBe(false);
  });

  test('Pressing Esc closes the modal', async () => {
    let onCloseInvoked = false;
    render(Modal, {
      ...DefaultModalOptions,
      onClose: () => {
        onCloseInvoked = true;
      },
    });

    await fireEvent.keyUp(document.body, { code: KeyCode.Escape });

    expect(onCloseInvoked).toBe(true);
  });
});

describe('Focus tests', () => {
  test('Dismiss icon is focused on mount', (done) => {
    const { getByTestId } = render(Modal, DefaultModalOptions);
    const dismissIcon = getByTestId(TestAutomationId.ModalDismissIcon);

    window.setTimeout(() => {
      expect(document.activeElement).toBe(dismissIcon);
      done();
    }, 0);
  });

  // Testing focus trap and restoreFocusId are not tested since keyboard navigation
  // are not supported in JSDOM. This can only be tested in browsers.
  // Consider using https://testing-library.com/docs/pptr-testing-library/intro/
});
