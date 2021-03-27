<script lang="ts">
  import classnames from 'classnames';

  export let fluid: boolean = false;
</script>

<style lang="scss">
  @import '../styles/helpers';
  @import '../styles/vars';

  .btn-stack {
    display: flex;
    flex-wrap: wrap;

    &--fluid {
      > :global(.btn-stack__item) {
        flex: 1px;
        width: 100%;
      }

      @include media-breakpoint-down($__breakpoint-sm) {
        flex-wrap: wrap;

        > :global(.btn-stack__item) {
          flex: none;
          margin-right: 0px !important;
        }
      }
    }

    > :global(.btn-stack__item) {
      &:not(:last-child) {
        margin-right: $__spacing-unit;
      }
    }
  }
</style>

<div class={classnames('btn-stack', { ['btn-stack--fluid']: fluid })}>
  <slot />
</div>
