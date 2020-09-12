<script lang="ts">
  export let labelId: string;
  export let value: unknown;
  export let options: Array<{ value: unknown, label: string}>;
</script>

<style lang="scss">
  .select {
    width: 100%;
  }
</style>

<select
  class="select"
  aria-labelledby={labelId}
  value={value}
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
