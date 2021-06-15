import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  },
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products.vue')
  },
  {
    path: '/carts',
    name: 'Carts',
    component: () => import('@/views/Carts.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
