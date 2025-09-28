<script lang="ts" setup>
useSeoMeta({
  title: "Wealth Tracker",
  description: "See your financial history and plan your future on this website!"
});

async function logout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  location.reload()
}
</script>

<template>
  <h1>hello world</h1>
  <AppButton @click="logout">Logout</AppButton>
</template>