import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'dashboard',
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
    meta: { transition: 'fade' },
  },

  {
    name: 'login',
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: { transition: 'fade' },
  },

  {
    name: 'signup',
    path: '/signup',
    component: () => import('pages/SignupPage.vue'),
    meta: { transition: 'fade' },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: { transition: 'fade' },
  },
];

export default routes;
