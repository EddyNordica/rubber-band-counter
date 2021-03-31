<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { FormFieldContextKey } from './FormFieldContext';
  import type { FormFieldContext } from './FormFieldContext';
  import TokenizedText from './TokenizedText.svelte';
  import { isNonEmptyString } from '../../lib/string';
  import { TestAutomationId } from '../../app/consts/TestAutomationId';

  export let labelFor: string;
  export let label: string[];
  export let error: string | undefined = undefined;

  const errorId = writable<string | undefined>(undefined);
  $: $errorId = isNonEmptyString(error) ? `error-${labelFor}` : undefined;

  setContext<FormFieldContext>(FormFieldContextKey, errorId);
</script>

<style lang="scss">
  @import '../styles/vars';

  .form-field {
    margin-bottom: 1rem;
  }

  .label {
    font-weight: bold;
  }

  .error {
    line-height: 2;
    font-size: 0.8rem;
    color: var(--error-color);
  }
</style>

<div class="form-field" data-errorId={$errorId}>
  <label class="label" for={labelFor}>
    <TokenizedText text={label} />
  </label>
  <div>
    <slot />
  </div>

  {#if isNonEmptyString(error)}
    <div
      id={$errorId}
      class="error"
      data-testid={TestAutomationId.FormFieldError}
    >
      {error}
    </div>
  {/if}
</div>
