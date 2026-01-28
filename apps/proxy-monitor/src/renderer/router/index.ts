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
    path: '/system-proxy',
    name: 'SystemProxy',
    component: () => import('../views/system-proxy/index'),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
