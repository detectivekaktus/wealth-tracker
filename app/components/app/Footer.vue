<template>
  <footer>
    <div class="container footer-content">
      <span class="copyright">Wealth Tracker<br />Copyright © 2025.All rights reserved.</span>
      <nav>
        <ul>
          <li>
            <NuxtLink to="/">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
            to="https://github.com/detectivekaktus/wealth-tracker"
            target="_blank">
              Source code
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
footer {
  padding: var(--spacing-300);
  background-color: var(--clr-neutral-800);
  color: var(--clr-neutral-200);
  text-align: center;
}

.footer-content {
  display: grid;
  gap: var(--spacing-300);
}

nav ul {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-100);
}

a {
  color: var(--clr-neutral-200);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (min-width: 50em) {
  footer {
    text-align: inherit;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav ul {
    flex-direction: row;
    gap: var(--spacing-300);
  }
}
</style>