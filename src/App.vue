<script>
import AppForm from './components/AppForm.vue';
import { store } from './store.js';
import axios from "axios";

export default {
  components: {
    AppForm,
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>

<template>
  <main>
    <div class="container-fluid d-flex justify-content-center align-items-center">
      <div class="box p-3 text-light-green">

        <h1 class="text-center text-green py-1">CURRENCY BOOLVERTER</h1>

        <div>
          <div>*cifra* è uguale a</div>
          <div class="fs-1">*cifra*</div>
        </div>

        <AppForm></AppForm>
        <AppForm></AppForm>

        <!-- <AppForm :values=""></AppForm> -->

        <!-- <AppForm :values=""></AppForm> -->

        <div class="chart mt-3">

        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@use './style/partials/variables' as *;
@use './style/generals.scss' as *;

.container-fluid{
  height: 100vh;
  overflow-y: auto;
}

.box{
  min-width: 700px;
  border: 2px solid $my_green;
  border-radius: 5px;
}

.chart{
  width: 100%;
  height: 300px;
  background-color: blue;
}
</style>
