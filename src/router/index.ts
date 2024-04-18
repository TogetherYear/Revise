import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Default',
        redirect: '/Application/Operate'
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        redirect: '/Empty'
    },
    {
        path: '/Empty',
        name: 'Empty',
        component: () => import('@/views/Empty/Empty.vue')
    },
    {
        path: '/Application',
        name: 'Application',
        component: () => import('@/views/Application/Application.vue'),
        children: [
            {
                path: 'Home',
                name: 'Home',
                component: () => import('@/views/Application/Children/Home/Home.vue'),
            },
            {
                path: 'Operate',
                name: 'Operate',
                component: () => import('@/views/Application/Children/Operate/Operate.vue'),
            }
        ]
    },
    {
        path: '/Tool',
        name: 'Tool',
        component: () => import('@/views/Tool/Tool.vue'),
        children: [
            {
                path: 'Suspend',
                name: 'Suspend',
                component: () => import('@/views/Tool/Children/Suspend/Suspend.vue'),
            }
        ]
    },
    {
        path: '/Tray',
        name: 'Tray',
        component: () => import('@/views/Tray/Tray.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
