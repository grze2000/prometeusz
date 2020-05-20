import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }
]

const router = new VueRouter({
    mode: process.env.VUE_APP_ROUTER_MODE || 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router