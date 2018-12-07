<template>
    <div class="column is-4-desktop is-offset-4-desktop is-full-mobile is-centered has-text-centered">

        <div class="welcome">The World sleeps</div>
        <div v-html="avgSleepHours" class="big-number"></div>
        <div>hours per day.</div>

    </div>

</template>

<script>

    import axios from 'axios';
    import _ from 'lodash';

    export default {
        components: {},
        props: {},
        data() {
            return {
                stats: {}
            }
        },
        computed: {
            avgSleepHours() {
                return this.stats.avg_sleep_hours ? this.stats.avg_sleep_hours.toFixed(2) : 0;
            }
        },
        methods: {
            loadGlobalStatistics() {

                let that = this;


                axios.get(
                    '/api/drslumber/statistics/avg_world_sleep_hours/'
                ).then(response => {
                    that.stats = response.data;
                })
            }
        },
        mounted() {
            this.loadGlobalStatistics();
        }
    }
</script>