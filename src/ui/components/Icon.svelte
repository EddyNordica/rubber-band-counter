<script lang="ts">
  import classnames from 'classnames';
  import type { IconName } from '../../app/consts/IconName';

  const assetDir = '';

  export let icon: IconName;
</script>

<style lang="scss">
  .icon {
    // Use em instead of rem to resize the icon relative the font size.
    height: 1em;
    width: 1em;

    fill: currentColor;
  }
</style>

<svg class={classnames('icon', `icon-${icon}`)} role="presentation">
  <use xlink:href={`${assetDir}/icons.svg#icon-${icon}`}></use>
</svg>
