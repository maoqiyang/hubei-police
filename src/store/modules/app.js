import { login as loginApi } from '@/api/login'
import router from '@/router'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    RulesList:[] //扣分细则
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    // 把扣分细则放到vuex中来
    SetRuleList(state, list) {
      state.RulesList = list
      // console.log('要放入state的细则是',list);
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
    },
    //请求扣分细则
    getRules:  async({commit})=>{
      try {
        const response =await  axios.get('/api/rules/');
        const rules = response.data.data;
       let dailyRegimeRules= rules.filter(rule => rule.rule_id >= 1 && rule.rule_id <= 18);
       let policeAppearanceRules = rules.filter(rule => rule.rule_id >= 19 && rule.rule_id <= 36);
       let attire = rules.filter(rule => rule.rule_id >= 37 && rule.rule_id <= 46);
       let queue= rules.filter(rule => rule.rule_id >= 47 && rule.rule_id <= 50);
       let classDiS = rules.filter(rule => rule.rule_id >= 51 && rule.rule_id <= 54);
       let sleep= rules.filter(rule => rule.rule_id >= 55 && rule.rule_id <= 57);
       commit('SetRuleList', [dailyRegimeRules,policeAppearanceRules,attire,queue,classDiS,sleep])
        console.log(2);
      } catch (error) {
        console.error('Error fetching penalty rules:', error);
      }
    }
  }
}

