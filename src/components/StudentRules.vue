<template>
  <el-tabs
    tab-position="left"
    style="margin-top: 20px"
    v-model="activeName"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane label="内务" name="DailyRegime">
      <el-table :data="dailyRegimeRules" border style="width: 100%" max-height="500">
        <el-table-column prop="reason" label="扣分项" width="auto" />
        <el-table-column prop="score" label="分值" width="auto" min-width="25%"/> 
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="一日生活制度" name="PolicAppearance">
      <el-table :data="policeAppearanceRules" border style="width: 100%" max-height="500">
        <el-table-column prop="reason" label="扣分项" width="auto" />
        <el-table-column prop="score" label="分值" width="auto" min-width="25%" />
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="警容风纪" name="FormationDis">
      <el-table :data="attire" border style="width: 100%" max-height="500">
        <el-table-column prop="reason" label="扣分项" width="auto" />
        <el-table-column prop="score" label="分值" width="auto" min-width="25%" />
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="队列规范" name="queen">
      <el-table :data="queue" border style="width: 100%" max-height="500">
        <el-table-column prop="reason" label="扣分项" width="auto" />
        <el-table-column prop="score" label="分值" width="auto" min-width="25%" />
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="教室纪律" name="classDiS">
      <el-table :data="classDiS" border style="width: 100%" max-height="500">
        <el-table-column prop="reason" label="扣分项" width="auto" />
        <el-table-column prop="score" label="分值" width="auto" min-width="25%" />
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="查寝" name="sleep">
      <el-table :data="sleep" border style="width: 100%" max-height="500">
        <el-table-column prop="reason" label="扣分项" width="auto" />
        <el-table-column prop="score" label="分值" width="auto" min-width="25%" />
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
/* eslint-disable */
import { ref,onMounted } from "vue";
import axios from 'axios';

const activeName = ref("DailyRegime");

const handleClick = (tab, event) => {
  console.log(tab, event);
};

const dailyRegimeRules = ref([]);
const policeAppearanceRules = ref([]);
const attire = ref([]);
const queue = ref([]);
const classDiS = ref([]);
const sleep = ref([]);
const fetchPenaltyRules = async () => {
  try {
    const response = await axios.get('/api/rules/');
    const rules = response.data.data;
    dailyRegimeRules.value = rules.filter(rule => rule.rule_id >= 1 && rule.rule_id <= 18);
    policeAppearanceRules.value = rules.filter(rule => rule.rule_id >= 19 && rule.rule_id <= 36);
    attire.value = rules.filter(rule => rule.rule_id >= 37 && rule.rule_id <= 46);
    queue.value = rules.filter(rule => rule.rule_id >= 47 && rule.rule_id <= 50);
    classDiS.value = rules.filter(rule => rule.rule_id >= 51 && rule.rule_id <= 54);
    sleep.value = rules.filter(rule => rule.rule_id >= 55 && rule.rule_id <= 57);
  } catch (error) {
    console.error('Error fetching penalty rules:', error);
  }
};

onMounted(fetchPenaltyRules);

</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
