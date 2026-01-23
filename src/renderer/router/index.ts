import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/monitor'
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: () => import('../views/Monitor'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings'),
  },
  {
    path: '/components',
    name: 'ComponentLibrary',
    component: () => import('../views/ComponentLibrary'),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
