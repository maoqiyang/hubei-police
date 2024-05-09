/* eslint-disable */
import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
    baseURL: "/api",
    timeout: 5000
})

service.interceptors.request.use(
    (config) => {
      config.headers.Authorization = localStorage.getItem('token')
      return config
    },
    (error) => {
      return Promise.reject(new Error(error))
    }
  )

service.interceptors.response.use(
    response => {
      const { data, status } = response;
      if (status === 200 || status === 201) {
        console.log('hello');
        return data;  // 正确返回响应数据
      } else {
        // 此处应正确引用错误消息，因为此块无原始错误对象，使用响应数据中的错误信息
        ElMessage.error('Login failed: ' + data.message); 
        return Promise.reject(new Error(data.message));
      }
    },
    error => {
      // 对于错误响应处理，检查error.response是否存在
      if (error.response) {
        // 如果有响应体且响应体中有数据，显示该错误消息
        ElMessage.error('Login failed: ' + (error.response.data.message || error.response.data));
        return Promise.reject(new Error(error.response.data.message || error.response.data));
      } else {
        // 处理网络或其他错误，没有响应体
        ElMessage.error('Network error: ' + error.message);
        return Promise.reject(error);
      }
    }
  );
  

export default service
