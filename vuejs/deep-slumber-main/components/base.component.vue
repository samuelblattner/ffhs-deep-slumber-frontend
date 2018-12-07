<template>
    <div id="deep-slumber-main">
        <div id="content-row">
            <div id="content">
                <NavigationComponent :user="user"></NavigationComponent>
                <section class="section">
                    <router-view></router-view>
                </section>
                <MobileNavigationOffCanvasComponent :user="user"></MobileNavigationOffCanvasComponent>
            </div>
        </div>
        <footer class="footer is-fixed-bottom"></footer>
    </div>
</template>

<script>

    import NavigationComponent from './navigation/navigation.component.vue';
    import MobileNavigationOffCanvasComponent from './navigation/mobile-off-canvas-navigation.component.vue';


    export default {
        components: {
            NavigationComponent,
            MobileNavigationOffCanvasComponent
        },
        props: {},
        data() {
            return {

            }
        },
        computed: {
            user() {
                return this.$eventBus && this.$eventBus.user ? this.$eventBus.user : null;
            }
        },
        methods: {
            handleUserChanged(user) {
                this.$eventBus.user = user;
                if (!window.ctx) {
                    window.ctx = {}
                }
                window.ctx['user'] = user;
            }
        },
        created() {
            if (window.ctx && window.ctx.user) {
                this.$eventBus.user = window.ctx.user;
            }
            let that = this;
            this.$eventBus.$on('user-changed', function (user) {
                that.handleUserChanged(user);
            });
        },
        mounted() {
            let that = this;
            document.body.addEventListener('click', function(e) {
                that.$eventBus.$emit('toggle-menu', false)
            });
        }
    }
</script>