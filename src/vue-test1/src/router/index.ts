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
      path: '/fixedbar',
      name: 'fixedbar',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/FixedBar.vue')
    },
    {
      path: '/scrollsnap',
      name: 'scrollsnap',
      component: () => import('@/views/SrollSnap.vue')
    },
    {
      path: '/lazyload',
      name: 'lazyload',
      component: () => import('@/views/LazyLoad.vue')
    },
    {
      path: '/infinitescroll',
      name: 'infinitescroll',
      component: () => import('@/views/InfiniteScroll.vue')
    },
    {
      path: '/virtual-list',
      name: 'virtual-list',
      component: () => import('@/views/VirtualList.vue')
    }
  ]
})

export default router
