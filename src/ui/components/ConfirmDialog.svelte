<script lang="ts">
  import { TestAutomationId } from '../../app/consts/TestAutomationId';
  import { randomId } from '../../lib/utils';

  import Button from './Button.svelte';
  import Modal from './Modal.svelte';

  const id = randomId();
  const NoButtonId = `ConfirmDialog-no-btn-${id}`;
  const DialogTextId = `ConfirmDialog-dialog-text-${id}`;

  export let text: string;
  export let restoreFocusId: string;
  export let onClose: () => void;
  export let onConfirm: () => void;
  export let onCancel: (() => void) | undefined = undefined;
  export let confirmText: string | undefined = undefined;
  export let cancelText: string | undefined = undefined;
  export let isBlocking = false;
</script>

<style lang="scss">
  .actions {
    display: flex;

    margin-top: 1rem;
  }

  .btn {
    margin-right: 8px;

    flex: 1;

    &:last-child {
      margin-right: 0px;
    }
  }
</style>

<Modal
  title={'確認'}
  {restoreFocusId}
  focusedId={NoButtonId}
  descriptionId={DialogTextId}
  {onClose}
  {isBlocking}
  hideDismissIcon
>
  <div id={DialogTextId}>{text}</div>
  <div class="actions">
    <div class="btn">
      <Button
        testId={TestAutomationId.ConfirmDialogYesButton}
        primary
        fluid
        text={confirmText ?? 'はい'}
        on:click={() => {
          onConfirm();
          onClose();
        }}
      />
    </div>
    <div class="btn">
      <Button
        id={NoButtonId}
        testId={TestAutomationId.ConfirmDialogNoButton}
        fluid
        text={cancelText ?? 'いいえ'}
        on:click={() => {
          onCancel?.();
          onClose();
        }}
      />
    </div>
  </div>
</Modal>
