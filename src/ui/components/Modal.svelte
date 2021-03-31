<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import * as focusTrap from 'focus-trap';
  import { IconName } from '../../app/consts/IconName';
  import { KeyCode } from '../../app/consts/KeyCode';
  import { TestAutomationId } from '../../app/consts/TestAutomationId';
  import { isNonEmptyString } from '../../lib/string';
  import { randomId } from '../../lib/utils';
  import IconButton from './IconButton.svelte';

  const id = randomId();
  const ModalId = `Modal-modal-${id}`;
  const TitleId = `Modal-title-${id}`;
  const CloseBtnId = `Modal-close-btn-${id}`;

  const onOverlayClicked = (e: MouseEvent): void => {
    if (isBlocking) {
      return;
    }

    if ((e.target as Element).classList?.contains('modal__overlay')) {
      onClose();
    }
  };

  const onBodyKeyUp = (e: KeyboardEvent): void => {
    const modals = document.querySelectorAll("[role='dialog']");
    if (modals[modals.length - 1]?.id !== ModalId) {
      return;
    }

    if (e.code === KeyCode.Escape) {
      onClose();
    }
  };

  onMount(() => {
    const modal = document.getElementById(ModalId);
    if (modal == null) {
      throw new Error('Modal element was not found.');
    }

    const trap = focusTrap.createFocusTrap(modal, {
      initialFocus: isNonEmptyString(focusedId) ? `#${focusedId}` : undefined,
    });
    trap.activate();

    const closeBtn = document.getElementById(CloseBtnId);
    closeBtn?.focus();

    return () => {
      trap.deactivate();

      const restoreElement = document.getElementById(restoreFocusId);
      restoreElement?.focus();
    };
  });

  export let title: string;
  export let restoreFocusId: string;
  export let onClose: () => void;
  export let isBlocking = false;
  export let hideDismissIcon = false;
  export let descriptionId: string | undefined = undefined;
  export let focusedId: string | undefined = undefined;
</script>

<style lang="scss">
  @import '../styles/helpers';
  @import '../styles/vars';

  .modal {
    position: fixed;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    &__overlay {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @include ui-theme('light') {
        --modal-bg-color__overlay: rgba(0, 0, 0, 0.4);
      }
      @include ui-theme('dark') {
        --modal-bg-color__overlay: rgba(255, 255, 255, 0.6);
      }

      background-color: var(--modal-bg-color__overlay);

      -webkit-backdrop-filter: blur(3px);
      backdrop-filter: blur(3px);

      height: 100%;
      width: 100%;
      padding: 80px;

      @include media-breakpoint-down($__breakpoint-lg) {
        padding: 20px;
      }

      @include media-breakpoint-down($__breakpoint-sm) {
        padding: $__spacing-unit;
      }
    }

    &__content-container {
      display: flex;
      flex-direction: column;

      background-color: var(--bg-color);

      padding: 20px;

      border-radius: 4px;

      max-height: 100%;
      max-width: $__breakpoint-lg;
      min-width: 400px;

      @include media-breakpoint-down($__breakpoint-md) {
        min-width: 70vw;
      }
    }

    &__header {
      display: flex;

      > .modal__title {
        flex: 1;
        margin-top: 0px;
      }

      > .modal__close-icon {
        flex: none;
        margin-left: auto;

        // Subtract the same amount of padding used by the IconButton, so
        // it aligns with the padding set around the container.
        margin-top: -$__spacing-unit;
        margin-right: -$__spacing-unit;
      }
    }

    &__content {
      overflow: auto;
    }
  }
</style>

<svelte:body on:keyup={onBodyKeyUp} />

<div
  id={ModalId}
  class="modal"
  role="dialog"
  aria-modal={true}
  aria-labelledby={TitleId}
  aria-describedby={descriptionId}
>
  <div
    class="modal__overlay"
    data-testid={TestAutomationId.ModalOverlay}
    on:click={onOverlayClicked}
    out:fade={{ duration: 110 }}
  >
    <div class="modal__content-container">
      <div class="modal__header">
        <h1 id={TitleId} class="modal__title">{title}</h1>
        {#if !hideDismissIcon}
          <div class="modal__close-icon">
            <IconButton
              id={CloseBtnId}
              testId={TestAutomationId.ModalDismissIcon}
              title="閉じる"
              icon={IconName.Remove}
              on:click={onClose}
            />
          </div>
        {/if}
      </div>

      <div class="modal__content">
        <slot />
      </div>
    </div>
  </div>
</div>
