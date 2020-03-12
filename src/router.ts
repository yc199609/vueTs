import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';

Vue.use(Router);

interface Menu {
    path?: string;
    name: string;
    code: string;
}

interface Route {
    path: string;
    hidden?: boolean;
    alwaysShow?: boolean;
    redirect?: string;
    component?: any;
    name?: string;
    meta?: {
        title?: string;
        icon?: string;
        code?: string;
    };
    children?: Route[];
}

export function getRoute(map: Route[], menus: Menu[]) {
    // console.log(map, menus)
    return map.filter((item) => {
        if (item.children) {
            item.children = getRoute(item.children, menus);
        }
        let flag = false;
        for (let len = menus.length, i = 0; i < len; i++) {
            if (!item.meta) {
                flag = true;
                break;
            } else if (menus[i].code === item.meta.code) {
                flag = true;
                break;
            }
        }
        return flag;
    });
}

export const asyncRouter: Route[] = [
    {
        path: '/personnel',
        alwaysShow: true,
        redirect: '/personnel/employees',
        component: Layout,
        name: 'personnel',
        meta: { title: '人事管理', icon: '&#xe636;', code: '300' },
        children: [
            {
                path: 'employees',
                component: () => import('@/views/personnel/employees.vue'),
                name: 'employees',
                meta: { title: '员工', icon: '&#xe72e;', code: '30001' },
            },
            {
                path: 'department',
                component: () => import('@/views/personnel/department.vue'),
                name: 'department',
                meta: { title: '部门', icon: '&#xe6ae;', code: '30002' },
            },
        ],
    },
];


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
            path: '/404',
            component: () => import('@/views/404.vue'),
        },
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            children: [
                {
                    path: 'dashboard',
                    component: () => import('@/views/home/index.vue'),
                    meta: {
                        title: 'Dashboard',
                        icon: '&#xe61f;',
                    },
                },
            ],
        },
        {
            path: '/example',
            component: Layout,
            redirect: '/example/tree',
            meta: {
                title: 'Example',
                icon: '&#xe602;',
            },
            children: [
                {
                    path: 'tree',
                    component: () => import('@/views/example/tree.vue'),
                    meta: {
                        title: 'Tree',
                        icon: '&#xec3c;',
                    },
                },
                {
                    path: 'table',
                    component: () => import('@/views/example/table.vue'),
                    meta: {
                        title: 'Table',
                        icon: '&#xe60f;',
                    },
                },
            ],
        },
    ],
});
