
<template>
  <el-menu :router="true" :default-active="path" class="el-menu-vertical-demo">
    <el-menu-item index="/ok" @click="$emit('getInfo', '学生管理')">
      <el-icon><user /></el-icon>
      <span>学生管理</span>
    </el-menu-item>
    <el-menu-item index="/ok/grade" @click="$emit('getInfo', '成绩管理')">
      <el-icon><Management /></el-icon>
      <span>成绩管理</span>
    </el-menu-item>
    <el-menu-item index="/ok/rules" @click="$emit('getInfo', '评分细则')">
      <el-icon><document /></el-icon>
      <span>评分细则</span>
    </el-menu-item>
    <el-menu-item>
      <el-icon><document /></el-icon>
      <span>待扩展</span>
    </el-menu-item>

  </el-menu>
</template>
  
<script setup>
/* eslint-disable */
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let path = ref(router.currentRoute.value.fullPath);
</script>
  
  
  
<style scoped></style>
  