import type { User } from "#shared/types/api/auth";

// Nuxt composables must be synchoronous, otherwise they can't
// function properly. Thus, we need to create an async wrapper
// `fetchMe` to asynchronously fetch userdata but still remain
// in sync context.

/**
 * Gets currently logged in user data with by making an API
 * call to `/api/users/me`.
 * 
 * @returns logged in user
 */
export function useMe() {
  const me = useState<User | null>("me", () => null);

  const fetchMe = async () => {
    try {
      me.value = await $fetch("/api/users/me");
    } catch (e) {
      me.value = null;
    }
  }
  fetchMe()

  return me;
}