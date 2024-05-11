import { reactive } from "vue";

export const store = reactive({
    apiUrl: 'https://api.frankfurter.app',
    firstCurrency: 'EUR',
    secondCurrency: 'USD',
})