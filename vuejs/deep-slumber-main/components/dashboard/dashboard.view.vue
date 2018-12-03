<template>
    <div>
        <section class="section" v-if="!user">
            <WelcomeWidget />
        </section>

        <section class="columns" v-if="user">
            <SleepStatsWidget />
            <AlarmSettingsWidget />
        </section>

    </div>
</template>

<script>

    import AlarmSettingsWidget from './widgets/AlarmSettings.widget.vue';
    import SleepStatsWidget from './widgets/SleepStats.widget.vue';
    import WelcomeWidget from './widgets/Welcome.widget.vue';

    export default {
        components: {
            WelcomeWidget,
            AlarmSettingsWidget,
            SleepStatsWidget
        },
        props: {},
        computed: {
            user() {
                console.log('hui');
                return this.$eventBus.user;
            }
        }
    }
</script>