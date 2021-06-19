<script lang="ts">
  import { onMount } from 'svelte';
  import Rollbar from 'rollbar';
  import { init } from './app/init';
  import Index from './routes/Index.svelte';

  if (process.env.NODE_ENV === 'production') {
    new Rollbar({
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      captureIp: false,
      enabled: process.env.NODE_ENV === 'production',
      payload: {
        environment: process.env.NODE_ENV,
      },
    });
  }

  onMount(init);
</script>

<style lang="scss" global>
  @import 'normalize.css';
  @import './ui/styles/animation';
</style>

<Index />
