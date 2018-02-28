<template>
  <div id="app">
    <headpart class="headpart" v-if="show1"></headpart>
    <sidebar class="side" v-if="show2"></sidebar>

    <!-- <headpart class="headpart" v-if="['login'].indexOf($router.name) > -1"></headpart>
    <sidebar class="side" v-if="['login'].indexOf($router.name) > -1"></sidebar> -->
    <router-view></router-view>
  </div>
</template>

<script>
import login from './components/login.vue'
import headpart from './components/headpart.vue'
import sidebar from './components/sidebar.vue'
import userlist from './components/user/userlist.vue'
import role from './components/user/role.vue'
import authority from './components/user/authority.vue'
import addUser from './components/user/children/addUser'
import infoinput from './components/evaluation/infoinput.vue'

import verifylist from './components/evaluation/verifylist.vue'
import verifylistAdmin from './components/evaluation/verifylistAdmin.vue'
import implement from './components/evaluation/implement'
import implementResult from './components/evaluation/implementResult'
import score from './components/evaluation/score'
import model from './components/model/model'
import addWeight from './components/model/addWeight'
import modelList from './components/model/modelList'
import system from './components/indicator/system.vue'
// import treeNode from './components/indicator/treeNode.vue'
import weight from './components/indicator/weight.vue'
import charts from './components/analysis/charts.vue'
import axios from 'axios'
// import {store} from './store'
export default {
  name: 'app',
  components: {
    login,
    headpart,
    sidebar,
    userlist,
    role,
    authority,
    infoinput,
    verifylist,
    system,
    weight,
    implement,
    implementResult,
    score,
    charts,
    addUser,
    model,
    addWeight,
    modelList
  },
  data () {
    return {
      show1: true,
      show2: true,
      isLogin: false,
      userInfo: {
        // 保存用户信息
        nick: null,
        powerName: null,
        userId: null,
        powerId: null
      }
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('route switched')
    },
    '$route' () {
      console.log(this.$route.name)
      this.show1 = this.$route.name !== 'login'
      this.show2 = this.$route.name !== 'login'

      // console.info(this.$store.state.userInfo.roleId)
      // let rd = this.$store.state.userInfo.roleId
      let mydata = JSON.parse(localStorage.userinfomation)
      // if ( !this.$store.state.userInfo.userId || this.$store.state.userInfo.userId == ''){
      //   this.$router.push('/components/login')
      // }
      if ( !mydata.userId || mydata.userId == ''){
        this.$router.push('/components/login')
      }
    }
  },
  created(){
     this.show1 = this.$route.name !== 'login'
     this.show2 = this.$route.name !== 'login'
     // let rd = this.$store.state.userInfo.roleId
     // let ud = this.$store.state.userInfo.userId
     // if ( !this.$store.state.userInfo.userId || this.$store.state.userInfo.userId == ''){
     //   this.$router.push('/components/login')
     // }
       let mydata = JSON.parse(localStorage.userinfomation)
       if ( !mydata.userId || mydata.userId == ''){
         this.$router.push('/components/login')
       }

  },
  mounted(){
   //组件开始挂载时获取用户信息
   this.getUserInfo();
   // console.info(this.$store.state.userInfo.roleId)
   let rd = this.$store.state.userInfo.roleId
 },
  methods: {
    turnUrl (name) {
      this.$router.push(name)
    },
    loginPage () {
      let current_route = this.$router.name
    },
    getUserInfo () {
      // 发送http请求获取

      // this.userInfo = {
      //   nick: 'admin',
      //   powerName: 'admin',
      //   userId: 1,
      //   powerId: 1
      // }
      // this.$store.commit('updateUserInfo', this.userInfo)

    }
  }
}


</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  margin:0;
  padding: 0;
}
body{
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}

.side{
  width:239px;
  /* height: 100%; */
  background-color: #1f60c0;
  position: absolute;
bottom: 0;
top: 109px;
}

</style>
