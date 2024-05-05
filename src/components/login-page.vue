<template>
  <div class="login-container">
    <div class="header-container">
      <div class="icon-container">
        <img src="@/assets/Hubei_univ_police.png" alt="Icon Description" />
      </div>
    </div>

    <h1>湖北警官学院</h1>
    <h1>学员综合考核及评价体系</h1>
    <form @submit.prevent="login" class="login-form">
      <h2>系统登录</h2>
      <input type="password" v-model="password1" placeholder="Password 1" required>
      <input type="password" v-model="password2" placeholder="Password 2" required>
      <input type="password" v-model="password3" placeholder="Password 3" required>
      <button type="submit">Login</button>

    </form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      rememberMe: false,
      password1: '',
      password2: '',
      password3: ''
    };
  },
  methods: {
    login() {
      if (this.password1 === '111' && this.password2 === '123' && this.password3 === '123') {
        this.$router.push('/ok');
      } else {
        alert('Incorrect passwords');
      }
    }
  }
}
</script>

<style>
.login-container {
  background-image: url('~@/assets/fdic-background.png');
  /* 替换为您的图片路径 */
  background-size: cover;
  background-position: center;
  height: 100vh;
  /* 全屏高度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  /* 更新文本颜色 */
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* 输入框间隙 */
  width: 300px;
  /* 表单宽度 */
  background-color: rgba(255, 255, 255, 0.1);
  /* 添加浅色背景，这里使用了半透明白色 */
  padding: 20px;
  /* 添加内边距 */
  border-radius: 10px;
  /* 添加圆角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  /* 可选：添加阴影增加立体感 */
}

input[type="password"] {
  padding: 10px;
  font-size: 16px;
  /* 增大字体大小 */
  border-radius: 5px;
  /* 圆角边框 */
  border: 1px solid #ccc;
  /* 边框样式 */
}

button {
  background-color: #4CAF50;
  /* 按钮颜色 */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}


.icon-container {
  display: flex;
  justify-content: center;
  /* 或其他对齐方式 */
}

.icon-container img {
  width: 50px;
  /* 或根据需要调整大小 */
  height: auto;
  /* 保持图标的纵横比 */
}

.header-container {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
  justify-content: center;
  /* 水平居中对齐 */
  gap: 20px;
  /* 图标和文本之间的间隔 */
}

.icon-container img {
  height: 100px;
  /* 调整图标的大小，确保它与文本行高相协调 */
  width: 100px;
}

/* 如果你需要调整h1的样式，例如减小其默认的上下边距 */
h1 {
  margin: 6px;
  padding: 0;
  line-height: 1.2;
  /* 调整行高以适应容器高度 */
  font-size: 24px;
  /* 或其他适合的尺寸 */
}
</style>