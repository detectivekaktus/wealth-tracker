<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui';
/**
 * Tooltip component. Wrap the content you want to have a tooltip on and
 * have a tooltip.
 * 
 * @prop {string} tooltip The tooltip shown when hovering the component.
 * @prop {boolean?} disabled If `true` disables the component.
 * @prop {"reserve"} type Styles that can be appliede to the tooltip.
 */
const props = defineProps<{
  tooltip: string,
  disabled?: boolean,
  type?: "reverse"
}>();
</script>

<template>
  <TooltipProvider :delay-duration="400" :disabled="props.disabled">
    <TooltipRoot>
      <TooltipTrigger>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent class="tooltip-content" :datatype="props.type">
          {{ tooltip }}
          <TooltipArrow :width="8" class="tooltip-arrow" :datatype="props.type"/>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<style scoped>
button {
  all: unset;
}

:global(.tooltip-content) {
  padding: var(--spacing-100);
  border-radius: var(--br-primary);
  background-color: var(--clr-accent-500);
  color: var(--clr-neutral-200);
  box-shadow: 0 0 5px var(--clr-neutral-500);
}

:global(.tooltip-arrow) {
  fill: var(--clr-accent-500);
}

/* Reverse */
:global(.tooltip-content[datatype="reverse"]) {
  background-color: var(--clr-neutral-200);
  color: var(--clr-accent-500);
}

:global(.tooltip-arrow[datatype="reverse"]) {
  fill: var(--clr-neutral-200);
}
</style>