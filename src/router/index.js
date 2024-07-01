import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/LoginForm.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/components/SignUp.vue')
    },
    {
      path: '/account/reset',
      name: 'Reset Account',
      component: () => import('@/components/ResetAccount.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('@/components/NotFound.vue')
    }
  ]
})

export default router
