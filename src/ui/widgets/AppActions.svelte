<script lang="ts">
  import { TestAutomationId } from '../../app/consts/TestAutomationId';
  import { counter } from '../../db/counter';
  import Button from '../components/Button.svelte';
  import ConfirmDialog from '../components/ConfirmDialog.svelte';
  import ButtonStack from '../layout/ButtonStack.svelte';
  import ButtonStackItem from '../layout/ButtonStackItem.svelte';
  import PromptCountModal from './PromptCountModal.svelte';

  const PromptResetButtonId = 'AppActions-prompt-reset';
  const PromptCountButtonId = 'AppAcitons-prompt-count';

  let showResetDialog = false;
  let showPromptCountModal = false;
</script>

<ButtonStack>
  <ButtonStackItem>
    <Button
      id={PromptResetButtonId}
      testId={TestAutomationId.CounterResetButton}
      text="リセット"
      on:click={() => {
        showResetDialog = true;
      }}
    />
  </ButtonStackItem>

  <ButtonStackItem>
    <Button
      id={PromptCountButtonId}
      testId={TestAutomationId.CounterSetButton}
      text="手動入力"
      on:click={() => {
        showPromptCountModal = true;
      }}
    />
  </ButtonStackItem>
</ButtonStack>

{#if showResetDialog}
  <ConfirmDialog
    text="カウンターをリセットしますか？"
    restoreFocusId={PromptResetButtonId}
    onConfirm={() => {
      counter.reset();
    }}
    onClose={() => {
      showResetDialog = false;
    }}
  />
{/if}

{#if showPromptCountModal}
  <PromptCountModal
    restoreFocusId={PromptCountButtonId}
    onClose={() => {
      showPromptCountModal = false;
    }}
  />
{/if}
