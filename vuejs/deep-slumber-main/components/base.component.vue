<template>
    <div id="deep-slumber-main">

        <NavigationComponent></NavigationComponent>
        <section class="section">
        <router-view></router-view>
        </section>
        <footer class="footer is-fixed-bottom-desktop">The Footer</footer>

    </div>
</template>

<script>

    import NavigationComponent from './navigation/navigation.component.vue';

    export default {
        components: {
            NavigationComponent
        },
        props: {},
        data() {
            return {}
        },
    }
</script>