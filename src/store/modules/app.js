import { login as loginApi } from '@/api/login'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    // token 来自登录页面 点击登录之后，所以不如直接放到actions中
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            console.log(res)
            commit('setToken', res.token)
            router.replace('/ok')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}