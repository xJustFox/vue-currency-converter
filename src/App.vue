<script>
import AppForm from './components/AppForm.vue';
import AppChart from './components/AppChart.vue';
import { store } from './store.js';
import axios from "axios";

export default {
  components: {
    AppForm,
    AppChart,
  },
  data() {
    return {
      store,
      currObj: {},
      baseCurrency: 'EUR',
      baseAmount: 0,
      toCurrency: 'USD',
      toAmount: 0,
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
      if (this.toAmount > 0) {
        axios.get(`${store.apiUrl}/latest?amount=${this.toAmount}&from=${this.toCurrency}&to=${this.baseCurrency}`).then((response) => {
          this.baseAmount = response.data.rates[Object.keys(response.data.rates)[0]].toFixed(2);
          this.baseCurrency = Object.keys(response.data.rates)[0];
          this.toCurrency = response.data.base;
          this.toAmount = response.data.amount.toFixed(2);
  
        })
      }
    },
    // Converto la valuta con i dati inseriti dall'utente
    getConvValue() {
      axios.get(`${store.apiUrl}/latest?amount=${this.baseAmount}&from=${this.baseCurrency}&to=${this.toCurrency}`).then((response) => {
        this.baseAmount = response.data.amount.toFixed(2);
        this.baseCurrency = response.data.base;
        this.toCurrency = Object.keys(response.data.rates)[0];
        this.toAmount = response.data.rates[Object.keys(response.data.rates)[0]].toFixed(2)
      })
    },
    getFirstCurrency: function (currency) {
      this.baseCurrency = currency;
      this.store.firstCurrency = currency;
    },
    getSecondCurrency: function (currency) {
      this.toCurrency = currency;
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
    <div class="container-fluid py-4 d-flex justify-content-center align-items-center ">
      <div class="box p-3 text-light-green">

        <h1 class="text-center text-green py-1">CURRENCY BOOLVERTER</h1>

        <div>
          <div>{{ `${baseAmount} ${baseCurrency}` }} è uguale a</div>
          <div class="fs-1">{{ `${toAmount} ${toCurrency}` }}</div>
        </div>

        <AppForm :currencies="currObj" :startCurr="baseCurrency" :valueCurr="Number(baseAmount)" @currency="getFirstCurrency"
          @value="getFirstValue"></AppForm>

        <AppForm :currencies="currObj" :startCurr="toCurrency" :valueCurr="Number(toAmount)" @currency="getSecondCurrency"
          @value="getSecondValue"></AppForm>

        <div class="chart mt-3">
          <AppChart :baseCurr="baseCurrency" :toCurr="toCurrency"></AppChart>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@use './style/partials/variables' as *;
@use './style/generals.scss' as *;

.container-fluid {
  min-height: 100vh;
}

.box {
  width: 800px;
  border: 2px solid $my_green;
  border-radius: 5px;
}

.chart {
  max-width: 97%;
}
</style>
