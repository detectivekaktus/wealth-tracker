<script lang="ts" setup>
/**
 * A labeled checkbox component powered by Reka UI.
 * 
 * @prop {boolean | "indeterminate"} modelValue A value binded with v-model directive
 * @prop {boolean?} disabled If `true` disables the component
 * @prop {boolean?} required If `true` requires the checkbox to be checked
 * 
 * @emits "update:modelValue" An event fired when v-model-binded value changes
 */
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui';

const props = defineProps<{
  modelValue: boolean | "indeterminate",
  disabled?: boolean,
  required?: boolean
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: boolean | "indeterminate"): void
}>();
</script>

<template>
<label class="checkbox-label">
  <CheckboxRoot
  class="checkbox-root"
  :disabled="props.disabled"
  :required="props.required"
  :model-value="props.modelValue"
  @update:model-value="emits('update:modelValue', $event)">
    <CheckboxIndicator class="checkbox-indicator">
      <Icon name="mynaui:check" />
    </CheckboxIndicator>
  </CheckboxRoot>
  <span>
    <slot />
  </span>
</label>
</template>

<style scoped>
.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-100);
}

.checkbox-root {
  width: 20px;
  height: 20px;
  background-color: var(--clr-neutral-100);
  border: 1px solid var(--clr-accent-500);
  border-radius: 7px;
}

.checkbox-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>