import { createRouter, createWebHistory } from 'vue-router'
import { Layout, PrivateLayout } from '../components/';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/home.vue')
        },
        {
          path: '/menu/:category',
          name: 'menu',
          component: () => import('../views/restaurantMenuDetail.vue')
        },
        {
          path: '/checkout',
          name: 'Check',
          component: () => import('../views/Checkout.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../privateViews/login.vue')
    },
    {
      path: '/admin/',
      name: 'admin',
      component: PrivateLayout,
      children: [
        {
          path: '/admin//dashboard',
          name: 'dashboard',
          component: () => import('../privateViews/dashboard.vue')
        }
      ]
    }
  ]
})

export default router
