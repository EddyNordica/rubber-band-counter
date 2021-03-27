<script lang="ts">
  import { onMount } from 'svelte';
  import classnames from 'classnames';
  import type { AnimationName } from '../../app/animation';

  let element: HTMLDivElement;

  onMount(() => {
    const animationEndHandler = () => {
      element.classList.remove(animation);
    };
    element.addEventListener('animationend', animationEndHandler);

    return () => {
      element.removeEventListener('animationend', animationEndHandler);
    };
  });

  export let animate: boolean;
  export let animation: AnimationName;
</script>

<div
  class={classnames('animated', { [animation]: animate })}
  bind:this={element}
>
  <slot />
</div>
