<script>
import { toValue } from 'vue';
import AppForm from './components/AppForm.vue';
import { store } from './store.js';
import axios from "axios";

export default {
  components: {
    AppForm,
  },
  data() {
    return {
      store,
      currObj: {},
      baseAmount: 0,
      baseCurrecy: '',
      toCurrency: '',
      toAmount: 0,

      firstCurrency: 'EUR',
      secondCurrency: 'USD',
    }
  },
  mounted() {
    this.getCurrency(),
    this.getConvValue()
  },
  watch: {
    firstCurrency() {
      this.getConvValue();
    },
    secondCurrency() {
      this.getConvValue();
    },
    baseAmount() {
      this.getConvValue();
    },
    toAmount() {
      this.getRevertConvValue();
    }
  },
  methods: {
    // Recupero tutte le monete
    getCurrency() {
      axios.get(`${store.apiUrl}/currencies`).then((response) => {
        this.currObj = response.data;
      })
    },
    // Converto la valuta reversata con i dati inseriti dall'utente
    getRevertConvValue() {
      if (this.toAmount != 0) {
        axios.get(`${store.apiUrl}/latest?amount=${this.toAmount}&from=${this.secondCurrency}&to=${this.firstCurrency}`).then((response) => {
          this.baseAmount = response.data.rates[Object.keys(response.data.rates)[0]].toFixed(2);
          this.baseCurrecy = Object.keys(response.data.rates)[0];
          this.toCurrency = response.data.base;
          this.toAmount = response.data.amount.toFixed(2);
  
        })
      }
    },
    // Converto la valuta con i dati inseriti dall'utente
    getConvValue() {
      axios.get(`${store.apiUrl}/latest?amount=${this.baseAmount}&from=${this.firstCurrency}&to=${this.secondCurrency}`).then((response) => {
        this.baseAmount = response.data.amount.toFixed(2);
        this.baseCurrecy = response.data.base;
        this.toCurrency = Object.keys(response.data.rates)[0];
        this.toAmount = response.data.rates[Object.keys(response.data.rates)[0]].toFixed(2)
      })
    },
    getFirstCurrency: function (currency) {
      this.firstCurrency = currency;
      this.store.firstCurrency = currency;
    },
    getSecondCurrency: function (currency) {
      this.secondCurrency = currency;
      this.store.secondCurrency = currency;
    },
    getFirstValue: function (value) {
      this.baseAmount = Number(value);
    },
    getSecondValue: function (value) {
      this.toAmount = Number(value);
    }
  },
}
</script>

<template>
  <main>
    <div class="container-fluid d-flex justify-content-center align-items-center">
      <div class="box p-3 text-light-green">

        <h1 class="text-center text-green py-1">CURRENCY BOOLVERTER</h1>

        <div>
          <div>{{ `${baseAmount} ${baseCurrecy}` }} è uguale a</div>
          <div class="fs-1">{{ `${toAmount} ${toCurrency}` }}</div>
        </div>

        <AppForm :currencies="currObj" :startCurr="'EUR'" :valueCurr="Number(baseAmount)" @currency="getFirstCurrency"
          @value="getFirstValue"></AppForm>

        <AppForm :currencies="currObj" :startCurr="'USD'" :valueCurr="Number(toAmount)" @currency="getSecondCurrency"
          @value="getSecondValue"></AppForm>

        <div class="chart mt-3">

        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@use './style/partials/variables' as *;
@use './style/generals.scss' as *;

.container-fluid {
  height: 100vh;
  overflow-y: auto;
}

.box {
  min-width: 700px;
  border: 2px solid $my_green;
  border-radius: 5px;
}

.chart {
  width: 100%;
  height: 300px;
  background-color: blue;
}
</style>
