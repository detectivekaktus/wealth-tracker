<script lang="ts" setup>
// TODO: Implement sign with Google.
definePageMeta({
  layout: "auth"
});

useSeoMeta({
  title: "Sign up | Wealth Tracker",
  description: "Sign up to Wealth Tracker to keep track of your financial resources today!"
})

const form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
});
const error = ref("");

function submitForm() {
  
}
</script>

<template>
  <div class="container page-root">
    <div class="content-wrapper">
      <h1>Let's start 🚀</h1>
      <form @submit.prevent="submitForm">
        <AppTextbox v-model="form.username" type="text">Username</AppTextbox>
        <AppTextbox v-model="form.email" type="email">Email</AppTextbox>
        <AppTextbox v-model="form.password" type="password">Password</AppTextbox>
        <AppTextbox v-model="form.confirmPassword" type="password">Confirm password</AppTextbox>
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