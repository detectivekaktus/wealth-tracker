<script lang="ts" setup>
// TODO: Toggle the sidebar when in desktop mode.
// TODO: When the sidebar is closed, render properly the border-radius of the selected
// item. The solution I came up with clips the right side of the border, leaving it inconsistent
// and ugly.
const closed = ref(false);
</script>

<template>
  <nav :aria-expanded="!closed">
    <div class="toggle-wrapper">
      <button
        aria-label="toggle navigation"
        class="nav-toggle"
        :class="{ 'rotate': closed }"
        @click="closed = !closed">
        <Icon size="2rem" name="material-symbols:arrow-left"/>
      </button>
    </div>
    <ul>
      <li>
        <!-- NuxtLink's active-class and exact-active-class apply the class specified
         when the page is rendered at the route the link points to.
         https://nuxt.com/docs/4.x/api/components/nuxt-link#props -->
        <NuxtLink
          to="/"
          active-class="nav-active"
          exact-active-class="nav-active">
          <Icon mode="svg" size="1.5rem" name="material-symbols:home"/>Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/history"
          active-class="nav-active"
          exact-active-class="nav-active">
          <Icon size="1.5rem" name="material-symbols:history-2-rounded"/>History
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/goals"
          active-class="nav-active"
          exact-active-class="nav-active">
          <Icon size="1.5rem" name="material-symbols:rewarded-ads"/>Goals
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/savings"
          active-class="nav-active"
          exact-active-class="nav-active">
          <Icon size="1.5rem" name="material-symbols:money-bag"/>Savings
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/budget"
          active-class="nav-active"
          exact-active-class="nav-active">
          <Icon size="1.5rem" name="material-symbols:account-balance-wallet"/>Budget
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/bookkeeping"
          active-class="nav-active"
          exact-active-class="nav-active">
          <Icon size="1.5rem" name="material-symbols:book"/>Bookkeeping
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/profile"
          active-class="nav-active"
          exact-active-class="nav-active">
          <Icon size="1.5rem" name="material-symbols:account-circle"/>Profile
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  top: 0;
  background-color: var(--clr-accent-500);
  position: sticky;
  overflow-y: hidden;
  font-size: var(--size-400);
}

a, a > * {
  color: var(--clr-neutral-200);
}

ul {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spacing-400);
}

li {
  padding: var(--spacing-100);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.75rem;
}

li a {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-100);
}

.nav-toggle {
  display: none;
}

/* li:has(.nav-active) styles the li element
  while li .nav-active styles the a element
  https://developer.mozilla.org/en-US/docs/Web/CSS/:has
*/
li:has(.nav-active) {
  background-color: var(--clr-accent-600);
  border-radius: var(--br-secondary);
}

@media (min-width: 50em) {
  nav {
    overflow-y: auto;
    overflow: hidden;
  }

  ul {
    grid-auto-flow: row;
    gap: var(--spacing-200);
  }

  li {
    justify-content: start;
  }

  .toggle-wrapper {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .nav-toggle {
    border: none;
    background-color: inherit;
    color: var(--clr-neutral-200);
    display: block;
    transition: ease-in-out .3s;
  }
}
</style>