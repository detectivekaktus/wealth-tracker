<script lang="ts" setup>
const checked = ref(true);
</script>

<template>
  <RekaCheckbox v-model="checked">
    I accept the <a href="#">Terms and Conditions</a>
  </RekaCheckbox>
</template>
