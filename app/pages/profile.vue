<script lang="ts" setup>
import { UserUpdateForm } from '#shared/schemas/frontend/user';
import type { PatchUserRequest } from '#shared/schemas/backend/user';

const { me, fetchMe } = useMe();
await fetchMe();

useSeoMeta({
  title: "Your profile | Wealth Tracker",
  description: "Check out your profile on the best financial tracking tool"
});

async function logout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  location.reload()
}

async function patch() {
  try {
    const body: PatchUserRequest = {
      name: form.name,
      displayName: form.displayName,
      email: form.email,
      currencyId: form.currencyId,
      password: form.password
    }
    
    await $fetch("/api/users/me", {
      method: "PATCH",
      body
    });
    location.reload();
  } catch {
    error.value = "Something went wrong";
  }
}

const formDefaults = { password: "", confirmPassword: "", ...me.value! }
const { form, error, submit } = useFormWithDefaults(UserUpdateForm, formDefaults, patch)

const { displayCurrencies, error: fetchError } = useCurrencies();
const currency = ref("");

watchEffect(() => {
  if (!!me.value && !!displayCurrencies.value) {
    currency.value = displayCurrencies.value[me.value.currencyId - 1] || "";
  }
});

watch(currency, async (newCurrency) => {
  form.currencyId = displayCurrencies.value.findIndex((c) => c === newCurrency) + 1;
});
</script>

<template>
  <div class="heading">
    <h1><strong>{{ me?.displayName }}</strong> <em>({{ me?.name }})</em></h1>
    <p>Your Wealth Tracker profile</p>  
  </div>
  <div class="settings">
    <form @submit.prevent="submit">
      <h2>General information</h2>
      <AppTextbox v-model="form.name" type="text">Profile name</AppTextbox>
      <AppTextbox v-model="form.displayName" type="text">Display name</AppTextbox>
      <RekaSelect v-model="currency" :items="displayCurrencies">Preferred currency</RekaSelect>
      <h2>Danger zone</h2>
      <AppTextbox v-model="form.email" type="email">Email</AppTextbox>
      <AppTextbox v-model="form.password" type="password">New password</AppTextbox>
      <AppTextbox v-model="form.confirmPassword" type="password">Re-type new password</AppTextbox>
      <p v-if="error" class="error-msg">{{ error }}</p>
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