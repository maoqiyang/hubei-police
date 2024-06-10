 /* eslint-disable */
 import router from './index'
 import store from '@/store'
 import { ElNotification } from 'element-plus'
 
 router.beforeEach((to, from, next) => {
   const isLoggedIn = store.getters.token;  // 假设这样获取登录状态
 
   if (!isLoggedIn && to.path !== '/') {
     // 如果用户未登录且访问的不是登录页面
     ElNotification({
       title: '提醒',
       message: '请先登录！',
       type: 'warning',
     });
     return next('/');  // 强制跳转到登录页面
   } else {
     // 用户已登录或者访问登录页面
     next();  // 正常放行
   }
 });
 
 