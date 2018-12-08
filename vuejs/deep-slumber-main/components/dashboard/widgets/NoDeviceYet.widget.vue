<template>
    <div class="column is-fullwidth notification is-info">
        <div class=" widget-wake-up-rating">

            <h1 class="title">
                No devices found
            </h1>
            <p class="subtitle">
                You haven't registered any devices yet.
            </p>

            <button class="button is-fullwidth is-primary" @click="addDevice">Register a device</button>
        </div>
    </div>

</template>

<script>

    export default {
        components: {},
        props: {},
        data() {
            return {
            }
        },
        methods: {
            addDevice() {
                this.$router.push('/profile')
            }
        }
    }
</script>