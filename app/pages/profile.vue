<script lang="ts" setup>
import { UserUpdateForm } from '#shared/schemas/frontend/user';
import type { PatchUserRequest } from '#shared/schemas/backend/user';
import CurrencySelect from '~/components/app/CurrencySelect.vue';

useSeoMeta({
  title: "Your profile | Wealth Tracker",
  description: "Check out your profile on the best financial tracking tool"
});

const { me, fetchMe } = useMe();
await fetchMe();

if (!me.value) {
  showError({
    statusCode: 500,
    statusMessage: "Something went wrong..."
  });
}

async function logout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  await navigateTo("/login");
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

const formDefaults = { password: "", confirmPassword: "", ...me.value! }; // me.value! is always defined because it's 
                                                                          // handled above with `if (!me.value)` check
const { form, error, submit } = useFormWithDefaults(UserUpdateForm, formDefaults, patch);
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
      <CurrencySelect v-model="form.currencyId">Preferred currency</CurrencySelect>
      <h2>Danger zone</h2>
      <AppTextbox v-model="form.email" type="email">Email</AppTextbox>
      <AppTextbox v-model="form.password" type="password">New password</AppTextbox>
      <AppTextbox v-model="form.confirmPassword" type="password">Re-type new password</AppTextbox>
      <p v-if="error" class="error-msg">{{ error }}</p>
      <RekaToast title="Success!" description="Your profile data has been updated!">Save profile changes</RekaToast>
      <AppButton @click="logout" type="button" variation="outlined">Log out</AppButton>
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