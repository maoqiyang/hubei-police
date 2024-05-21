<template>
  <el-tabs
    tab-position="left"
    style="margin-top: 20px"
    v-model="activeName"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane label="一日生活制度" name="DailyRegime">
      <el-table :data="tableData" border style="width: 100%" max-height="500">
        <el-table-column prop="deduteItem" label="扣分项" width="auto" />
        <el-table-column
          prop="score"
          label="分值"
          width="auto"
          min-width="25%"
        /> </el-table
    ></el-tab-pane>
    <el-tab-pane label="警容风纪" name="PolicAppearance">警容风纪</el-tab-pane>
    <el-tab-pane label="队列纪律" name="FormationDis">队列纪律</el-tab-pane>
    <el-tab-pane label="教室纪律" name="classDiS">教室纪律</el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from "vue";
const activeName = ref("DailyRegime");

const handleClick = (tab, event) => {
  console.log(tab, event);
};

const tableData = [
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
  {
    deduteItem: "被子丑",
    score: 2,
  },
];
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
