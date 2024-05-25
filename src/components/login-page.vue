<template>
  <div class="login-container">
    <div class="header-container">
      <div class="icon-container">
        <img src="@/assets/Hubei_univ_police.png" alt="Icon Description" />
      </div>
    </div>

    <h1 >湖北警官学院</h1>  
    <!-- style="text-align: center;" -->
    <h1>学员综合考核及评价体系</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <h2 class="center-text">系统登录</h2>
      <input type="password" v-model="form.password1" placeholder="Password 1" required>
      <input type="password" v-model="form.password2" placeholder="Password 2" required>
      <input type="password" v-model="form.password3" placeholder="Password 3" required>
      <button type="submit">Login</button>

    </form>
  </div>

</template>

<script setup>
 /* eslint-disable */
import { ref } from 'vue'
import { login } from '@/api/login'
// import { useRouter } from 'vue-router'  // 修改此处，使用useRouter
// import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'

const store = useStore();
// const router = useRouter(); // 正确获取router实例
const form = ref({
  password1: 'password1',
  password2: 'password2',
  password3: 'password3'
})

const handleLogin = async () => {
  // 移除 formRef 依赖，假设不需要前端验证或已在表单元素内部进行
  try {
    const response = await login(form.value); // 使用 try-catch 结构处理异步请求

    store.dispatch("app/login",form.value)
    // router.push('/ok') // 登录成功后跳转到首页

  } catch (error) {
    // ElMessage.error('Login failed: ' + error.message)
    // // alert(); // 使用alert显示错误，适合简单示例，生产环境建议更友好的错误处理
    // // 根据需要处理错误，如显示用户错误消息
  }
}
</script>
<style src="@/assets/styles/LoginStyles.css">


</style>
