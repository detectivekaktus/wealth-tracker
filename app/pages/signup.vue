<script lang="ts" setup>
// TODO: Implement sign with Google.
definePageMeta({
  layout: "auth"
});

useSeoMeta({
  title: "Sign up | Wealth Tracker",
  description: "Sign up to Wealth Tracker to keep track of your financial resources today!"
})

const { form, error, submitForm } = useForm({
  "username": "",
  "email": "",
  "password": "",
  "confirmPassword": ""
},
(form) => {
  if (form.username!.trim().length > 32)
    return "Enter username that's 1-32 characters long."
  if (form.email!.trim().length > 255)
    return "Enter a valid email address."
  if (form.password !== form.confirmPassword)
    return "The passwords don't match."
  return "";
})

function signup() {
  // TODO: POST /api/signup
}
</script>

<template>
  <div class="container page-root">
    <div class="content-wrapper">
      <h1>Let's start 🚀</h1>
      <form @submit.prevent="submitForm(signup)">
        <AppTextbox v-model="form.username!" type="text" required>Username</AppTextbox>
        <AppTextbox v-model="form.email!" type="email" required>Email</AppTextbox>
        <AppTextbox v-model="form.password!" type="password" required>Password</AppTextbox>
        <AppTextbox v-model="form.confirmPassword!" type="password" required>Confirm password</AppTextbox>
        <p v-if="error" class="error-msg">{{ error }}</p>
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