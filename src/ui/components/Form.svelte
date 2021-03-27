<script lang="ts">
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
    <slot name="form-footer" />
  </div>
</form>
