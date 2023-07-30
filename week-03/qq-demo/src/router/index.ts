import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/index.vue'),
      children: [
        {
          path: '',
          name: 'message',
          components: {
            default: () => import('@/views/Home/components/ChatList/components/Message.vue'),
            chatroom: () => import('@/views/Home/components/ChatRoom/components/Chat.vue')
          }
        },
        {
          path: 'friends',
          name: 'friends',
          components: {
            default: () => import('@/views/Home/components/ChatList/components/Friends.vue'),
            chatroom: () => import('@/views/Home/components/ChatRoom/ChatRoom.vue')
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register/index.vue')
    }
  ]
})

export default router
