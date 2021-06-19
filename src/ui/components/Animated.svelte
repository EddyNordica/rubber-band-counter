<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import classnames from 'classnames';
  import type { AnimationName } from '../../app/animation';

  let element: HTMLDivElement;
  let updateCount: number | null = null;
  $: afterInitialRender = updateCount != null && updateCount > 0;

  onMount(() => {
    const animationEndHandler = () => {
      element.classList.remove(animation);
    };
    element.addEventListener('animationend', animationEndHandler);

    return () => {
      element.removeEventListener('animationend', animationEndHandler);
    };
  });

  afterUpdate(() => {
    if (updateCount == null) {
      updateCount = 0;
    } else {
      const nextCount = (updateCount + 1) % 100;
      if (nextCount === 0) {
        updateCount = 1;
      } else {
        updateCount = nextCount;
      }
    }
  });

  export let animate: boolean;
  export let animation: AnimationName;
</script>

<div
  class={classnames('animated', {
    [animation]: animate && afterInitialRender,
  })}
  bind:this={element}
>
  <slot />
</div>
