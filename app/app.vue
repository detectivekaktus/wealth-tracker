<script lang="ts" setup>
const text = ref("");
</script>

<template>
  <AppTextbox v-model="text" type="text"/>
  <AppTextbox v-model="text" type="text" disabled/>
  <span>{{ text }}</span>
</template>
