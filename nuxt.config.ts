import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  imports: {
    scan: false
  },
  // ~, @ point to srcDir
  // ~~, @@ point to rootDir
  css: [
    "~/assets/reset.css",
    "~/assets/style.css",
    "~/assets/utilities.css"
  ],
  alias: {
    "db": fileURLToPath(new URL("./db", import.meta.url))
  }
})
