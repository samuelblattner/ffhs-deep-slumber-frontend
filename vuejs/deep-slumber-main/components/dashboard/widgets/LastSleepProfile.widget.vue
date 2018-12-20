<template>
    <div class="column is-fullwidth">

        <h1 class="title">
            Your last sleep profile
        </h1>
        <canvas ref="canvas" width="100%" height="100"></canvas>
    </div>

</template>

<script>

    import axios from 'axios';
    import Chart from 'chart.js';

    export default {
        components: {},
        props: {},
        data() {
            return {
                'user_last_sleep_hours': 0,
                'user_avg_sleep_hours': 0,
                'has_profile': false,
                'sleepProfile': {},
                'chart': null,
                'chartTemplates': {
                    'temp': {
                        'chart_type': 'line',
                        'event_type': '1001',
                        'unit_label': 'Temp °C',
                        'label_fn': (raw_label) => {let time = new Date(raw_label); return (time.getHours() + ':' + time.getMinutes() + ':' + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()));},
                        'value_fn': (raw_value) => {return raw_value.toFixed(2)}
                    },
                    'movement': {
                        'chart_type': 'line',
                        'event_type': '1000',
                        'unit_label': 'Movement',
                        'label_fn': (raw_label) => {let time = new Date(raw_label); return (time.getHours() + ':' + time.getMinutes() + ':' + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()));},
                        'value_fn': (raw_value) => {return raw_value}
                    }
                }
            }
        },
        methods: {
            loadSleepProfile() {

                let that = this;

                axios.get(
                    '/api/drslumber/statistics/user_last_sleep_profile/'
                ).then(response => {
                    if (response && response.data) {
                        that.sleepProfile = response.data;
                        that.has_profile = true;
                        that.buildChart(that.chartTemplates['movement']);
                    } else {
                        that.has_profile = false;
                    }
                })
            },
            buildChart(template) {
                let values = [];
                let labels = [];
                for (let event of this.sleepProfile.events) {
                    if (event.type == template.event_type) {
                        values.push(template.value_fn(event.value));
                        labels.push(template.label_fn(event.timestamp.date));
                    }
                }
                let ctx = this.$refs.canvas;

                this.chart = new Chart(ctx, {
                    type: template.chart_type,
                    data: {
                        labels: labels,
                        datasets: [{
                            label: template.unit_label,
                            data: values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:false
                                }
                            }]
                        }
                    }
                });
            }
        },
        mounted() {

            this.loadSleepProfile();
        }
    }
</script>