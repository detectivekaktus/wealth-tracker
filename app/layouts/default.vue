<template>
  <div class="main-wrapper">
    <AppNavigation />
    <main>
      <slot />
    </main>
  </div>
  <AppFooter />
</template>

<style scoped>
main {
  min-height: 100vh;
}

@media (min-width: 50em) {
  .main-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-200);
  }
}
</style>