<script lang="ts" setup>
import { type Currency } from "#shared/types/api/currency";
import { AuthSchema } from "#shared/types/api/auth";
import z from "zod";

// TODO: Implement sign with Google.
definePageMeta({
  layout: "auth"
});

useSeoMeta({
  title: "Sign up | Wealth Tracker",
  description: "Sign up to Wealth Tracker to keep track of your financial resources today!"
})

const { data: currencies, error: fetchError } = await useFetch<Currency[]>("/api/currencies");
//                                 data.value ?? [] = if data.value is nullish, use [] instead
const displayCurrencies = computed(() => (currencies.value ?? []).map((c) => `${c.name} (${c.code})`));
const currency = ref("");

const SignupSchema = AuthSchema.extend({
  username: z.string().min(4, "The username is too short.").max(32, "The username is too long."),
  name: z.string().min(4, "The display name is too short.").max(32, "The display name is too long."),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, "The passwords don't match.");
const { form, error, submit } = useForm(SignupSchema, signup);

async function signup() {
  // TODO: POST /api/auth/signup
}
</script>

<template>
  <div class="container page-root">
    <div class="content-wrapper">
      <h1>Let's start 🚀</h1>
      <form @submit.prevent="submit">
        <AppTextbox v-model="form.username" type="text" required>
          Username
        </AppTextbox>
        <AppTextbox v-model="form.name" type="text" required>
          Display name
        </AppTextbox>
        <AppTextbox v-model="form.email" type="email" required>
          Email
        </AppTextbox>
        <RekaSelect :items="displayCurrencies" v-model="currency" placeholder="Select preferred currency..." required>
          Currency
        </RekaSelect>
        <AppTextbox v-model="form.password" type="password" required>
          Password
        </AppTextbox>
        <AppTextbox v-model="form.confirmPassword" type="password" required>
          Confirm password
        </AppTextbox>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <!-- TODO: If there's a fetch error with 5xx response code, render a whole different page with the error -->
        <p v-if="fetchError" class="error-msg">{{ fetchError.message }}</p>
        <AppButton>Sign up</AppButton>
      </form>
      <div class="other-options">
        <p>Already have an account? <NuxtLink to="/login">Log in</NuxtLink></p>
        <p>OR</p>
        <AppButton type="external">Sign up with Google</AppButton>
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