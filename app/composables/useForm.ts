type FormFields = Record<string, string>

/**
 * useForm composable. Designed to abstract the form validation and submition.
 * 
 * @param {FormFields} init key-value pair of the name of the form field and its value
 * @param {(form: FormFields) => string} validateFn validation function that's run when
 * the form is submitted
 * @returns `form` javascript object, `error` containing stringified error value
 * and `submitForm` function
 */
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