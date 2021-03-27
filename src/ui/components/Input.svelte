<script lang="ts">
  export let value: string | number;
  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;
</script>

<style lang="scss">
  .input {
    width: 100%;
  }
</style>

<input {id} {name} class="input" bind:value on:change />
