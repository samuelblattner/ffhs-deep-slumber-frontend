window.Vue = require('vue');

import BaseComponent from './components/base.component.vue';
import VueRouter from '../../node_modules/vue-router';

import DashboardView from './components/dashboard/dashboard.view.vue';
import LoginView from './components/auth/login.view.vue';
import LogoutView from './components/auth/logout.view.vue';


Vue.use(VueRouter);

const routes = [
    {path: '/', component: DashboardView},
    {path: '/login', component: LoginView},
    {path: '/logout', component: LogoutView}
];

const router = new VueRouter({routes});

new Vue({
    router,
    el: '#deep-slumber-main',
    template: '<BaseComponent />',
    components: {BaseComponent},
});
