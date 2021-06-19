import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  },
  {
    path: '/',
    redirect: '/products',
    component: () => import('@/views/front/Index.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/front/Products.vue')
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('@/views/front/Product.vue')
        // props: (route) => {
        //   return { page: route.query.page }
        // }
      },
      {
        path: 'carts',
        name: 'Carts',
        component: () => import('@/views/front/Carts.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/Login.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
