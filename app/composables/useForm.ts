type FormFields = Record<string, string>

export function useForm(init: FormFields, validateFn: (form: FormFields) => string) {
  const form = reactive({ ...init });
  const error = ref("");

  async function submitForm(callback: (form: FormFields) => void) {
    error.value = "";
    const validationError = validateFn(form);
    if (validationError) {
      error.value = validationError;
      return;
    }

    try {
      await callback(form);
    } catch (e: any) {
      error.value = e.message || "Something went wrong."; 
    }
  }

  return { form, error, submitForm }
}