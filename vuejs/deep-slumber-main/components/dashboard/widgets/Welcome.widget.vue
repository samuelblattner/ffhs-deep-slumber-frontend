<template>
    <div class="column is-4-desktop is-offset-4 is-full-mobile is-centered has-text-centered">

        <h1 class="title">
            Deep Slumber
        </h1>
        <p class="subtitle">
           Set your alarm clock
        </p>

        <div>The World sleeps</div>
        <div v-html="worldTotalSleepHours"></div>
        <div>hours per day.</div>

    </div>

</template>

<script>

    export default {
        components: {},
        props: {},
        data() {
            return {}
        },
    }
</script>