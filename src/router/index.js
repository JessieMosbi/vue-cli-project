import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
