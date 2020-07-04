import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import appRoutes from './app';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/app',
        name: 'App',
        component: Dashboard,
        children: appRoutes
    }
]

const router = new VueRouter({
    mode: process.env.VUE_APP_ROUTER_MODE || 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router