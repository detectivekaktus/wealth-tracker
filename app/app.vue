<script lang="ts" setup>
const checked = ref(true);
</script>

<template>
  <RekaCheckbox v-model="checked">Blah blah blah</RekaCheckbox>
  <RekaCheckbox v-model="checked" disabled>Blah blah blah</RekaCheckbox>
</template>
