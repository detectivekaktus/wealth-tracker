import type { Currency } from "#shared/schemas/currency";

export function useCurrencies() {
  const currencies = ref<Currency[]>([]);
  const error = ref("");

  const fetchCurrencies = async () => {
    try {
      currencies.value = await $fetch("/api/currencies");
    } catch (e) {
      currencies.value = [];
      error.value = "Couldn't get list of currencies";
    }
  }
  fetchCurrencies();
  const displayCurrencies = computed(() => (currencies.value ?? []).map((c) => `${c.name} (${c.code})`));

  return { currencies, displayCurrencies, error };
}