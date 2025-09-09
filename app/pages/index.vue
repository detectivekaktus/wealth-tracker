<script lang="ts" setup>
useSeoMeta({
  title: "Wealth Tracker",
  description: "See your financial history and plan your future on this website!"
});

const items = ["foo", "bar", "buzz", "bazz"];
</script>

<template>
  <!-- <h1>hello world</h1> -->
   <RekaSelect :items placeholder="Select" />
</template>