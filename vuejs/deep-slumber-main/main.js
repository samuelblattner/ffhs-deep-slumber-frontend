import BaseComponent from './components/base.component.vue';
import VueRouter from '../../node_modules/vue-router';

import DashboardView from './components/dashboard/dashboard.view.vue';
import LoginView from './components/auth/login.view.vue';
import LogoutView from './components/auth/logout.view.vue';
import SignUpView from './components/auth/signup.view.vue';


window.Vue = require('vue');
let Vue = window.Vue;
Vue.use(VueRouter);

const routes = [
    {path: '/', component: DashboardView},
    {path: '/login', component: LoginView},
    {path: '/logout', component: LogoutView},
    {path: '/signup', component: SignUpView}
];

const router = new VueRouter({routes});

window.$eventBus = new Vue();
Vue.prototype.$eventBus = window.$eventBus;

new Vue({
    router,
    el: '#deep-slumber-main',
    template: '<BaseComponent />',
    components: {BaseComponent},
});

