<script lang="ts">
  import Button from './Button.svelte';
  import Modal from './Modal.svelte';

  const NoButtonId = 'no-btn';
  const DialogTextId = 'dialog-text';

  export let text: string;
  export let restoreFocusId: string;
  export let onConfirm: () => void;
  export let onCancel: (() => void) | undefined = undefined;
  export let onClose: () => void;
  export let confirmText: string | undefined = undefined;
  export let cancelText: string | undefined = undefined;
  export let isBlocking = true;
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
  <div>{text}</div>
  <div class="actions">
    <div class="btn">
      <Button
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
