import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/monitor'
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: () => import('../views/monitor/index'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/settings/index'),
  },
  {
    path: '/components',
    name: 'ComponentLibrary',
    component: () => import('../views/component-library/index'),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
