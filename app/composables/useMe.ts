import type { User } from "#shared/schemas/user";

// Nuxt composables must be synchoronous, otherwise they can't
// function properly. Thus, we need to create an async wrapper
// `fetchMe` to asynchronously fetch userdata but still remain
// in sync context.

/**
 * Gets currently logged in user data with by making an API
 * call to `/api/users/me`.
 * 
 * @returns logged in user and a function to fetch it
 */
export function useMe() {
  const me = useState<User | null>("me", () => null);

  const fetchMe = async () => {
    if (me.value)
      return;

    const { data, error } = await useFetch<User>("/api/users/me", { server: true });
    if (!error.value) {
      me.value = data.value!
    }
    else {
      console.error("Couldn't get currently logged in user.");
    }

    return me;
  }

  return { me, fetchMe }
}