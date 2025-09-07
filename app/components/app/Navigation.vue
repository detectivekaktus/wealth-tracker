<script lang="ts" setup>
/**
 * Responsible navigation menu. On large screens displayed as a collapsable sidebar.
 * On small screens is a top scrollable menu.
 * 
 * @prop {{ url: string, name: string, iconName: string }} items Array of navigation items. 
 */
const props = defineProps<{
  items: {
    url: string,
    name: string,
    iconName: string 
  }[];
}>();
const closed = ref(false);
</script>

<template>
  <nav :aria-expanded="!closed" :class="{ 'nav-closed': closed }">
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
      <li v-for="(item, index) in props.items" :key="index">
      <!-- NuxtLink's active-class and exact-active-class apply the class specified
        when the page is rendered at the route the link points to.
        https://nuxt.com/docs/4.x/api/components/nuxt-link#props -->
        <NuxtLink
        :to="item.url"
        active-class="nav-active"
        exact-active-class="nav-active">
        <RekaTooltip :tooltip="item.name" type="reverse">
          <div class="nav-item">
            <Icon :name="item.iconName" mode="svg" size="1.5rem" />
            <span class="nav-link-text">{{ item.name }}</span>
          </div>
        </RekaTooltip>
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

.nav-item {
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

  nav.nav-closed {
    width: 3rem;
  }

  nav.nav-closed .nav-link-text {
    display: none;
  }

  nav.nav-closed .toggle-wrapper {
    justify-content: center;
  }
}
</style>