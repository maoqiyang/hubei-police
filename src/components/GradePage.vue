<template>
  <el-row style="margin: 20px 0px">
    <el-col :span="6">
      <span>当前区队：</span>
      <el-select
        v-model="SelClassValue"
        @change="selectChange"
        placeholder="请选择..."
        style="width: 150px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        /> </el-select
    ></el-col>
    <el-col :span="16"> </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="deductionListDialog = true"
        >录入成绩</el-button
      >
    </el-col>
  </el-row>
  <el-row>
    <el-table
      :data="filteredScores"
      style="width: 100%"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column property="student_id" label="学号" width="auto" />
      <el-table-column property="name" label="姓名" width="auto" />
      <el-table-column property="department" label="区队" width="auto" />
      <el-table-column property="dormitory_score" label="内务" width="auto" />
      <el-table-column property="daily_life_score" label="一日生活制度" width="auto" />
      <el-table-column property="discipline_score" label="警容风纪" width="auto" />
      <el-table-column property="formation_score" label="队列规范" width="auto" />
      <el-table-column property="classroom_score" label="教室纪律" width="auto" />
      <el-table-column property="dorm_check_score" label="查寝" width="auto" />
      <el-table-column property="total_score" label="总分" width="auto" />
      <el-table-column label="操作" width="auto">
        <el-button type="primary">调整</el-button>
      </el-table-column>
      
    </el-table>

  </el-row>



  <!-- 弹出框 -->
  <el-dialog v-model="deductionListDialog" title="录入成绩" width="600">
    <!-- 个人信息 -->
    <el-descriptions class="margin-top" :column="4" size="small" border>
      <el-descriptions-item span="2">
        <template #label>
          <div class="cell-item">学号</div>
        </template>
        20230371001 </el-descriptions-item
      ><el-descriptions-item>
        <template #label>
          <div class="cell-item">姓名</div>
        </template>
        张山
      </el-descriptions-item></el-descriptions
    >
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="内务" name="InternalAffair">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="Option A" value="Value A" />
          <el-checkbox label="Option B" value="Value B" />
          <el-checkbox label="Option C" value="Value C" />
          <el-checkbox
            label="disabled"
            value="Value disabled"
          /> </el-checkbox-group
      ></el-tab-pane>
      <el-tab-pane label="一日生活制度" name="DailyRegime"
        >一日生活制度</el-tab-pane
      >
      <el-tab-pane label="警容风纪" name="PolicAppearance"
        >警容风纪</el-tab-pane
      >
      <el-tab-pane label="队列纪律" name="FormationDis">队列纪律</el-tab-pane>
      <el-tab-pane label="教室纪律" name="classDiS">教室纪律</el-tab-pane>
      <el-tab-pane label="查寝" name="sleep">查寝</el-tab-pane>
    </el-tabs>

  
    
  
  <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="deductionListDialog = false">
          下一个
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
/* eslint-disable */
import { ref, computed, onMounted } from "vue";

import axios from "axios";

const pageStudents = ref([]); // 分页后当前页的学生
const total = ref(0); // 页面总行数
const currentpage = ref(1); // 当前所在页
const pagesize = ref(5); // 每页显示多少行

const SelClassValue = ref("信安二区");

const options = [
  {
    value: "网安一区",
    label: "网安一区",
  },
  {
    value: "网安二区",
    label: "网安二区",
  },
  {
    value: "网安三区",
    label: "网安三区",
  },
  {
    value: "信安一区",
    label: "信安一区",
  },
  {
    value: "信安二区",
    label: "信安二区",
  },
];
let selectChange = () => {
  console.log(SelClassValue.value);
};

// 根据区队过滤数据
const filteredScores = computed(() => {
  if (SelClassValue.value) {
    return score.value.filter(item => item.department === SelClassValue.value);
  }
  return score.value; // 如果没有选择，默认显示所有数据
});

// 表单
const score = ref([]);
const getscore = async () => {
  try {
    const response = await axios.get('/api/score/');
    score.value = response.data.data;
    console.log(score);
  } catch (error) {
    console.error('Error fetching score:', error);
  }
};
onMounted(getscore);




// 弹出框
let deductionListDialog = ref(false);

const activeName = ref("InternalAffair");

const handleClick = (tab, event) => {
  console.log(tab, event);
};

let checkList = ref(["Value selected and disabled", "Value A"]);
</script>






<style scoped>

.el-descriptions {
  margin: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

</style>
