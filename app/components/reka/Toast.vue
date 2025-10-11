<script setup lang="ts">
import { ToastAction, ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'reka-ui';

// TODO: When there are 2 or more toasts on the page, they overlap each other.

/**
 * Toast component. Evokes a toast message and sends `action` emit when
 * a click on the action button occurs. 
 */
const props = defineProps<{
  title: string,
  description: string
}>();

const emits = defineEmits<{
  (e: "action"): void
}>();

const open = ref(false);
const timerRef = ref(0);

function handleClick() {
  open.value = false;
  window.clearTimeout(timerRef.value);
  timerRef.value = window.setTimeout(() => {
    open.value = true;
  }, 100);
  emits("action");
}
</script>

<template>
  <ToastProvider>
    <AppButton @click="handleClick">
      <slot />
    </AppButton>

    <ToastRoot v-model:open="open" class="toast-root">
      <div class="toast-content-wrapper">
        <ToastTitle class="toast-title">
          {{ props.title }}
        </ToastTitle>
        <ToastDescription class="toast-description">
          {{ props.description }}
        </ToastDescription>
      </div>
      <ToastAction as-child alt-text="Ok" class="toast-action">
        <AppButton>Ok</AppButton>
      </ToastAction>
    </ToastRoot>
    <ToastViewport class="toast-viewport" />
  </ToastProvider>
</template>

<style>
.toast-viewport {
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-300);
  max-width: 100vw;
  margin: 0;
  z-index: 999;
}

.toast-root {
  background-color: var(--clr-neutral-200);
  display: flex;
  border-radius: var(--br-primary);
  padding: var(--spacing-200);
  box-shadow: 0 0 3px var(--clr-neutral-500);
  gap: var(--spacing-300);
}

.toast-title {
  font-size: var(--size-600);
  font-weight: var(--fw-bold);
  padding-bottom: var(--spacing-50);
}

.toast-content-wrapper {
  display: flex;
  flex-direction: column;
}
</style>