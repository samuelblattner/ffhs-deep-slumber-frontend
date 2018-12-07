<template>
    <div>

        <section class="section" v-if="!user">
            <WelcomeWidget />
        </section>

        <section class="columns" v-if="user">
            <WakeUpRatingWidget />
            <SleepStatsWidget />
            <AlarmSettingsWidget />
        </section>

    </div>
</template>

<script>

    import AlarmSettingsWidget from './widgets/AlarmSettings.widget.vue';
    import SleepStatsWidget from './widgets/SleepStats.widget.vue';
    import WelcomeWidget from './widgets/Welcome.widget.vue';
    import WakeUpRatingWidget from './widgets/WakeUpRating.widget.vue';

    export default {
        components: {
            WelcomeWidget,
            AlarmSettingsWidget,
            SleepStatsWidget,
            WakeUpRatingWidget
        },
        props: {},
        computed: {
            user() {
                return this.$eventBus.user;
            }
        }
    }
</script>