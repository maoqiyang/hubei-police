<template>
  <!-- 头部 -->
  <el-row style="margin: 20px 0px">
    <el-col :span="6">
      <span>当前区队：</span>
      <el-select v-model="SelClassValue" @change="selectChange" placeholder="请选择..." style="width: 150px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select></el-col>
    <el-col :span="12"> </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="deductionListDialog = true">录入成绩</el-button>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="exportToExcel">导出区队</el-button>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="exportToExcelALL">导出所有</el-button>
    </el-col>

  </el-row>
  <!-- 成绩数据 -->
  <el-row>
    <el-table :data="ShowScoreList" style="width: 100%" border :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }">
      <!-- :default-sort="{ prop: 'total_score', order: 'descending' }" -->
      <!-- <el-table-column type="index" label="名次" width="auto" /> -->
      <el-table-column property="student_id" label="学号" width="120px" />
      <el-table-column property="name" label="姓名" width="auto" />
      <el-table-column property="department" label="区队" width="auto" />
      <el-table-column property="dormitory_score" label="内务" width="auto" />
      <el-table-column property="daily_life_score" label="一日生活制度" width="auto" />
      <el-table-column property="discipline_score" label="警容风纪" width="auto" />
      <el-table-column property="formation_score" label="队列规范" width="auto" />
      <el-table-column property="classroom_score" label="教室纪律" width="auto" />
      <el-table-column property="dorm_check_score" label="查寝" width="auto" />
      <el-table-column property="total_score" sortable label="总分" width="auto" />
      <el-table-column property="list" label="扣分项" width="auto">
        <template #default="scoped">
          <span v-if="scoped.row.list == null || scoped.row.list.length == 0">
            暂无扣分
          </span>
          <span v-else>
            <el-popover placement="right" :width="700" trigger="hover">
              <template #reference>
                <span style="cursor:pointer">详情</span>
              </template>
              <el-table :data="scoped.row.list" style="width: 100%" border :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ 'text-align': 'center' }">
                <el-table-column width="auto" property="reason" label="原因" />
                <el-table-column width="auto" property="score" label="分值" />
                <el-table-column width="auto" property="timer.1" label="周一" />
                <el-table-column width="auto" property="timer.2" label="周二" />
                <el-table-column width="auto" property="timer.3" label="周三" />
                <el-table-column width="auto" property="timer.4" label="周四" />
                <el-table-column width="auto" property="timer.5" label="周五" />
              </el-table>
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="auto">
        <template #default="scoped">
          <el-button type="primary" @click="changeGru(scoped.row.student_id)">调整</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <!-- 分页 -->
  <el-row style="text-align: left">
    <el-col :span="0">
    </el-col>
    <el-col :span="11">
      <el-button type="danger" @click="resetScores" style="text-align: center; margin-top: 20px">重置积分</el-button>
    </el-col>
    <el-col :span="13">
      <el-pagination :current-page="searchData.current" :page-size="searchData.limit" :total="total"
        style="text-align: center; margin-top: 20px" layout="total,sizes,jumper, prev, pager, next"
        @current-change="initDate" :page-sizes="[5, 10, 50]" @size-change="handleSizeChange" /></el-col>
  </el-row>

  <!-- 弹出框 -->
  <el-dialog v-model="deductionListDialog" title="录入成绩" width="800" @open="DialogOpen">
    <!-- 个人信息 -->
    <el-descriptions class="margin-top" :column="4" size="small" border>
      <el-descriptions-item span="2">
        <template #label>
          <div class="cell-item">学号</div>
        </template>
        {{ filteredScores[i].student_id }} </el-descriptions-item><el-descriptions-item>
        <template #label>
          <div class="cell-item">姓名</div>
        </template>
        {{ filteredScores[i].name }}
      </el-descriptions-item></el-descriptions>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="内务" name="dailyRegimeRules">
        <el-table :cell-style="{ textAlign: 'center' }" :header-cell-style="{ 'text-align': 'center' }"
          :data="dailyRegimeRules" style="width: 100%" height="250" @cell-click="cellClick">
          <el-table-column fixed prop="reason" label="类目" width="150" />
          <el-table-column label="时间">
            <el-table-column prop="timer.1" label="周一 " width="120" />
            <el-table-column prop="timer.2" label="周二 " width="120" />
            <el-table-column prop="timer.3" label="周三 " width="120" />
            <el-table-column prop="timer.4" label="周四 " width="120" />
            <el-table-column prop="timer.5" label="周五 " width="120" />
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="一日生活制度" name="policeAppearanceRules"><el-table :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ 'text-align': 'center' }" :data="policeAppearanceRules" style="width: 100%" height="250"
          @cell-click="cellClick">
          <el-table-column fixed prop="reason" label="类目" width="150" />
          <el-table-column label="时间">
            <el-table-column prop="timer.1" label="周一 " width="120" />
            <el-table-column prop="timer.2" label="周二 " width="120" />
            <el-table-column prop="timer.3" label="周三 " width="120" />
            <el-table-column prop="timer.4" label="周四 " width="120" />
            <el-table-column prop="timer.5" label="周五 " width="120" />
          </el-table-column>
        </el-table></el-tab-pane>
      <el-tab-pane label="警容风纪" name="attire"><el-table :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ 'text-align': 'center' }" :data="attire" style="width: 100%" height="250"
          @cell-click="cellClick">
          <el-table-column fixed prop="reason" label="类目" width="150" />
          <el-table-column label="时间">
            <el-table-column prop="timer.1" label="周一 " width="120" />
            <el-table-column prop="timer.2" label="周二 " width="120" />
            <el-table-column prop="timer.3" label="周三 " width="120" />
            <el-table-column prop="timer.4" label="周四 " width="120" />
            <el-table-column prop="timer.5" label="周五 " width="120" />
          </el-table-column>
        </el-table></el-tab-pane>
      <el-tab-pane label="队列纪律" name="queue"><el-table :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ 'text-align': 'center' }" :data="queue" style="width: 100%" height="250"
          @cell-click="cellClick">
          <el-table-column fixed prop="reason" label="类目" width="150" />
          <el-table-column label="时间">
            <el-table-column prop="timer.1" label="周一 " width="120" />
            <el-table-column prop="timer.2" label="周二 " width="120" />
            <el-table-column prop="timer.3" label="周三 " width="120" />
            <el-table-column prop="timer.4" label="周四 " width="120" />
            <el-table-column prop="timer.5" label="周五 " width="120" />
          </el-table-column>
        </el-table></el-tab-pane>
      <el-tab-pane label="教室纪律" name="classDiS"><el-table :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ 'text-align': 'center' }" :data="classDiS" style="width: 100%" height="250"
          @cell-click="cellClick">
          <el-table-column fixed prop="reason" label="类目" width="150" />
          <el-table-column label="时间">
            <el-table-column prop="timer.1" label="周一 " width="120" />
            <el-table-column prop="timer.2" label="周二 " width="120" />
            <el-table-column prop="timer.3" label="周三 " width="120" />
            <el-table-column prop="timer.4" label="周四 " width="120" />
            <el-table-column prop="timer.5" label="周五 " width="120" />
          </el-table-column>
        </el-table></el-tab-pane>
      <el-tab-pane label="查寝" name="sleep"><el-table :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ 'text-align': 'center' }" :data="sleep" style="width: 100%" height="250"
          @cell-click="cellClick">
          <el-table-column fixed prop="reason" label="类目" width="150" />
          <el-table-column label="时间">
            <el-table-column prop="timer.1" label="周一 " width="120" />
            <el-table-column prop="timer.2" label="周二 " width="120" />
            <el-table-column prop="timer.3" label="周三 " width="120" />
            <el-table-column prop="timer.4" label="周四 " width="120" />
            <el-table-column prop="timer.5" label="周五 " width="120" />
          </el-table-column>
        </el-table></el-tab-pane>
    </el-tabs>
    <template #footer>
      <div class="dialog-footer">
        <template v-if="btnisAdjust">
          <el-button type="primary" @click="pushAdjustDataFn">提交</el-button>
        </template>
        <template v-else>
          <el-button v-if="btnIsNext" type="primary" @click="nextFn">
            下一个
          </el-button>
          <el-button v-else type="primary" @click="finishFn">
            提交
          </el-button>
        </template>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
/* eslint-disable */
import { ref, reactive, computed, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
const store = useStore()
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
  initDate()
};

// 根据区队过滤数据
const filteredScores = computed(() => {
  if (SelClassValue.value) {
    return score.value.filter(item => item.department === SelClassValue.value);
  }
  return score.value; // 如果没有选择，默认显示所有数据
});
// 表单
const score = ref([]); //成绩信息
const getscore = async () => {
  try {
    const response = await axios.get('/api/score/');
    // 检查并解析数据
    if (typeof response.data.data === 'string') {
      score.value = JSON.parse(response.data.data);
    } else {
      score.value = response.data.data;
    }
    console.log('请求来的成绩数据', score);
    initDate();
  } catch (error) {
    console.error('Error fetching score:', error);
  }
};

onMounted(() => {
  getscore()
});

// 分页功能
let ShowScoreList = ref([])
const total = computed(() => {
  return filteredScores.value.length - 1;
});
const searchData = reactive({
  current: 1,
  limit: 5,
});

let pageQuery = (current, limit) => {
  let begin = current * limit - limit;
  let end = current * limit;
  ShowScoreList.value = filteredScores.value.slice(begin, end);
};

let initDate = (val = 1) => {
  //初始化展示的成绩数据
  ShowScoreList.value = filteredScores.value
  searchData.current = val;
  pageQuery(searchData.current, searchData.limit);
}
let handleSizeChange = (size) => {
  searchData.limit = size
  pageQuery(searchData.current, searchData.limit);
}
// 分页功能结束

// 弹出框
let deductionListDialog = ref(false);
let DialogOpen = () => { //弹出框打开时的回调
  changeRulesDate()       // 弹出框打开时去vuex把细则数据拿过来
}
const activeName = ref("dailyRegimeRules");
const newRulesDate = ref([]);
const dailyRegimeRules = ref([]);
const policeAppearanceRules = ref([]);
const attire = ref([]);
const queue = ref([]);
const classDiS = ref([]);
const sleep = ref([]);

// 打对勾函数
let cellClick = (row, column) => {
  // console.log(row,column,'randc');
  // const columnIndex = newRulesDate.value.findIndex((item) => item == row);
  if (column.property === "reason") {
    return;
  }
  if (row[column.property] === "√") {
    row[column.property] = "";
    filteredScores.value[i.value].list.push(row)

  } else {
    row[column.property] = "√";
    filteredScores.value[i.value].list.push(row)

  }
};
// 编辑细则数据 把他变成我想要的格式
let changeRulesDate = () => {
  store.dispatch("app/getRules").then(setdata)
}
let setdata = () => {
  let oldRulesDate = store.state.app.RulesList //从vuex把细则数据下拿来

  for (let i = 0; i < oldRulesDate.length; i++) {
    for (let j = 0; j < oldRulesDate[i].length; j++) {
      oldRulesDate[i][j].timer = { 1: "", 2: "", 3: "", 4: "", 5: "", }
    }
  }
  [dailyRegimeRules.value, policeAppearanceRules.value, attire.value, queue.value, classDiS.value, sleep.value] = oldRulesDate
  newRulesDate.value = oldRulesDate
}

//打分功能
let btnIsNext = ref(true);
let i = ref(0);
let nextFn = () => {
  // console.log('ii',i.value);
  // 计算上一个人的分数
  computegru()
  // console.log('count',counter);
  i.value++
  // 拿下个人的信息 准备给下个人打分
  if (i.value < filteredScores.value.length) {
    changeRulesDate()
  } else {
    i.value = 0
    btnIsNext.value = false;
  }
}
let finishFn = () => {
  console.log('发请求 提交filteredScores');
  // getscore()   // 重新请求数据 更新成绩信息 (请求写好后解锁)
  deductionListDialog.value = false
}
// 分数计算函数
let computegru = () => {
  let obj = {};
  filteredScores.value[i.value].list = filteredScores.value[i.value].list.reduce((cur, next) => {
    obj[next.rule_id] ? '' : (obj[next.rule_id] = true && cur.push(next));
    return cur;
  }, []);
  let counter = reactive({
    a: 0, b: 0, c: 0, d: 0, e: 0, f: 0
  })
  filteredScores.value[i.value].dormitory_score = 0
  filteredScores.value[i.value].daily_life_score = 0
  filteredScores.value[i.value].discipline_score = 0
  filteredScores.value[i.value].formation_score = 0
  filteredScores.value[i.value].classroom_score = 0
  filteredScores.value[i.value].dorm_check_score = 0
  
  filteredScores.value[i.value].list.forEach(item => {
    for (let key in item) {
      if (item.hasOwnProperty(key) && item[key] == '') { delete item[key] }
      if (item.hasOwnProperty(key) && key.startsWith('timer.')) {
        if (item.rule_id >= 1 && item.rule_id <= 18) {
          counter.a += item.score
          filteredScores.value[i.value].dormitory_score = counter.a
        } else if (item.rule_id >= 19 && item.rule_id <= 36) {
          counter.b += item.score
          filteredScores.value[i.value].daily_life_score = counter.b

        } else if (item.rule_id >= 37 && item.rule_id <= 46) {
          counter.c += item.score
          filteredScores.value[i.value].discipline_score = counter.c

        } else if (item.rule_id >= 47 && item.rule_id <= 50) {
          counter.d += item.score
          filteredScores.value[i.value].formation_score = counter.d

        } else if (item.rule_id >= 51 && item.rule_id <= 54) {
          counter.e += item.score
          filteredScores.value[i.value].classroom_score = counter.e

        } else if (item.rule_id >= 55) {
          counter.f += item.score
          filteredScores.value[i.value].dorm_check_score = counter.f
        }
      }
    }
  })
  filteredScores.value[i.value].total_score = 100 - counter.a - counter.b - counter.c - counter.d - counter.e - counter.f

  console.log('f', filteredScores.value[i.value]);
  try {
    axios.post(baseURL + "upscore/", filteredScores.value[i.value]);

    ElMessage.success('成绩更新成功！');
  } catch (error) {
    ElMessage.error('成绩更新失败，请重试！');
  }
//将分数计算后置为0

console.log('被调整人的信息',filteredScores.value[i.value]);

}

// 调整分数功能
let btnisAdjust = ref(false)  //提交按钮开关
let changeGru = (studentId) => {
  let personIndex = filteredScores.value.findIndex(s => s.student_id === studentId);
  if (personIndex === -1) return;  // 如果找不到学生，直接返回
  let personInfo = filteredScores.value[personIndex];
  i.value = personIndex;  // 更新全局索引
  personInfo.list = []
  // 其他逻辑保持不变
  btnisAdjust.value = true;
  deductionListDialog.value = true;
}
// 提交调整后的信息
const baseURL = "/api";
let pushAdjustDataFn = async () => {
  computegru() // 计算被调整的人的分数
  // console.log('被调整人的信息',filteredScores.value[i.value]);
  console.log('发请求 提交filteredScores.value[i.value]');
  deductionListDialog.value = false
  btnisAdjust.value = false
}

async function resetScores() {
  try {
    await ElMessageBox.confirm(
      '是否确认重置所有学生的积分？这将无法撤销。',
      '重置积分确认',
      {
        confirmButtonText: '确定重置',
        cancelButtonText: '取消',
        type: 'warning'
      }
    );
    // 如果用户确认，则执行重置操作
    const response = await axios.post(`${baseURL}/reset_scores/`);
    if (response.data.code === 200) {
      await getscore(); // 重新请求数据 更新成绩信息
      ElMessage.success('积分已成功重置！');
    } else {
      throw new Error(response.data.message || '后端未返回成功标志，可能的错误信息：' + response.data.error);
    }
  } catch (error) {
    if (error.response) {
      // 处理网络请求错误
      console.error('积分重置失败:', error);
      ElMessage.error('积分重置失败，请重试！错误详情：' + error.message);
    } else if (error === 'cancel') {
      // 处理用户取消操作
      ElMessage.info('已取消重置');
    } else {
      // 处理其他错误
      console.error('操作失败:', error);
      ElMessage.error('操作失败：' + error.message);
    }
  }
}

const exportToExcelALL = () => {
  axios.get(`${baseURL}export_score/`).then(res => {
    if (res.data.code === 1) {
      // 拼接 Excel 的完整 URL
      let url = `${baseURL}media/scores/${res.data.name}`;
      // 下载
      window.open(url);
    } else {
      ElMessage.error("导出Excel出现异常！");
    }
  }).catch(err => {
    console.error(err);
    ElMessage.error("导出Excel出现异常！");
  });
};

const exportToExcel = () => {
  // 获取当前选定的区队名称
  const department = SelClassValue.value;
  // 发起请求，附带区队参数
  axios.get(`${baseURL}export_score/`, { params: { department } }).then(res => {
    if (res.data.code === 1) {
      let url = `${baseURL}media/scores/${res.data.name}`;
      window.open(url);
    } else {
      ElMessage.error("导出Excel出现异常！");
    }
  }).catch(err => {
    console.error(err);
    ElMessage.error("导出Excel出现异常！");
  });
};
</script>

<style scoped>
.el-descriptions {
  margin: 20px;
}

.cell-item {
  display: flex;
  align-items: center;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
<style>
.el-message-box__headerbtn:hover {
  background-color: transparent !important;
}
</style>