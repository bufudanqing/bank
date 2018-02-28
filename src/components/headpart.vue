<template lang="html">
   <div class="nav" :style="{backgroundImage: 'url(' +img + ')'}">
      <div class="logo" :style="{backgroundImage: 'url(' +title + ')'}">

      </div>
      <div class="user">
         <span>用户名：</span>
         <!-- <span v-text="$store.state.userInfo.nick"></span> -->
         <span v-text="uInfo.nick"></span>
         &nbsp;
         <span>用户角色：</span>
         <!-- <span v-text="$store.state.userInfo.roleId"></span> -->
         <span v-text="uInfo.powerName"></span>
         &nbsp;
         <!-- <span>ID：</span>
         <span v-text="$store.state.userInfo.userId"></span>
         <span>用户角色：</span>
         <span v-text="$store.state.userInfo.roleName"></span> -->
         <button class="logout" @click="logout()" v-if="!isLogouting">
           退出
         </button>
         <span>帮助</span>
      </div>
   </div>
</template>

<script>
import bg from './../assets/header/bg.png'
import title from './../assets/header/title.png'
export default {
  data () {
    return {
      isLogouting: false,
      img: bg,
      title: title,
      uInfo:'',
      truename:'',
      roleid:''
    }
  },
  created () {
    this.uInfo = JSON.parse(localStorage.userinfomation)
    // console.info(this.uInfo)
  },
  methods: {
    logout() {
      // 删除cookie并跳到登录页
      this.isLogouting = true;
      // 请求后端
      this.delCookie('session');

      setTimeout(()=>{
        this.$router.push('/components/login/');
        this.isLogouting = false;
      },500)
    }
  }

}
</script>

<style lang="css" scoped>

.nav{
  width: 100%;
  height: 109px;
  background-color: #1f60c0;
  /* background-image: url('/static/img/header/bg.png'); */
  background-size: cover;
}
.logo{
  width: 712px;
  height:100%;
  /* background-image: url('/static/img/header/title.png'); */
  background-position:center;
  background-repeat: no-repeat;
  margin-left: 60px;
  float: left;
}
.user{
  float:right;
  width:28%;
  height: 100%;
}
.user span{
  display: inline-block;
  line-height: 110px;
  color:#fff;
}
.logout{
  width:50px;
  height:26px;
  background-color: skyblue;
  border:none;
  color:#fff;
  font-size:16px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 3px;
}
</style>
