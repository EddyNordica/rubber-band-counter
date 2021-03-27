<script lang="ts">
  import Icon from './Icon.svelte';
  import type { IconName } from '../../app/consts/IconName';

  export let text: string;
  export let id: string | undefined = undefined;
  export let icon: IconName | undefined = undefined;
  export let testId: string | undefined = undefined;
</script>

<style lang="scss">
  @import '../styles/vars';

  .link-btn {
    background-color: transparent;
    border: none;

    cursor: pointer;
    color: var(--text-color);
    padding: $__spacing-unit 0rem;

    &:hover,
    &:focus,
    &:active {
      > .link-btn__content:after {
        content: ' ';

        background-color: var(--text-color);

        height: 0.1em; // Set the border width relative to its font size.
        width: 100%;

        position: absolute;
        left: 0;
        bottom: 0;
      }
    }

    .link-btn__content {
      position: relative;
    }

    .link-btn__icon {
      vertical-align: middle;
    }
  }
</style>

<button data-testid={testId} {id} type="button" class="link-btn" on:click>
  <div class="link-btn__content">
    {#if icon}
      <span class="link-btn__icon">
        <Icon {icon} />
      </span>
    {/if}

    <span>{text}</span>
  </div>
</button>
