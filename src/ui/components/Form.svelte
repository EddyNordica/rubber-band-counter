<script lang="ts">
  import { TestAutomationId } from '../../app/consts/TestAutomationId';
  import Button from './Button.svelte';
  export let onSubmit: () => void;
</script>

<style lang="scss">
  .form-footer {
    margin-top: 1.5rem;
  }
</style>

<form on:submit|preventDefault={onSubmit}>
  <slot />
  <div class="form-footer">
    <Button
      testId={TestAutomationId.FormSaveButton}
      type="submit"
      slot="form-footer"
      fluid
      primary
      text="保存"
    />
  </div>
</form>
