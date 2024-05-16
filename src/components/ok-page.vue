<template>
  <el-form :inline="true" style="margin-top: 20px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="请输入查询条件：">
          <el-input
            v-model="inputStr"
            placeholder="输入查询条件"
            style="width: 420px"
          >
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="text-align: right; padding-right: 10px">
        <el-button-group>
          <el-button type="primary" :icon="Search" @click="queryStudents()"
            >查询</el-button
          >
          <el-button type="primary" :icon="Share" @click="getAllStudents()"
            >全部</el-button
          >
          <el-button type="primary" :icon="CirclePlus">添加</el-button>
        </el-button-group>
      </el-col>

      <el-col :span="2">
        <el-upload>
          <el-button type="primary">导入Excel</el-button>
        </el-upload>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">导出Excel</el-button>
      </el-col>
    </el-row>
  </el-form>

  <!-- 表格 -->
  <el-table
    :data="pageStudents"
    style="width: 100%"
    border
    :cell-style="{ textAlign: 'center' }"
    :header-cell-style="{ 'text-align': 'center' }"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column type="index" label="序号" width="60"> </el-table-column>
    <el-table-column prop="sno" label="学号" width="80"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
    <el-table-column prop="gender" label="性别" width="60"> </el-table-column>
    <el-table-column prop="birthday" label="出生日期" width="100">
    </el-table-column>
    <el-table-column prop="mobile" label="电话" width="120"> </el-table-column>
    <el-table-column prop="email" label="邮箱" width="220"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
    <el-table-column label="操作" width="180">
      <el-button type="primary" icon="Edit" circle></el-button>
      <el-button type="success" icon="Check" circle></el-button>

      <el-button type="danger" icon="Delete" circle></el-button>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-row style="margin-top: 20px">
    <el-col :span="8" style="text-align: left">
      <el-button type="primary" :icon="Delete">批量删除</el-button>
    </el-col>

    <el-col :span="16" style="text-align: right">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="[5, 10, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElButton, ElTable, ElForm, ElInput, ElRow, ElCol, ElPagination, ElUpload, ElButtonGroup } from 'element-plus';
import { Search, Share, CirclePlus, Delete } from '@element-plus/icons-vue';

const baseURL = "/api";
const students = ref([]);
const pageStudents = ref([]); // 分页后当前页的学生
const total = ref(0); // 页面总行数
const currentpage = ref(1); // 当前所在页
const pagesize = ref(10); // 每页显示多少行
const inputStr = ref('');

// 自动加载数据
onMounted(() => {
    getStudents();
});

// 获取所有学生信息
function getStudents() {
    axios.get(baseURL + "students/")
        .then(res => {
            if (res.data.code == 1) {
                students.value = res.data.data;
                total.value = res.data.data.length;
                getPageStudents();
                ElMessage({
                    message: "数据加载成功",
                    type: 'success'
                });
            } else {
                ElMessage.error(res.data.msg);
            }
        })
        .catch(err => {
            console.log(err);
            ElMessage.error("请求数据失败！");
        });
}

// 获取当前页的学生数据
function getPageStudents() {
    pageStudents.value = [];
    let start = (currentpage.value - 1) * pagesize.value;
    let end = start + pagesize.value;
    pageStudents.value = students.value.slice(start, end);
}

// 查询学生
function queryStudents() {
    axios.post(baseURL + "students/query/", {
        inputstr: inputStr.value
    })
    .then(res => {
        if (res.data.code == 1) {
            students.value = res.data.data;
            total.value = res.data.data.length;
            getPageStudents();
            ElMessage({
                message: "查询数据加载成功",
                type: 'success'
            });
        } else {
            ElMessage.error(res.data.msg);
        }
    })
    .catch(err => {
        console.log(err);
        ElMessage.error("获取后端查询结果出现异常！");
    });
}
// 清空输入并获取所有学生信息的函数
function getAllStudents() {
    inputStr.value = ""; // 清空搜索输入
    getStudents(); // 调用获取所有学生的函数
}

// 修改每页显示的条目数
function handleSizeChange(size) {
    pagesize.value = size;
    getPageStudents();
}

// 修改当前页码
function handleCurrentChange(page) {
    currentpage.value = page;
    getPageStudents();
}


</script>
