import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/signup',
  },
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
    beforeEnter: () => {
      return true;
    },
  },
  {
    path: '/account',
    component: () => import('pages/UserAccount.vue'),
    beforeEnter: () => {
      return true;
    },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
