<script lang="ts">
  import classnames from 'classnames';

  export let fluid: boolean = false;
</script>

<style lang="scss">
  @import "../styles/helpers";
  @import "../styles/vars";

  .btn-stack {
    display: flex;

    &--fluid {
      > :global(.btn-stack__item) {
        flex: 1px;
        width: 100%;
      }
    
      @include media-breakpoint-down($__breakpoint-md) {
        flex-wrap: wrap;

        > :global(.btn-stack__item) {
          flex: none;
          margin-right: 0px!important;

          &:not(:last-child) {
            margin-bottom: $__spacing-unit;
          }
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

<div class={classnames(
  'btn-stack',
  { ['btn-stack--fluid']: fluid }
)}>

  <slot />

</div>