<template>
  <el-form :inline="true" style="margin-top: 20px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="请输入查询条件：">
          <el-input v-model="inputStr" placeholder="输入查询条件" style="width: 420px">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="text-align: right; padding-right: 10px">
        <el-button-group>
          <el-button type="primary" :icon="Search" @click="queryStudents()">查询</el-button>
          <el-button type="primary" :icon="Share" @click="getAllStudents()">全部</el-button>
          <el-button type="primary" :icon="CirclePlus" @click="addStudent()">添加</el-button>
        </el-button-group>
      </el-col>

      <el-col :span="2">
        <el-upload :show-file-list="false" :http-request="uploadExcelPost">
          <el-button type="primary">导入Excel</el-button>
        </el-upload>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="exportToExcel()">导出Excel</el-button>
      </el-col>
    </el-row>
  </el-form>

  <!-- 表格 -->
  <el-table :data="pageStudents" style="width: 100%" border :cell-style="{ textAlign: 'center' }"
    :header-cell-style="{ 'text-align': 'center' }" @selection-change="handleSelectionChange">

    <el-table-column type="selection" width=60px />
    <el-table-column prop="id" label="ID" width="130px"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="90px"> </el-table-column>
    <el-table-column prop="gender" label="性别" width="50px"> </el-table-column>
    <el-table-column prop="area" label="地区" width="100px"></el-table-column>
    <el-table-column prop="ethnicity" label="民族" width="70px"></el-table-column>
    <el-table-column prop="political_affiliation" label="政治面貌" width="90px"></el-table-column>
    <el-table-column prop="department" label="部门" width="140px"> </el-table-column>
    <el-table-column prop="address" label="地址" width="160px"> </el-table-column>
    <el-table-column prop="phone_number" label="电话号码" width="130px"> </el-table-column>

    <el-table-column label="操作" width="180px">
      <template #default="{ row }">
        <el-button type="primary" icon="More" circle @click="viewStudent(row)"></el-button>
        <el-button type="success" icon="Edit" circle @click="updateStudent(row)"></el-button>

        <el-button type="danger" icon="Delete" circle @click="deleteStudent(row)"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-row style="margin-top: 20px">
    <el-col :span="8" style="text-align: left">
      <el-button type="danger" :icon="Delete" @click="deleteStudents()">批量删除</el-button>
    </el-col>

    <el-col :span="16" style="text-align: right">
      <span class="demonstration"></span>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentpage"
        :page-sizes="[5, 10, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-col>
  </el-row>

  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%" @close="closeDialogForm"
    :close-on-click-modal="false">
    <el-form label-width="80px" :model="studentForm" :rules="rules" ref="formRef">
      <el-upload class="avatar-uploader" :http-request="uploadPicturePost"  :disabled="isView" :show-file-list="false"  style="text-align: center; margin:20px">
          <img v-if="studentForm.image" :src="studentForm.imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      <!-- ref="studentForm" -->
      <el-row :gutter="20">
  
        <el-col :span="12">
          <el-form-item label="学号" prop="id">
            <el-input v-model="studentForm.id" :disabled="isEdit || isView" :suffix-icon="EditPen"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="studentForm.name" :disabled="isView" :suffix-icon="EditPen"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="gender">
            <el-select placeholder="请选择性别" v-model="studentForm.gender" :disabled="isView" style="width: 100%">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地区" prop="area">
            <el-input v-model="studentForm.area" :disabled="isView" :suffix-icon="EditPen"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="ethnicity">
            <el-input v-model="studentForm.ethnicity" :disabled="isView" :suffix-icon="EditPen"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="政治面貌" prop="political_affiliation">
            <el-input v-model="studentForm.political_affiliation" :disabled="isView" :suffix-icon="EditPen"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门" prop="department">
            <el-input v-model="studentForm.department" :disabled="isView" :suffix-icon="EditPen"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址" prop="address">
            <el-input v-model="studentForm.address" :disabled="isView" :suffix-icon="EditPen"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话号码" prop="phone_number">
            <el-input v-model="studentForm.phone_number" :disabled="isView" :suffix-icon="EditPen"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" v-show="!isView" @click="submitForm('studentForm')">Confirm</el-button>
        <el-button type="info" @click="closeDialogForm()">Cancel</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { ElMessage, ElButton, ElTable, ElForm, ElInput, ElRow, ElCol, ElPagination, ElUpload, ElButtonGroup, ElMessageBox } from 'element-plus';
import { EditPen, Search, Share, CirclePlus, Delete } from '@element-plus/icons-vue';

const imageUrl = ref('');

const baseURL = "/api";
const students = ref([]);
const pageStudents = ref([]); // 分页后当前页的学生
const total = ref(0); // 页面总行数
const currentpage = ref(1); // 当前所在页
const pagesize = ref(10); // 每页显示多少行
const inputStr = ref('');
const dialogVisible = ref(false);
const dialogTitle = ref('');
const isView = ref(false);
const isEdit = ref(false); //标识是否查看还是修改

const selectStudents = ref([]);

const studentForm = reactive({
  "id": "20230371999",
  "name": "我是默认值",
  "gender": "男",
  "area": "你猜猜区域",
  "ethnicity": "不错",
  "political_affiliation": "不错",
  "department": "部门",
  "address": "111",
  "phone_number": "13164101211",
  "image": '',
  "imageUrl": '',
});
const ruleSNo = (rule, value, callback) => {
  if (isEdit.value) { callback(); }
  axios.post(baseURL + "id/check/", { id: value })
    .then((res) => {
      if (res.data.code === 1) {
        if (res.data.exists) {
          callback(new Error('学号已经存在'));
        } else {
          callback();
        }
      } else {
        callback(new Error(`后端校验学号出现异常: ${res.data.msg || '未知错误'}`));
      }
    })
    .catch((err) => {
      console.error("请求失败:", err);
      callback(new Error("网络请求失败，请检查网络连接或联系管理员"));
    });
};


const rules = reactive({
  id: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    { pattern: /^[2][0]\d{9}$/, message: '学号必须为20开头的11位数', trigger: 'blur' },
    { validator: ruleSNo, trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: '姓名必须是2-5个汉字', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '性别不能为空', trigger: 'blur' },
  ],
  area: [
    { required: true, message: '区域不能为空', trigger: 'blur' },
  ],
  ethnicity: [
    { required: true, message: '名族不能为空', trigger: 'blur' },
  ],
  political_affiliation: [
    { required: true, message: '政治面貌不能为空', trigger: 'blur' },
  ],
  department: [
    { required: true, message: '部门不能为空', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '地址不能为空', trigger: 'blur' },
  ],
  phone_number: [
    { required: true, message: '地址不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ]
});


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

//打开表单
function addStudent() {
  //弹出表单
  dialogVisible.value = true;
  //修改标题
  dialogTitle.value = "添加学生明细";
}


function viewStudent(row) {
  dialogVisible.value = true;
  console.log(row)
  Object.keys(studentForm).forEach(key => {
    studentForm[key] = row[key];
  });
  isView.value = true;
  dialogTitle.value = "查看学生明细";
  studentForm.image = getImageBySno(row.id);
  // 获取照片 URL
  studentForm.imageUrl = `${baseURL}media/${studentForm.image}`;
  
}

function closeDialogForm() {
  //清空
  Object.keys(studentForm).forEach(key => {
    studentForm[key] = "";
  });
  dialogVisible.value = false;
  //初始化isview与isedit
  isEdit.value = false;
  isView.value = false;
  //formRef.value.resetFields();
}

function updateStudent(row) {
  isEdit.value = true;
  dialogVisible.value = true;
  console.log(row)
  Object.keys(studentForm).forEach(key => {
    studentForm[key] = row[key];
  });
  dialogTitle.value = "修改学生明细";
  studentForm.image = getImageBySno(row.id);
  // 获取照片 URL
  studentForm.imageUrl = `${baseURL}media/${studentForm.image}`;
}


//添加到数据库
const submitAddStudent = async () => {
  try {
    const response = await axios.post(baseURL + "student/add/", studentForm);
    if (response.data.code === 1) {
      students.value = response.data.data;
      total.value = response.data.data.length;
      getPageStudents();
      ElMessage.success("添加学生信息成功");
      closeDialogForm();
    } else {
      ElMessage.error(response.data.msg);
    }
  } catch (err) {
    console.error(err);
    ElMessage.error("添加学生信息失败！");
  }
};

//修改到数据库函数
const submitUpdateStudent = async () => {
  try {
    const response = await axios.post(baseURL + "student/add/", studentForm);
    if (response.data.code === 1) {
      students.value = response.data.data;
      total.value = response.data.data.length;
      getPageStudents();
      ElMessage.success("修改学生信息成功");
      closeDialogForm();
    } else {
      ElMessage.error(response.data.msg);
    }
  } catch (err) {
    console.error(err);
    ElMessage.error("修改学生信息失败！");
  }
};

//提交表单
const formRef = ref(null);
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log(isEdit.value)
      if (isEdit.value) { submitUpdateStudent(); }

      else { submitAddStudent(); }

    } else {
      console.error('error submit!!');
      return false;
    }
  });
};

//删除一条学生记录
const deleteStudent = (row) => {
  ElMessageBox.confirm(`是否确认删除学生信息【学号：${row.id}\t姓名：${row.name}】信息？`, '提示', {
    confirmButtonText: '确定删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    axios.post(`${baseURL}student/delete/`, { id: row.id })
      .then(res => {
        if (res.data.code === 1) {
          students.value = res.data.data;
          total.value = res.data.data.length;
          getPageStudents();
          ElMessage.success('数据删除成功！');
        } else {
          ElMessage.error(res.data.msg);
        }
      });
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

//多选删除
const deleteStudents = () => {
  if (selectStudents.value.length === 0) {
    ElMessage.warning('请选择要删除的学生');
    return;
  }
  ElMessageBox.confirm(`是否确认批量删除${selectStudents.value.length}个学生信息吗？`, '提示', {
    confirmButtonText: '确定删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    axios.post(`${baseURL}students/delete/`, { student: selectStudents.value })
      .then(res => {
        if (res.data.code === 1) {
          students.value = res.data.data;
          total.value = res.data.data.length;
          getPageStudents();
          ElMessage.success('数据批量删除成功！');
        } else {
          ElMessage.error(res.data.msg);
        }
      });
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

function handleSelectionChange(data) {
  selectStudents.value = data;
  console.log(data);
};


const uploadPicturePost = (file) => {
  let fileReq = new FormData();
  fileReq.append('avatar', file.file);

  axios({
    method: 'post',
    url: baseURL + 'upload/',
    data: fileReq,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    if (res.data.code === 1) {
      studentForm.image = res.data.name;
      studentForm.imageUrl = baseURL + "media/" + res.data.name;
      ElMessage.success("图片上传成功！");
    } else {
      ElMessage.error(res.data.msg);
    }
  }).catch(err => {
    console.error(err);
    ElMessage.error("上传头像出现异常！");
  });
};

const getImageBySno = (id) => {
  const student = students.value.find(student => student.id === id);
  return student ? student.image : null;
};


const uploadExcelPost = (file) => {
  let fileReq = new FormData();
  fileReq.append('excel', file.file);  // 添加文件到表单数据

  axios({
    method: 'post',
    url: baseURL+ 'excel/import/',
    data: fileReq
  }).then(res => {
    if (res.data.code === 1) {
      students.value = res.data.data;
      total.value = res.data.data.length;
      // 调用更新分页学生信息的方法
      getPageStudents();
      // 使用 Element Plus 的对话框显示导入结果
      ElMessageBox.alert(`本次导入完成! 成功：${res.data.success} 失败：${res.data.error}`, '导入结果展示', {
        confirmButtonText: '确定'
      }).then(() => {
        ElMessage.info(`本次导入失败数量为：${res.data.error}, 具体的学号：${res.data.errors}`);
      });
      console.log(`本次导入失败数量为：${res.data.error}, 具体的学号：`);
      console.log(res.data.errors);
    } else {
      ElMessage.error(res.data.msg);
    }
  }).catch(err => {
    console.error(err);
    ElMessage.error("上传Excel出现异常！");
  });
};

const exportToExcel = () => {
  axios.get(`${baseURL}excel/export/`).then(res => {
    if (res.data.code === 1) {
      // 拼接 Excel 的完整 URL
      let url = `${baseURL}media/${res.data.name}`;
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

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.el-dialog__headerbtn:hover {
  background-color: transparent !important;
}

.el-form-item__label {
  text-align: left;
  /* 设置标签文本为右对齐 */
}

.el-form-item {
  margin-bottom: 20px;
  /* 增加表单项之间的底部间距 */
}

.el-input,
.el-select {
  height: 36px;
  /* 设置输入框和选择框的高度 */
}

.el-form {
  background-color: #f9f9f9;
  /* 设置表单背景色 */
  padding: 20px;
  /* 设置内边距 */
  border-radius: 10px;
  /* 设置边角圆滑 */
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);

}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>