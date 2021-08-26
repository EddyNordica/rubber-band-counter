<script lang="ts">
  import { TestAutomationId } from '../../app/consts/TestAutomationId';
  import { counterUnit } from '../../db/counterUnit';
  import { counterAmount } from '../../db/counterAmount';

  const onInput = (e: Event) => {
    const element = e.target as HTMLInputElement;
    const value = parseInt(element.value);

    if (value === 0) {
      counterAmount.set(1);
    } else {
      counterAmount.set(value);
    }
  };

  const StepCount = 5;
  const MaxCount = 200;
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

  @include media-h-breakpoint-down($__breakpoint-sm) {
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
    aria-label="一度に増減させる数"
    data-testid={TestAutomationId.CounterAmountSlider}
    class="input"
    type="range"
    min="0"
    max={`${MaxCount}`}
    step={`${StepCount}`}
    aria-valuemin={1}
    aria-valuemax={MaxCount}
    aria-valuenow={$counterAmount}
    value={$counterAmount}
    on:input={onInput}
  />
  <span class="indicator">{$counterAmount}{$counterUnit}ずつ</span>
</div>
