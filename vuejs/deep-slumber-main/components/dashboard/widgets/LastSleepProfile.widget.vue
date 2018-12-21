<template>
    <div class="column is-fullwidth">

        <h1 class="title">
            Your last sleep profile
        </h1>
        <canvas ref="canvas" width="100%" height="100"></canvas>
        <button class="button" @click="buildChart('movement')">Movement</button>
        <button class="button" @click="buildChart('temp')">Temperature</button>
        <button class="button" @click="buildChart('hum')">Humidity</button>
        <button class="button" @click="buildChart('press')">Pressure</button>
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
                user_last_sleep_hours: 0,
                user_avg_sleep_hours: 0,
                has_profile: false,
                sleepProfile: {},
                chart: null,
                chartTemplates: {
                    'temp': {
                        chart_type: 'line',
                        event_type: '1001',
                        unit_label: 'Temp °C',
                        area_color: 'rgba(255, 99, 132, 0.2)',
                        line_color: 'rgba(255, 99,132,1)',
                        label_fn: (raw_label) => {return new Date(raw_label); },
                        value_fn: (raw_value) => {return raw_value.toFixed(2)}
                    },
                    'hum': {
                        chart_type: 'line',
                        event_type: '1003',
                        unit_label: 'Humidity rel %',
                        area_color: 'rgba(44, 192, 255, 0.2)',
                        line_color: 'rgba(44,192,255,1)',
                        label_fn: (raw_label) => {return new Date(raw_label); },
                        value_fn: (raw_value) => {return raw_value.toFixed(2)}
                    },
                    'press': {
                        chart_type: 'line',
                        event_type: '1002',
                        unit_label: 'Pressure millibars',
                        area_color: 'rgba(99, 255, 132, 0.2)',
                        line_color: 'rgba(99,255,132,1)',
                        label_fn: (raw_label) => {return new Date(raw_label); },
                        value_fn: (raw_value) => {return raw_value.toFixed(2)}
                    },
                    'movement': {
                        chart_type: 'line',
                        event_type: '1000',
                        unit_label: 'Movement',
                        stepped_line: true,
                        area_color: 'rgba(255, 99, 255, 0.2)',
                        line_color: 'rgba(255,99,255,1)',
                        label_fn: (raw_label) => {return new Date(raw_label); },
                        value_fn: (raw_value) => {return raw_value}
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
                        that.buildChart('movement');
                    } else {
                        that.has_profile = false;
                    }
                })
            },
            buildChart(template) {

                template = this.chartTemplates[template];
                let values = [];
                let labels = [];
                for (let event of this.sleepProfile.events) {
                    if (event.type == template.event_type) {
                        values.push(template.value_fn(event.value));
                        labels.push(template.label_fn(event.timestamp));
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
                            steppedLine: template.stepped_line,
                            backgroundColor: [
                                template.area_color,
                            ],
                            borderColor: [
                                template.line_color
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {

                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    unit: 'second',
                                    displayFormats: {
                                        second: 'h:mm:ss a'
                                    }
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
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