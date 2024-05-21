<template>
  <div id="app">
    <router-view></router-view> <!-- 路由视图，路由匹配的组件将在这里渲染 -->
  </div>
</template>

<!-- <script>
export default {
  name: 'App'
}
</script>  不是必要 -->

<style>
#app {
  /* text-align: center; */
  font-family: Avenir, Helvetica, Arial, sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  height: 100%;
}



</style>

<script>

</script>

<!-- <div id="app">：这是整个 Vue 应用的根元素。通常，在 main.js 中我们指定 Vue 实例挂载到这个元素上。
  <router-view></router-view>：这是一个 Vue Router 的组件，用于显示当前路由对应的组件。简而言之，当你访问不同的路由地址时，
  <router-view> 会根据当前的路由动态渲染相应的组件。比如，如果你访问登录页面，就会在这个位置渲染登录组件。 -->

