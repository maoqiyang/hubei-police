<template>
    <el-container class="box">
      <el-header ><p>综合素质评价体系</p></el-header>
      <el-container>
        <el-aside width="200px"><FMenu ></FMenu></el-aside>
        <el-container>
          <el-main>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{a}}</el-breadcrumb-item>
            </el-breadcrumb>
            <routerView></routerView>
          </el-main>
          <el-footer style="height: 30px"
            >学生信息管理系统 版权所有: 湖北警官学院 | 2024-4-24</el-footer
          >
        </el-container>
      </el-container>
    </el-container>
  </template>
  



 <script setup>
  /* eslint-disable */
  import FMenu from '../layout/F-menu.vue';
  import {computed, ref} from 'vue'
  import {useRoute} from 'vue-router'
  const Route = useRoute()
  let a = computed(()=>{
    return Route.name || "学生管理"
  })
  
 </script>

  
  <style scoped>
  .box {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .el-header {
    background-color: #003366;  /* 深蓝色，常见于警察徽章 */
    color: #fff;               /* 白色文字提高可读性 */
    text-align: left;
    font-size: 32px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .el-container {
    margin: 0px;
    padding: 0px;
    height: 100%;
  }
  .el-aside {
    background-color: #555;    /* 深灰色，为了专业感 */
    color: #fff;               /* 白色文字 */
    text-align: center;
    line-height: 200px;
    height: 100%;
  }
  .el-main {
    background-color: #f4f4f4;  /* 浅灰色，保持背景的清爽 */
    color: #333;               /* 深色文字，确保对比和可读性 */
  }
  .el-footer {
    background-color: #003366;  /* 同头部，保持一致性 */
    color: #fff;
    text-align: center;
    line-height: 30px;
  }
  </style>
  
  