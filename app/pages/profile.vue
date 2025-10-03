<script lang="ts" setup>
const me = useMe();

useSeoMeta({
  title: "Your profile | Wealth Tracker",
  description: "Check out your profile on the best financial tracking tool"
});

async function logout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  location.reload()
}

const { displayCurrencies, error: fetchError } = useCurrencies();
</script>

<template>
  <div class="heading">
    <h1><strong>{{ me?.displayName }}</strong> <em>({{ me?.name }})</em></h1>
    <p>Your Wealth Tracker profile</p>  
  </div>
  <div class="settings">
    <h2>General information</h2>
    <form @submit.prevent="submit">
      <AppTextbox type="text">Display name</AppTextbox>
      <AppTextbox type="email">Email</AppTextbox>
      <RekaSelect :items="displayCurrencies">Preferred currency</RekaSelect>
      <p v-if="fetchError" class="error-msg">{{ fetchError }}</p>
      <AppButton>Save profile changes</AppButton>
      <AppButton @click="logout" type="button">Log out</AppButton>
    </form>
  </div>
</template>

<style scoped>
h1 {
  font-size: var(--size-700);
}

.heading {
  margin-bottom: var(--spacing-300);
}

h2 {
  font-size: var(--size-600);
}

form {
  display: grid;
  gap: var(--spacing-200);
}
</style>