<script lang="ts">
  import { getContext } from 'svelte';
  import { FormFieldContextKey, FormFieldContext } from './FormFieldContext';

  export let value: string | number;
  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;

  const errorId = getContext<FormFieldContext>(FormFieldContextKey);
</script>

<style lang="scss">
  .input {
    width: 100%;
  }
</style>

<input
  {id}
  {name}
  class="input"
  aria-describedby={$errorId}
  bind:value
  on:change
/>
