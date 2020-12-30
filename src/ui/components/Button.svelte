<script lang="ts">
  import classnames from 'classnames';

  // Used to block the invocation when the button is disabled.
  // This blocks it for both click and keyboard events.
  const onBeforeComponentClick = (e: MouseEvent): void => {
    if (disabled) {
      e.stopImmediatePropagation();
    }
  };

  export let text: string;
  export let tall: boolean = false;
  export let fluid: boolean = false;
  export let disabled: boolean = false;
  export let testId: string = undefined;
</script>

<style lang="scss">
  @import "../styles/helpers";
  @import "../styles/vars";

  .btn {
    @include ui-theme('light') {
      --btn-bg-color: #f4f4f4;
      --btn-bg-color--active: #ddd;
      --btn-text-color--disabled: #999;
      --btn-border-color: #ccc;
      --btn-border-color--disabled: #ddd;
    }

    @include ui-theme('dark') {
      --btn-bg-color: #222;
      --btn-bg-color--active: #313131;
      --btn-text-color--disabled: #666;
      --btn-border-color: #767676;
      --btn-border-color--disabled: #2c2c2c;
    }

    background-color: var(--btn-bg-color);
    border: 1px solid var(--btn-border-color);
    border-radius: 2px;

    cursor: pointer;
    color: var(--text-color);
    padding: $__spacing-unit;

    &--fluid {
      width: 100%;
    }

    &--tall {
      height: 90px;
    }

    &--disabled {
      cursor: default;

      color: var(--btn-text-color--disabled);
      border-color: var(--btn-border-color--disabled);
    }

    &:not(&--disabled):active {
      background-color: var(--btn-bg-color--active);
    }
  }
</style>

<button
  data-testid={testId}
  class={classnames(
    'btn',
    { 'btn--tall': tall },
    { 'btn--fluid': fluid },
    { 'btn--disabled': disabled }
  )}
  aria-disabled={disabled ? "true" : undefined}
  on:click={onBeforeComponentClick}
  on:click
>
  {text}
</button>
