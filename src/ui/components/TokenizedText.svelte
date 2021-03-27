<script lang="ts">
  export let text: string[];
</script>

<style lang="scss">
  .tokenized {
    display: inline-block;
  }
</style>

{#each text as token}
  <span class="tokenized">{token}</span>
{/each}
