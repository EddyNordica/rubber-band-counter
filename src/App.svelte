<script lang="ts">
  import { onMount } from 'svelte';
  import Rollbar from 'rollbar';
  import { init } from './app/init';
  import Index from './routes/Index.svelte';

  try {
    new Rollbar({
      accessToken: '61c914e7f5bd4fca9d22b5f65f1d4b06',
      captureUncaught: true,
      captureUnhandledRejections: true,
      captureIp: false,
      payload: {
        environment: process.env.NODE_ENV,
      },
    });
  } catch (e) {
    // For making jest test to run.
  }

  onMount(init);
</script>

<style lang="scss" global>
  @import 'normalize.css';
  @import './ui/styles/animation';
</style>

<Index />
