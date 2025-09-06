<script lang="ts" setup>
// TODO: Address the issue with outline offset when the input is selected.

/**
 * Textbox input element. Wraps around native HTML <input> element with
 * custom styles. Renders differently if disabled.
 * 
 * @prop {string} modelValue A value binded with v-model directive
 * @prop {"number" | "text" | "button" | "time" | "image" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "month" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "url" | "week"} type Input type
 * @prop {boolean} disabled If `true` disables the component
 * @prop {boolean} required If `true` requires an input to be given
 */
const props = defineProps<{
  modelValue: string,
  type: "number" | "text" | "button" | "time" | "image" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "month" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "url" | "week",
  disabled?: boolean,
  required?: boolean
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void
}>();
</script>

<template>
<input
  class="input"
  :type="props.type"
  :value="props.modelValue"
  @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)"
  :disabled="props.disabled"
  :required="props.required">
</template>

<style scoped>
input {
  padding: 0 5px;
  background-color: var(--clr-neutral-100);
  border-radius: var(--br-primary);
  border: 1px solid var(--clr-neutral-700);
  transition: ease .3s;
}

input:not(:disabled):hover {
  border: 1px solid var(--clr-accent-400);
  transition: ease .3s;
}

input:not(:disabled):focus {
  border: 1px solid var(--clr-neutral-700);
  outline: 1px solid var(--clr-secondary-400);
  outline-offset: 1px;
  transition: ease .1s;
}

input:disabled {
  color: var(--clr-neutral-600);
  background-color: var(--clr-neutral-400);
}
</style>