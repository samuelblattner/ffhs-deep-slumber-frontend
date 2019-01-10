import BaseComponent from './components/base.component.vue';
import VueRouter from '../../node_modules/vue-router';

import DashboardView from './components/dashboard/dashboard.view.vue';
import LoginView from './components/auth/login.view.vue';
import LogoutView from './components/auth/logout.view.vue';
import SignUpView from './components/auth/signup.view.vue';
import ProfileView from './components/user/profile.view.vue';
import AdminUserView from './components/user/admin/user-list.view.vue';
import AdminUserEditView from './components/user/admin/user-edit.view.vue';
import VueNativeSock from '../../node_modules/vue-native-websocket'


window.Vue = require('vue');
let Vue = window.Vue;
Vue.use(VueRouter);
// TODO: Put this to env vars somehow...
// Vue.use(VueNativeSock, 'ws://192.168.1.2:8777', {format: 'json'});
Vue.use(VueNativeSock, 'wss://deep-slumber.samuelblattner.ch:8777', {format: 'json'});

const routes = [
    {path: '/', component: DashboardView},
    {path: '/login', component: LoginView},
    {path: '/logout', component: LogoutView},
    {path: '/signup', component: SignUpView},
    {path: '/admin/users', component: AdminUserView},
    {path: '/admin/users/:id/edit', component: AdminUserEditView, props: true},
    {
        path: '/profile', component: ProfileView, beforeEnter: (to, from, next) => {
            if (!window.ctx || !window.ctx.user) {
                next('/login');
            } else {
                next();
            }
        }
    }
];

const router = new VueRouter({routes});

window.$eventBus = new Vue({
    data() {
        return {
            user: null
        }
    },
});

Vue.prototype.$eventBus = window.$eventBus;

new Vue({
    router,
    el: '#deep-slumber-main',
    template: '<BaseComponent />',
    components: {BaseComponent},
});

