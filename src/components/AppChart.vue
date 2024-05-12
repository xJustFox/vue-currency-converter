<script>
import ApexCharts from 'apexcharts';
import { store } from '../store.js';
import axios from "axios";

export default {
    name: 'AppChart',
    data() {
        return {
            store,
            values: [],
            dates: [],
        }
    },
    props: {
        baseCurr: String,
        toCurr: String,
    },
    watch: {
        baseCurr() {
            this.createChart()
        },
        toCurr() {
            this.createChart()
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getFormatDate(date) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1; // Months start from 0, so add 1
            let day = date.getDate();

            // Add leading zeros if necessary
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }

            return year + '-' + month + '-' + day;
        },
        formatMonth(dateString) {
            const date = new Date(dateString);
            const day = date.toLocaleDateString('en', { day: 'numeric' });
            const month = date.toLocaleDateString('en', { month: 'short' });

            return day + ' ' + month;
        },
        async getData() {
            this.values = [];
            this.dates = [];

            let endDate = new Date();
            let startDate = new Date();
            startDate.setDate(endDate.getDate() - 30);

            await axios.get(`${store.apiUrl}/${this.getFormatDate(startDate)}..?from=${this.baseCurr}&to=${this.toCurr}`).then((response) => {
                for (const key in response.data.rates) {

                    this.dates.push(this.formatMonth(key));

                    let value = response.data.rates[key][Object.keys(response.data.rates[key])[0]];

                    this.values.push(value);
                }
            })

            this.createChart()
        },
        createChart() {
            let options = {
                chart: {
                    type: 'area',
                    foreColor: '#a9d2b4',
                },
                series: [{
                    name: 'sales',
                    data: this.values,
                    color: '#50d170',
                }],
                xaxis: {
                    categories: this.dates,
                    labels: {
                        style: {
                            colors: '#a9d2b4',
                        }
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                title: {
                    text: `Rapporto fra ${this.baseCurr} a ${this.toCurr} nell\'ultimo mese`,
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '17px',
                        fontWeight: 'bold',
                        fontFamily: undefined,
                        color: '#a9d2b4'
                    },
                }
            }

            let chart = new ApexCharts(document.getElementById("chart"), options);

            chart.render();
        }
    }
}
</script>
<template lang="">
    <div id="chart">
        
    </div>
</template>
<style lang="scss" scoped></style>