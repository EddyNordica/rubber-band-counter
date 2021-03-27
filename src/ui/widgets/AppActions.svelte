<script lang="ts">
  import { TestAutomationId } from '../../app/consts/TestAutomationId';
  import { counter } from '../../app/stores/counter';
  import Button from '../components/Button.svelte';
  import ButtonStack from '../layout/ButtonStack.svelte';
  import ButtonStackItem from '../layout/ButtonStackItem.svelte';
  import PromptCountModal from './PromptCountModal.svelte';

  const PromptCountButtonId = 'prompt-count';

  let showPrompCountModal = false;
</script>

<ButtonStack>
  <ButtonStackItem>
    <Button
      testId={TestAutomationId.CounterResetButton}
      text="リセット"
      on:click={counter.promptReset}
    />
  </ButtonStackItem>

  <ButtonStackItem>
    <Button
      id={PromptCountButtonId}
      testId={TestAutomationId.CounterSetButton}
      text="手動入力"
      on:click={() => {
        showPrompCountModal = true;
      }}
    />
  </ButtonStackItem>
</ButtonStack>

{#if showPrompCountModal}
  <PromptCountModal
    restoreFocusId={PromptCountButtonId}
    onClose={() => {
      showPrompCountModal = false;
    }}
  />
{/if}
