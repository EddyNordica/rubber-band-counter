<script lang="ts">
  export let text: string;
  export let href: string;
  export let external = false;
</script>

<a {href} target={external ? '_blank' : undefined}>
  {text}
</a>
