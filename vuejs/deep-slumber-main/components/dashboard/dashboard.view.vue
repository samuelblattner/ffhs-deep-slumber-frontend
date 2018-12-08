<template>
    <div>

        <section class="section" v-if="!user">
            <WelcomeWidget />
        </section>

        <section class="columns" v-if="user">
            <NoDevicesWidget v-if="user.has_device === false" />
            <WakeUpRatingWidget  v-if="user.has_device === true" />
            <SleepStatsWidget  v-if="user.has_device === true" />
            <AlarmSettingsWidget  v-if="user.has_device === true" />
        </section>

    </div>
</template>

<script>

    import AlarmSettingsWidget from './widgets/AlarmSettings.widget.vue';
    import SleepStatsWidget from './widgets/SleepStats.widget.vue';
    import WelcomeWidget from './widgets/Welcome.widget.vue';
    import WakeUpRatingWidget from './widgets/WakeUpRating.widget.vue';
    import NoDevicesWidget from './widgets/NoDeviceYet.widget.vue';

    export default {
        components: {
            WelcomeWidget,
            AlarmSettingsWidget,
            SleepStatsWidget,
            WakeUpRatingWidget,
            NoDevicesWidget
        },
        props: {},
        computed: {
            user() {
                return this.$eventBus.user;
            }
        }
    }
</script>