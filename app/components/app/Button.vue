<script lang="ts" setup>
/**
 * A styled button component. This component supports different
 * styles for a standard button, hovered button, focused button
 * and disabled button.
 * 
 * @prop {"button" | "submit" | "reset"} type - HTML native button types
 * @prop {"external"} variation - Optional variant for the
 * button featuring default, white, outlined, and danger.
 * 
 * @slot default - The content of the button
 */
const props = defineProps<{
  type?: "button" | "submit" | "reset",
  variation?: "default" | "outlined" | "danger",
  disabled?: boolean
}>();
</script>

<template>
  <button
  class="button"
  :type="props.type"
  :disabled="props.disabled"
  :data-variation="props.variation">
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
  border-radius: var(--br-secondary);
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

/* outlined variant */
.button[data-variation="outlined"] {
  border: 1px solid var(--clr-accent-500);
  background-color: var(--clr-neutral-200);
  color: var(--clr-neutral-800);
}

.button[data-variation="outlined"]:hover,
.button[data-variation="outlined"]:focus {
  background-color: var(--clr-accent-500);
  color: var(--clr-neutral-200);
}

.button[data-variation="outlined"]:disabled {
  border: 1px solid var(--clr-neutral-500);
  background-color: var(--clr-neutral-400);
  color: var(--clr-neutral-500);
}


/* danger variant */
.button[data-variation="danger"] {
  background-color: var(--clr-danger-500);
  color: var(--clr-neutral-200);
}

.button[data-variation="danger"]:hover,
.button[data-variation="danger"]:focus {
  background-color: var(--clr-danger-600);
}

.button[data-variation="danger"]:disabled {
  background-color: var(--clr-danger-400);
  color: var(--clr-neutral-400);
}
</style>