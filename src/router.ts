import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/index.vue';

Vue.use(Router);

export interface Menu {
    path?: string;
    name: string;
    code: string;
}

interface Route {
    path: string;
    hidden?: boolean;
    redirect?: string;
    component?: any;
    name?: string;
    meta?: {
        title?: string;
        icon?: string;
        code?: string;
        alwaysShow?: boolean;
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
    // {
    //     path: '/personnel',
    //     alwaysShow: true,
    //     redirect: '/personnel/employees',
    //     component: Layout,
    //     name: 'personnel',
    //     meta: { title: '人事管理', icon: '&#xe636;', code: '9400' },
    //     children: [
    //         {
    //             path: 'employees',
    //             component: () => import('@/views/personnel/employees.vue'),
    //             name: 'employees',
    //             meta: { title: '员工', icon: '&#xe72e;', code: '940001' },
    //         },
    //         {
    //             path: 'department',
    //             component: () => import('@/views/personnel/department.vue'),
    //             name: 'department',
    //             meta: { title: '部门', icon: '&#xe6ae;', code: '940002' },
    //         },
    //     ],
    // },
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
                        title: '首页',
                        icon: '&#xe61f;',
                    },
                },
            ],
        },
        {
            path: '/dms',
            component: Layout,
            redirect: '/dms/organize',
            meta: {
                title: '业务系统',
                icon: '&#xe630;',
                alwaysShow: true,
            },
            children: [
                {
                    path: 'organize',
                    component: () => import('@/views/dms/organize/index.vue'),
                    name: 'organize',
                    meta: { title: '机构列表', icon: '&#xe712;' },
                },
                {
                    path: 'fnTree',
                    component: () => import('@/views/dms/fnTree/index.vue'),
                    name: 'fnTree',
                    meta: { title: '功能树', icon: '&#xe67a;' },
                },
            ],
        },
        {
            path: '/systemSetup',
            component: Layout,
            redirect: '/systemSetup/dataBase',
            name: 'systemSetup',
            meta: { title: '系统设置', icon: '&#xe605;' },
            children: [
                {
                    path: 'dataBase',
                    component: () => import('@/views/systemSetup/dataBase.vue'),
                    name: 'dataBase',
                    meta: { title: '数据库设置', icon: '&#xe603;' },
                },
                {
                    path: 'systemProp',
                    component: () => import('@/views/systemSetup/systemProp.vue'),
                    name: 'systemProp',
                    meta: { title: '系统参数', icon: '&#xe655;' },
                },
            ],
        },
        {
            path: '/protocol',
            redirect: '/protocol/communication',
            component: Layout,
            name: 'protocol',
            meta: { title: '协议管理', icon: '&#xe66c;', code: '9200' },
            children: [
                {
                    path: 'communication',
                    component: () => import('@/views/protocol/communication.vue'),
                    name: 'communication',
                    meta: { title: '通信协议管理', icon: '&#xe617;' },
                },
                {
                    path: 'cmd',
                    component: () => import('@/views/protocol/cmd.vue'),
                    name: 'cmd',
                    meta: { title: '协议指令', icon: '&#xe6f3;' },
                },
            ],
        },
        {
            path: '/instructions',
            redirect: '/instructions/type',
            component: Layout,
            name: 'instructions',
            meta: { title: '指标管理', icon: '&#xe638;' },
            children: [
                {
                    path: 'type',
                    component: () => import('@/views/instructions/type.vue'),
                    name: 'type',
                    meta: { title: '指标类型', icon: '&#xe638;' },
                },
                {
                    path: 'field',
                    component: () => import('@/views/instructions/field.vue'),
                    name: 'field',
                    meta: { title: '指标字段', icon: '&#xe628;' },
                },
                {
                    path: 'templateModify',
                    component: () => import('@/views/instructions/templateModify.vue'),
                    name: 'templateModify',
                    meta: { title: '视图校正', icon: '&#xe665;' },
                },
                {
                    path: 'templateImport',
                    component: () => import('@/views/instructions/templateImport.vue'),
                    name: 'templateImport',
                    meta: { title: '模板导入', icon: '&#xe607;' },
                },
            ],
        },
        {
            path: '/bizLog',
            redirect: '/bizLog/dms',
            component: Layout,
            name: 'bizLog',
            meta: { title: '日志管理', icon: '&#xe626;' },
            children: [
                {
                    path: 'dms',
                    component: () => import('@/views/bizLog/dms.vue'),
                    name: 'dms',
                    meta: { title: '业务系统-日志', icon: '&#xe715;' },
                },
                {
                    path: 'opt',
                    component: () => import('@/views/bizLog/opt.vue'),
                    name: 'opt',
                    meta: { title: '运营系统-日志', icon: '&#xe60a;' },
                },
            ],
        },
        {
            path: '/physicalEquipment',
            redirect: '/physicalEquipment/indicatorManage',
            component: Layout,
            name: 'physicalEquipment',
            meta: { title: '物理设备', icon: '&#xe631;' },
            children: [
                {
                    path: 'indicatorManage',
                    component: () => import('@/views/physicalEquipment/indicatorManage.vue'),
                    name: 'indicatorManage',
                    meta: { title: '物理设备-指标管理', icon: '&#xe638;', hidden: true  },
                    // 物理设备-指标管理 不显示
                },
                {
                    path: 'physicalEquipmentManager',
                    component: () => import('@/views/physicalEquipment/physicalEquipmentManager.vue'),
                    name: 'physicalEquipmentManager',
                    meta: { title: '物理设备管理', icon: '&#xe631;' },
                },
                {
                    path: 'physicalEquipmentType',
                    component: () => import('@/views/physicalEquipment/physicalEquipmentType.vue'),
                    name: 'physicalEquipmentManager',
                    meta: { title: '物理设备类型', icon: '&#xe62e;' },
                },
                {
                    path: 'terminal',
                    component: () => import('@/views/physicalEquipment/terminal.vue'),
                    name: 'terminal',
                    meta: { title: '终端管理', icon: '&#xe613;' },
                },
                {
                    path: 'terminalType',
                    component: () => import('@/views/physicalEquipment/terminalType.vue'),
                    name: 'terminalType',
                    meta: { title: '终端类型管理', icon: '&#xe676;' },
                },
            ],
        },
        {
            path: '/stethophone',
            redirect: '/stethophone/indicatorManage',
            component: Layout,
            name: 'Stethophone',
            meta: { title: '听诊器管理', icon: '&#xe6f1;', alwaysShow: true },
            children: [
                {
                    path: 'indicatorManage',
                    component: () => import('@/views/stethophone/oprate.vue'),
                    name: 'Oprate',
                    meta: { title: '听诊器', icon: '&#xe646;' },
                },
            ],
        },
    ],
});
