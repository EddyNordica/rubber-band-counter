<style lang="scss">
  @use 'sass:math';
  @import '../styles/vars';
  .btn-stack__item {
    margin: math.div($__spacing-unit, 2) 0px;
  }
</style>

<div class="btn-stack__item">
  <slot />
</div>
