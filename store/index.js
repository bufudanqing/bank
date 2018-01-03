import Vue from 'vue'
import Vuex from 'vuex'

// 告诉vue使用 vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
// 需要维护的状态
const store = new Vuex.Store({
  state: {
    // 保存后台请求地址
    domain: 'http://',
    userInfo: {
      nick: null,
      powerName: null,
      userId: null,
      roleId: null
    },
    chooseStatus: {
      disabled1:false,
      disabled2:false,
      disabled3:false,
    },
    bankId: '',
    bkName: ''
  },
  mutations: {
    // 更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
    save_bkInfo(state, bkId, bkName){
      state.bkId = bkId;
      state.bkName = bkName
    },
    save_choose(state, chooseStatus){
      state.chooseStatus = chooseStatus
    }
  }
})

// 整合初始状态和变更函数，我们就得到了所需的store
// 至此，这个store就可以连接到我们的引用中
export default store
