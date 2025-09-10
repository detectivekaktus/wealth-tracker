import { z, type ZodObject } from "zod";

function createBlank(obj: ZodObject): any {
  const res: any = {};

  const shape = obj.shape;
  for (const key in shape) {
    switch (shape[key].type) {
      case "string": {
        res[key] = "";
      } break;

      case "number": {
        res[key] = 0;
      } break;

      case "boolean": {
        res[key] = false;
      } break;

      default: {
        res[key] = null;
      } break;
    }
  }

  return res;
}

/**
 * `useForm` composable. Provide the zod schema of the form and callback
 * that needs to be ran when the form is submitted.
 * 
 * @param schema `ZodObject` schema of a form
 * @param callback callback that runs on the form submition
 * 
 * Returns the form object of `z.infer<typeof schema>` type with default
 * values set to blank, the error which is given by the zod when parsing
 * the form, and the submit function to attach to the form. 
 */
export function useForm<T extends ZodObject>(schema: T, callback: () => void) {
  type zType = z.infer<typeof schema>;
  const form = createBlank(schema) as zType;
  const error = ref("");

  async function submit() {
    error.value = "";

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      error.value = parsed.error.issues[0]?.message || "There was an error.";
      return;
    }

    await callback();
  }

  return { form, error, submit };
}