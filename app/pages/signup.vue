<script lang="ts" setup>
import { type Currency } from "#shared/types/api/currency";
import { SignupSchema, type AuthResponse } from "#shared/types/api/auth";
import z from "zod";

// TODO: Implement sign with Google.
definePageMeta({
  layout: "auth"
});

useSeoMeta({
  title: "Sign up | Wealth Tracker",
  description: "Sign up to Wealth Tracker to keep track of your financial resources today!"
})

const { data: currencies, pending, error: fetchError } = await useFetch<Currency[]>("/api/currencies");
//                                 data.value ?? [] = if data.value is nullish, use [] instead
const displayCurrencies = computed(() => (currencies.value ?? []).map((c) => `${c.name} (${c.code})`));
const currency = ref("");
watch(currency, async (newCurrency) => {
  form.currencyId = displayCurrencies.value.findIndex((c) => c === newCurrency) + 1;
});

const SignupFormSchema = SignupSchema.extend({
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, "The passwords don't match.");
const { form, error, submit } = useForm(SignupFormSchema, signup);

async function signup() {
  try {
    const res = await $fetch<AuthResponse>("/api/auth/signup", {
      method: "POST",
      body: {
        email: form.email,
        password: form.password,
        name: form.name,
        displayName: form.displayName,
        currencyId: form.currencyId
      },
    });
    // TODO: Use global state with nuxt built in useState composable.
    // Store the jwt token there and reuse it across the application.
    await navigateTo("/");
  } catch (e) {
    error.value = "Something went wrong.";
  }
}
</script>

<template>
  <div class="container page-root">
    <div class="content-wrapper">
      <h1>Let's start 🚀</h1>
      <form @submit.prevent="submit">
        <AppTextbox v-model="form.name" type="text" required>
          Username
        </AppTextbox>
        <AppTextbox v-model="form.displayName" type="text" required>
          Display name
        </AppTextbox>
        <AppTextbox v-model="form.email" type="email" required>
          Email
        </AppTextbox>
        <AppSpinner :pending>
          <RekaSelect :items="displayCurrencies" v-model="currency" placeholder="Select preferred currency..." required>
            Currency
          </RekaSelect>
        </AppSpinner>
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