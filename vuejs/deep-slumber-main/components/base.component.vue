<template>
    <div id="deep-slumber-main">

        <NavigationComponent :user="user"></NavigationComponent>
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
            return {
                user: null
            }
        },
        methods: {
            handleUserChanged(user) {
                this.user = user;
            }
        },
        mounted() {
            if (window.ctx && window.ctx.user) {
                this.user = window.ctx.user;
            }
            this.$eventBus.$on('user-changed', this.handleUserChanged);


        }

    }
</script>