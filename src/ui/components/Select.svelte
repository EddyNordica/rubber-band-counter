<script lang="ts">
  export let value: unknown;
  export let options: Array<{ value: unknown; label: string }>;
  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;
</script>

<style lang="scss">
  .select {
    width: 100%;
    padding: 5px;
  }
</style>

<select
  {id}
  {name}
  class="select"
  bind:value
  on:change
  on:blur={() => {
    // See https://github.com/sveltejs/svelte/issues/4946
  }}
>
  {#each options as option}
    <option value={option.value}>
      {option.label}
    </option>
  {/each}
</select>
