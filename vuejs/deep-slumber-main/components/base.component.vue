<template>
    <div id="deep-slumber-main">
        <div id="content-row">
            <div id="content">
                <NavigationComponent :user="user"></NavigationComponent>
                <section class="section">
                    <router-view></router-view>
                </section>
            </div>
        </div>
        <footer class="footer is-fixed-bottom">The Footer</footer>
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
                this.$eventBus.user = user;
                if (!window.ctx) {
                    window.ctx = {}
                }
                window.ctx['user'] = user;
            }
        },
        created() {
            if (window.ctx && window.ctx.user) {
                this.user = window.ctx.user;
                this.$eventBus.user = this.user;
            }
            let that = this;
            this.$eventBus.$on('user-changed', function (user) {
                that.handleUserChanged(user);
            });
        }
    }
</script>