<script lang="ts" setup>
/**
 * A styled button component. This component supports different
 * styles for a standard button, hovered button, focused button
 * and disabled button.
 * 
 * @prop {"external"} datatype - Optional variant for the
 * button referencing external resources (eg. Sign in with Google).
 * 
 * @slot default - The content of the button
 */
const props = defineProps<{
  datatype?: "external"
}>();
</script>

<template>
  <button class="button" :datatype="props.datatype">
    <slot />
  </button>
</template>

<style scoped>
/* Global */
.button:hover {
  cursor: pointer;
}

.button:disabled {
  cursor: not-allowed;
}

/* Default variant */
.button {
  background-color: var(--clr-accent-500);
  color: var(--clr-neutral-200);
  border: none;
  border-radius: 5px;
  padding: 8px;
  transition: all .3s;
}

.button:hover,
.button:focus {
  outline: none;
  background-color: var(--clr-accent-600);
  transition: all .3s;
}

.button:disabled {
  background-color: var(--clr-accent-300);
}

/* External variant */
.button[datatype="external"] {
  border: 1px solid var(--clr-neutral-800);
  background-color: var(--clr-neutral-200);
  color: var(--clr-neutral-800);
}

.button[datatype="external"]:hover,
.button[datatype="external"]:focus {
  background-color: var(--clr-neutral-300);
  color: var(--clr-neutral-800);
}

.button[datatype="external"]:disabled {
  border: 1px solid var(--clr-neutral-500);
  background-color: var(--clr-neutral-400);
  color: var(--clr-neutral-500);
}
</style>