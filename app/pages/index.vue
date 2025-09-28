<script lang="ts" setup>
import { useMe } from '~/composables/useMe';

useSeoMeta({
  title: "Wealth Tracker",
  description: "See your financial history and plan your future on this website!"
});

async function logout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  location.reload()
}

const me = useMe();
</script>

<template>
  <h1>hello world</h1>
  <p>{{ me }}</p>
  <AppButton @click="logout">Logout</AppButton>
</template>