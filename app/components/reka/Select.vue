<script setup lang="ts">
import { SelectArrow, SelectContent, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectRoot, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, SelectViewport } from 'reka-ui';

/**
 * Select box component.
 *
 * @props {string[]} items Items to be displayed inside the select.
 * @props {string?} placeholder
 * @props {boolean?} required If `true` makes the select requireable.
 */
const props = defineProps<{
  modelValue: string,
  items: string[],
  placeholder?: string,
  required?: boolean
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void
}>();
</script>

<template>
  <label>
    <slot />
    <SelectRoot
      :model-value="props.modelValue"
      @update:model-value="emits('update:modelValue', $event)"
      :required="props.required">
      <SelectTrigger class="select-trigger input">
        <SelectValue :placeholder="props.placeholder" />
        <Icon name="material-symbols:arrow-drop-down" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent class="select-content">
          <SelectScrollUpButton class="select-scroll-button">
            <Icon name="material-symbols:arrow-drop-up" />
          </SelectScrollUpButton>
          <SelectViewport class="select-viewport">
            <SelectGroup>
              <SelectItem
              v-for="(item, index) in props.items"
              :key="index"
              :value="item"
              class="select-item">
                <SelectItemIndicator class="select-item-indicator">
                  <Icon name="material-symbols:check-rounded" />
                </SelectItemIndicator>
                <SelectItemText>
                  {{ item }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
          </SelectViewport>
          <SelectScrollDownButton class="select-scroll-button" />
          <SelectArrow />
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </label>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: column;
}

.select-trigger {
  padding: 5px;
  display: inline-flex;
  gap: 5px;
  border: none;
  border-radius: var(--br-secondary);
  background-color: var(--clr-accent-500);
  color: var(--clr-neutral-200);
  transition: background-color .3s;
}

.select-trigger:hover {
  cursor: pointer;
  background-color: var(--clr-accent-600);
}

:global(.select-content) {
  box-shadow: 0 0 5px var(--clr-neutral-500);
  border-radius: var(--br-secondary);
  background-color: var(--clr-neutral-100);
}

:global(.select-viewport) {
  padding: var(--spacing-100);
}

.select-scroll-button {
  color: var(--clr-accent-500);
}

.select-item[data-highlighted] {
  color: var(--clr-neutral-200);
  background-color: var(--clr-accent-500);
}

.select-item-indicator {
  color: var(--clr-accent-500);
}

.select-item[data-highlighted] .select-item-indicator {
  color: var(--clr-neutral-200);
}
</style>