<template>
  <el-menu :router="true" :default-active="path" class="el-menu-vertical-demo" unique-opened>
    <el-menu-item index="/ok" @click="$emit('getInfo', '学生管理')">
      <el-icon>
        <user />
      </el-icon>
      <span>学生管理</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>K1 思想政治</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>K2 科学文化</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>K3 警事综合素质</span>
      </template>
      <el-menu-item-group title="作风养成">
        <el-menu-item index="/ok/grade" @click="$emit('getInfo', '成绩管理')">
      <el-icon>
        <setting />
      </el-icon>
      <span>成绩管理</span>
    </el-menu-item>
    <el-menu-item index="/ok/rules" @click="$emit('getInfo', '评分细则')">
      <el-icon>
        <document />
      </el-icon>
      <span>评分细则</span>
    </el-menu-item>
      </el-menu-item-group>
    
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>K4 综合管理</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="4-1">item one</el-menu-item>
        <el-menu-item index="4-2">item two</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>K5 身体心理</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="5-1">item one</el-menu-item>
        <el-menu-item index="5-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="5-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="5-4">
        <template #title>item four</template>
        <el-menu-item index="5-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu index="6">
      <template #title>
        <el-icon>
          <Management />
        </el-icon>
        <span>附加分</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="5-1">item one</el-menu-item>
        <el-menu-item index="5-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="5-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="5-4">
        <template #title>item four</template>
        <el-menu-item index="5-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu index="7">
      <template #title>
        <el-icon>
          <document />
        </el-icon>
        <span>综合数字考评总分</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="5-1">item one</el-menu-item>
        <el-menu-item index="5-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="5-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="5-4">
        <template #title>item four</template>
        <el-menu-item index="5-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
 
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