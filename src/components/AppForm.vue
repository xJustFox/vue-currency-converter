<script>
import { store } from '../store.js';

export default {
    name: 'AppForm',
    data() {
        return {
            store,
        }
    },
    props: {
        currencies: Object,
        startCurr: String,
        valueCurr: Number,
    },
    methods: {
        sendCurrency: function (curr) {
            this.$emit('currency', curr);
        },
        sendValue: function (value) {
            this.$emit('value', value);
        }
    }

}
</script>

<template>
    <div class="d-flex py-1">
        <input class="col-6 my-input text-center p-2 " type="number" min="0" step="0.01" :value="valueCurr" @change="sendValue($event.target.value)" @keyup="sendValue($event.target.value)">
        <select class="col-6 my-select text-center p-2 " @change="sendCurrency($event.target.value)">
            <option v-for="(currency, index) in currencies" :key="index" :value="index" :selected="index === startCurr" @click="sendCurrency(index)" :disabled="index == this.store.firstCurrency || index == this.store.secondCurrency">{{ currency }}</option>
        </select>
    </div>
</template>

<style lang="scss">
@use '../style/partials/variables' as *;

.my-input,
.my-select {
    background-color: $my_lightGray;
    border: 0;

    &:focus-visible {
        outline: 2px solid $my_green;
        z-index: 1;
        border: 0;

    }
}

.my-select {
    border-left: 1px solid gray;
    border-radius: 0 10px 10px 0;
}

.my-input {
    border-right: 1px solid gray;
    border-radius: 10px 0 0 10px;
}
</style>