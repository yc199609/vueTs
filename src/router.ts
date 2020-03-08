import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';

Vue.use(Router);

export default new Router({
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x : 0, y : 0 };
        }
    },
    routes: [
        {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
        },
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            children: [
                {
                    path: 'dashboard',
                    component: () => import('@/views/home/index.vue'),
                },
            ],
        },
    ],
});
