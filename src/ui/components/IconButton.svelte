<script lang="ts">
  import Icon from './Icon.svelte';
  import type { IconName } from '../../app/consts/IconName';

  export let title: string;
  export let icon: IconName;
  export let id: string | undefined = undefined;
  export let testId: string | undefined = undefined;
</script>

<style lang="scss">
  @import '../styles/vars';

  $base-size: 1.25rem;

  .icon-btn {
    background-color: transparent;
    border: none;

    cursor: pointer;

    color: var(--text-color);

    // Makes the size of the button the same as the icon.
    font-size: $base-size;
    height: $base-size + $__spacing-unit * 2; // Adjust the height based on the amount of padding added.
    padding: $__spacing-unit;
    line-height: 1; // Removes the style from normalize.css
  }
</style>

<button {id} class="icon-btn" {title} data-testid={testId} on:click>
  <Icon {icon} />
</button>
