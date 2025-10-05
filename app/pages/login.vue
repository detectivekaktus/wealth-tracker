<script lang="ts" setup>
import { LoginSchema } from '#shared/schemas/backend/auth';
import { useBlankForm } from '~/composables/useBlankForm';

definePageMeta({
  layout: "auth"
});

useSeoMeta({
  title: "Log in | Wealth Tracker",
  description: "Log in to Wealth Tracker to keep track of your financial resources today!"
})

const { form, error, submit } = useBlankForm(LoginSchema, login);

async function login() {
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: form
    });
    await navigateTo("/");
  } catch (e) {
    error.value = "Something went wrong.";
  }
}
</script>

<template>
  <div class="container page-root">
    <div class="content-wrapper">
      <h1>Welcome back 👋</h1>
      <form @submit.prevent="submit">
        <AppTextbox v-model="form.email" type="email" required>Email</AppTextbox>
        <AppTextbox v-model="form.password" type="password" required>Password</AppTextbox>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <AppButton>Log in</AppButton>
      </form>
      <div class="other-options">
        <p>Don't have an account? <NuxtLink to="/signup">Sign up</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-root {
  margin-top: var(--spacing-600);
}

h1 {
  font-size: var(--size-900);
  font-weight: var(--fw-bold);
  text-align: center;
  margin-bottom: var(--spacing-500);
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: var(--spacing-200);
  margin-bottom: var(--spacing-600);
}

.other-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: var(--spacing-200);
}

.other-options p {
  text-align: center;
}

@media (min-width: 50em) {
  .page-root {
    margin-top: var(--spacing-500);
    padding: 0 var(--spacing-600);
  }

  .content-wrapper {
    border: 1px solid var(--clr-neutral-500);
    padding: var(--spacing-500);
  }

  h1 {
    margin-bottom: var(--spacing-300);
  }

  form {
    margin-bottom: var(--spacing-300);
    font-size: var(--size-600);
  }
}
</style>