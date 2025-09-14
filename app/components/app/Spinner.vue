<script lang="ts" setup>
const props = defineProps<{
  pending: boolean
}>();
</script>

<template>
  <Icon v-if="props.pending" name="svg-spinners:180-ring" class="spinner" />
  <slot v-else />
</template>

<style scoped>
.spinner {
  color: var(--clr-accent-500);
}
</style>