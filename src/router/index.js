import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/login-page.vue'
import OK from '@/components/ok-page.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/ok',
    name: 'OK',
    component: OK
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router