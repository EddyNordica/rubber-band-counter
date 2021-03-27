<script lang="ts">
  import { onMount } from 'svelte';
  import { init } from './app/init';
  import Index from './routes/Index.svelte';

  onMount(init);
</script>

<style lang="scss" global>
  @import 'normalize.css';
  @import './ui/styles/animation';
</style>

<Index />
