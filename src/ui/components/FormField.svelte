<script lang="ts">
  import TokenizedText from './TokenizedText.svelte';
  import { isNonEmptyString } from '../../lib/string';

  export let labelFor: string;
  export let label: string[];
  export let error: string | undefined = undefined;
</script>

<style lang="scss">
  .form-field {
    margin-bottom: 1rem;
  }

  .label {
    font-weight: bold;
  }

  .error {
    line-height: 2;
    font-size: 0.8rem;
    color: red;
  }
</style>

<div class="form-field">
  <label class="label" for={labelFor}>
    <TokenizedText text={label} />
  </label>
  <div>
    <slot />
  </div>

  {#if isNonEmptyString(error)}
    <div class="error">
      {error}
    </div>
  {/if}
</div>
