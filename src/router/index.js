import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "layout" */ '../layouts/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
        path: '/product',
        name: 'Product',
        component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
