<script lang="ts">
  import { pickAnimation, shouldAnimate } from '../app/animation';
  import { TestAutomationId } from '../app/consts/TestAutomationId';
  import { counterName, counterUnit } from '../app/stores/app';
  import { counter, canIncrease, canDecrease } from '../app/stores/counter';
  import { counterAmount } from '../app/stores/counterAmount';
  import Animated from '../ui/components/Animated.svelte';
  import Button from '../ui/components/Button.svelte';
  import MessageBar from '../ui/components/MessageBar.svelte';
  import TokenizedText from '../ui/components/TokenizedText.svelte';
  import ButtonStack from '../ui/layout/ButtonStack.svelte';
  import ButtonStackItem from '../ui/layout/ButtonStackItem.svelte';
  import Page from '../ui/layout/Page.svelte';
  import CounterAmountSlider from '../ui/widgets/CounterAmountSlider.svelte';
  import Footer from '../ui/widgets/Footer.svelte';
</script>

<style lang="scss">
  @import '../ui/styles/vars';

  .header {
    margin-bottom: 0px;
  }

  .counter {
    // This is necessary since the animation doesn't work on inline elements.
    display: inline-block;

    font-size: 2.5rem;
    margin: 2rem 0px;
  }
</style>

<Page>
  <div slot="header">
    <h1 class="header">
      <TokenizedText text={[$counterName, 'カウンター']} />
    </h1>
  </div>

  <div class="counter">
    <Animated
      animation={pickAnimation($counter)}
      animate={shouldAnimate($counter)}
    >
      <span data-testid={TestAutomationId.CounterValue} aria-live="polite">
        {$counter}
      </span>
      <span>{$counterUnit}目</span>
    </Animated>
  </div>

  <CounterAmountSlider />

  <ButtonStack fluid>
    <ButtonStackItem>
      <Button
        testId={TestAutomationId.IncreaseButton}
        text="増やす"
        tall
        fluid
        disabled={!canIncrease($counter)}
        on:click={() => counter.addCount($counterAmount)}
      />
    </ButtonStackItem>
    <ButtonStackItem>
      <Button
        testId={TestAutomationId.DecreaseButton}
        text="減らす"
        tall
        fluid
        disabled={!canDecrease($counter)}
        on:click={() => counter.removeCount($counterAmount)}
      />
    </ButtonStackItem>
  </ButtonStack>

  {#if !canIncrease($counter)}
    <MessageBar
      testId={TestAutomationId.WarningText}
      text="もうこれ以上は増やせません。"
      type="warning"
    />
  {/if}

  <ButtonStack>
    <ButtonStackItem>
      <Button
        testId={TestAutomationId.CounterResetButton}
        text="リセット"
        on:click={counter.promptReset}
      />
    </ButtonStackItem>

    <ButtonStackItem>
      <Button
        testId={TestAutomationId.CounterSetButton}
        text="手動入力"
        on:click={counter.promptNewCount}
      />
    </ButtonStackItem>
  </ButtonStack>

  <Footer slot="footer" />
</Page>
