import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/signup',
    component: () => import('pages/SignUp.vue'),
  },
  {
    path: '/signin',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
