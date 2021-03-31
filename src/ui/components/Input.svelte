<script lang="ts">
  import { getContext } from 'svelte';
  import { FormFieldContextKey } from './FormFieldContext';
  import type { FormFieldContext } from './FormFieldContext';

  const errorId = getContext<FormFieldContext>(FormFieldContextKey);

  export let value: string | number;
  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let testId: string | undefined = undefined;
</script>

<style lang="scss">
  .input {
    width: 100%;

    padding: 5px 10px;
  }
</style>

<input
  {id}
  {name}
  data-testid={testId}
  class="input"
  type="text"
  aria-describedby={$errorId}
  bind:value
  on:change
/>
