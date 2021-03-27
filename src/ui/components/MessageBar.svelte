<script lang="ts">
  import classnames from 'classnames';
  import Icon from './Icon.svelte';
  import { IconName } from '../../app/consts/IconName';

  const getIcon = (): IconName => {
    switch (type) {
      case 'warning':
        return IconName.Warning;
      default:
        throw new Error('Invalid message bar type.');
    }
  };

  export let text: string;
  export let type: 'warning';
  export let testId: string | undefined = undefined;
</script>

<style lang="scss">
  @import '../styles/helpers';

  .container {
    @include ui-theme('light') {
      --message-text-color: var(--text-color);
    }
    @include ui-theme('dark') {
      --message-text-color: var(--bg-color);
    }

    margin: 1rem 0px;
    padding: 10px;
    color: var(--message-text-color);
    &.warning {
      background-color: var(--warning-color);
    }
  }

  .text {
    display: inline-block;
    height: 1rem;
  }
</style>

<div
  data-testid={testId}
  class={classnames('container', { ['warning']: type === 'warning' })}
>
  <Icon icon={getIcon()} />
  <span class="text">{text}</span>
</div>
