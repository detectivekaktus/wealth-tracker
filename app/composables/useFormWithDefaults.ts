import type { ZodObject } from "zod";

/**
 * `useFormWithDefaults` composable. Similarly to `useBlankForm` provides
 * a type-safe way to parse and verify form fields against the schema.
 * Form is initialized with the default values provided via `defaults`.
 * 
 * The type of `defaults` must be of `z.infer<typeof schema>`.
 * 
 * @param schema `ZodObject` schema of a form
 * @param defaults default values assigned to a form
 * @param callback callback that runs on the form submition
 * 
 * @returns the form object of `z.infer<typeof schema>` type with default
 * values set to `defaults`, the error which is given by the zod when parsing
 * the form, and the submit function to attach to the form.
 */
export function useFormWithDefaults<T extends ZodObject, K>(schema: T, defaults: K, callback: () => void) {
  const form = defaults;
  const error = ref("");

  async function submit() {
    error.value = "";
    
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      error.value = parsed.error.issues[0]?.message || "Unknown error.";
      return;
    }

    await callback();
  }

  return { form, error, submit };
}