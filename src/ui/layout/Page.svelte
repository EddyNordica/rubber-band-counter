<style lang="scss">
  @import "../styles/helpers";
  @import "../styles/vars";

  .page {
    margin: $__spacing-unit auto;
    max-width: $__breakpoint-lg;

    @include media-breakpoint-down($__breakpoint-lg) {
      margin: $__spacing-unit;
      max-width: none;
    }
  }
</style>

<div class="page">

  <header>
    <slot name="header"/>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <slot name="footer"/>
  </footer>

</div>
