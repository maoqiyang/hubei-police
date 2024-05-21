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
      :data="StudentsGradeList"
      style="width: 100%"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="selection" width="auto" />
      <el-table-column type="index" label="序号" width="auto">
      </el-table-column>
      <el-table-column property="stuId" label="学号" width="auto" />
      <el-table-column property="Name" label="姓名" width="auto" />
      <el-table-column property="InternalAffair" label="内务" width="auto" />
      <el-table-column
        property="DailyRegime"
        label="一日生活制度"
        width="auto"
      />
      <el-table-column
        property="PolicAppearance"
        label="警容风纪"
        width="auto"
      />
      <el-table-column property="FormationDis" label="队列纪律" width="auto" />
      <el-table-column property="classDiS" label="教室纪律" width="auto" />
      <el-table-column property="Sum" label="总分" width="auto" />
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
import { ref, reactive } from "vue";
const SelClassValue = ref("");
const options = [
  {
    value: "网安一区",
    label: "网安一区",
  },
  {
    value: "网安二区",
    label: "网安二区",
  },
];
let selectChange = () => {
  console.log(SelClassValue.value);
};

// 表单
let StudentsGradeList = reactive([
  {
    stuId: 20230371000,
    Name: "张山",
    address: "武汉市洪山区",
    InternalAffair: 100,
    DailyRegime: 100,
    PolicAppearance: 100,
    FormationDis: 100,
    classDiS: 100,
    Sum: 100,
  },
  {
    stuId: 20230371001,
    Name: "里斯",
    address: "武汉市硚口区",
    InternalAffair: 100,
    DailyRegime: 100,
    PolicAppearance: 100,
    FormationDis: 100,
    classDiS: 100,
    Sum: 100,
  },
]);

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
