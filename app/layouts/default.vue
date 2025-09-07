<script lang="ts" setup>
const navItems = [
  { url: "/", name: "Home", iconName: "material-symbols:home" },
  { url: "/history", name: "History", iconName: "material-symbols:history-2-rounded" },
  { url: "/goals", name: "Goals", iconName: "material-symbols:rewarded-ads" },
  { url: "/budget", name: "Budget", iconName: "material-symbols:account-balance-wallet" },
  { url: "/bookkeeping", name: "Bookkeeping", iconName: "material-symbols:book" },
  { url: "/profile", name: "Profile", iconName: "material-symbols:account-circle" }
]
</script>

<template>
  <div class="main-wrapper">
    <AppNavigation :items="navItems"/>
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