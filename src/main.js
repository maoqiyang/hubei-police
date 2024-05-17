/* eslint-disable */
import { createApp } from 'vue' //这行代码从 vue 包中导入了 createApp 函数。createApp 是 Vue 3 中创建应用实例的方法，它是启动任何 Vue 应用的第一步。
import App from './App.vue' //这行代码导入了 App.vue 文件。这是一个单文件组件（Single File Component），通常作为整个 Vue 应用的根组件。它包含了应用中所有其他组件的基本模板。
import router from './router' //这行代码导入了路由配置，它定义在项目的 router 文件夹内。路由器 (router) 用于管理不同页面之间的导航和渲染，例如当用户从首页跳转到详情页时。
import 'element-plus/dist/index.css'
import store from './store'
import '@/router/permission'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App) //使用 createApp 函数，并传入 App 组件，创建了一个新的 Vue 应用实例。这个实例是管理整个 Vue 应用的核心，它绑定了所有的组件、插件和生命周期。
app.use(store)
app.use(router) //这行代码通过 use 方法将 router 对象添加到 Vue 应用中。这使得整个应用可以使用 Vue Router 的功能，让你能够在不同的组件和页面间进行导航。
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app') 
// 这行代码告诉 Vue 应用在哪个 DOM 元素上进行挂载（即开始运行）。这里 '#app' 是一个选择器，指向 HTML 文件中的一个元素，通常是一个 <div> 标签，如 <div id="app"></div>。
// 挂载完成后，Vue 会接管这个元素，并控制这个元素内的所有内容。这意味着 Vue 会将 App.vue 组件渲染到具有 id="app" 的 HTML 元素中。

//防抖
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}

  