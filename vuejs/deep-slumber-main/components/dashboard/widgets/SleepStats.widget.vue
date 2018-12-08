<template>
    <div class="column is-fullwidth" v-if="has_stats">

        <h1 class="title">
            Sleep stats
        </h1>
        <p>
            You slept {{ user_last_sleep_hours }} hours last night.
            You sleep {{ user_avg_sleep_hours }} on average.
        </p>
    </div>

</template>

<script>

    import axios from 'axios';


    export default {
        components: {},
        props: {},
        data() {
            return {
                'user_last_sleep_hours': 0,
                'user_avg_sleep_hours': 0,
                'has_stats': false
            }
        },
        methods: {
          loadUserStatistics() {

              let that = this;

                axios.get(
                    '/api/drslumber/statistics/user_stats/'
                ).then(response => {
                    if (response && response.data) {
                        that.user_avg_sleep_hours = response.data.avg_sleep_hours.toFixed(2);
                        that.user_last_sleep_hours = response.data.last_sleep_hours.toFixed(2);
                        that.has_stats = true;
                    } else {
                        that.has_stats = false;
                    }
                })
          }
        },
        mounted() {
            this.loadUserStatistics();
        }
    }
</script>