import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/login-page.vue'
import OK from '@/components/ok-page.vue'
import adminPage from '@/components/admin-page.vue'
import NotFound from '@/components/notfound-page.vue'
import GradePage from '@/components/GradePage.vue'
import StudentRules from "@/components/StudentRules.vue"
let routes = [{
  name:'学生管理',
  path: '/ok',
  component: adminPage,
  children: [{
    path: '/ok',
    component: OK,
    meta: {
      title: '学生管理'
    }
  }, 
  {
    name:'成绩管理',
    path: '/ok/grade',
    component: GradePage,
    meta: {
      title: '成绩管理'
    }
  },
  {
      name:'评分细则',
    path: '/ok/Rules',
    component: StudentRules,
    meta: {
      title: '评分细则'
    }
  }, {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFound
}]
}, {
  path: '/',
  component: Login,
  meta: {
    title: '登录页'
  }
}];
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 当您调用 createRouter 函数时，您实际上是在初始化一个新的路由器对象，这个对象将管理您的应用中所有的路由。
// 这是设置 Vue Router 的基础，没有这个实例，Vue 应用将无法处理不同页面之间的导航。
export default router
// 将创建的路由器实例导出，这样它可以在应用的其他部分（如主入口文件）被引入和使用。