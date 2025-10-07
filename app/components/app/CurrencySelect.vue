<script lang="ts" setup>
import type { Currency } from '#shared/schemas/currency';

const props = defineProps<{
  modelValue: number,
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: number): void
}>();

const { data: currencies } = await useFetch<Currency[]>("/api/currencies", { server: true });
if (!currencies.value || !currencies.value.length) {
  showError({
    statusCode: 500,
    statusMessage: "Something went wrong..."
  });
}

const currencyId = ref(1);
const currencyNames = computed(() => currencies.value!.map(c => `${c.name} (${c.code})`));
const selectedCurrency = ref("");

watchEffect(() => {
  if (currencies.value!.length && !selectedCurrency.value) {
    const defaultCurrency = currencies.value!.find(c => c.id === props.modelValue);
    if (defaultCurrency) {
      selectedCurrency.value = `${defaultCurrency.name} (${defaultCurrency.code})`
      currencyId.value = defaultCurrency.id;
      emits("update:modelValue", currencyId.value);
    }
  }
});

watch(selectedCurrency, (newSelectedCurrency) => {
// Currency Name (Code)
//              ^^
  const name = newSelectedCurrency.split(" (")[0];
  const found = currencies.value!.find(c => c.name === name);
  if (found) {
    currencyId.value = found.id;
    emits("update:modelValue", currencyId.value);
  }
});
</script>

<template>
  <RekaSelect :items="currencyNames" v-model="selectedCurrency"><slot/></RekaSelect>
</template>