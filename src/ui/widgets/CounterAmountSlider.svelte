<script lang="ts">
  import { TestAutomationId } from '../../app/consts/TestAutomationId';
  import { counterUnit } from '../../app/stores/app';
  import { counterAmount } from '../../app/stores/counterAmount';

  const onInput = (e: Event) => {
    const element = e.target as HTMLInputElement;
    const value = parseInt(element.value);

    if (value === 0) {
      counterAmount.set(1);
    } else {
      counterAmount.set(value);
    }
  };
</script>

<style lang="scss">
  @import '../styles/helpers';
  @import '../styles/vars';

  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center; // Vertically aligns the input field.
  }

  .input {
    width: 40%;
    height: 2rem;
    margin-right: $__spacing-unit;
  }

  @include media-breakpoint-down($__breakpoint-sm) {
    .input {
      width: 100%;
      text-align: right;
    }

    .indicator {
      margin-left: auto;
    }
  }
</style>

<div class="container">
  <input
    data-testid={TestAutomationId.CounterAmountSlider}
    class="input"
    type="range"
    min="0"
    max="500"
    step="10"
    value={$counterAmount}
    on:input={onInput}
  />
  <span class="indicator">{$counterAmount}{$counterUnit}ずつ</span>
</div>
