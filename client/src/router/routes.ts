import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/signup',
    component: () => import('pages/SignUp.vue'),
  },
  {
    path: '/signin',
    component: () => import('pages/SignIn.vue'),
  },
  {
    path: '/todos',
    component: () => import('pages/TodosPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
