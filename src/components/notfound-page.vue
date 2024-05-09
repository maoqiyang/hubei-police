<template>
  <el-empty :description="description" />
</template>

<script setup>
import { ref } from "vue";
let description = ref(404);
</script>

<style scoped></style>
