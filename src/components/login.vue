<template>
  <!-- <div class="body-wrapper" :style="{backgroundImage: 'url(' +loginbg + ')'}"> -->
    <div class="body-wrapper" >
    <img class="body-bg" :src="loginbg" alt="">
    <div class="login-wrapper" :style="{backgroundImage: 'url(' +bg + ')'}">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="密码">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
          </FormItem><br>
          <FormItem>
              <Button type="primary" @click="toLogin()" >登录</Button>
          </FormItem>
      </Form>
    </div>

  </div>

</template>
<script>
import axios from 'axios'
import bg from './../assets/login/bg.png'
import loginbg from './../assets/login/loginbg1.png'
    export default {
        data () {
            return {
                bg: bg,
                loginbg: loginbg,
                formInline: {
                    user: '',
                    password: ''
                },
                userInfo: {
                  // 保存用户信息
                  nick: '',
                  powerName: '',
                  userId: '',
                  roleId: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {

            toLogin() {
              // 发送参数
              // let loginParam = {
              //   username:this.user,
              //   password:this.password
              // }
              // 设置在登录状态
              this.isLoging = true;
              // 请求后端
              let self = this;
              axios({
                method: 'get',
                url: '/api/bank/login/loginSubmit.do?username='+this.formInline.user+'&password='+this.formInline.password
              })
              .then(function(res) {
                // console.log(res.data[0].status)
                if(res.data[0].status == 0) {
                  alert("登录失败")
                } else {
                  if (res.data[0].status == 1) {
                    //如果登录成功则保存登录状态并设置有效期
                    let expiredays = 1000 * 60 *60 *24 * 15;
                    self.setCookie('session', res.data[0].result.id, expiredays);
                  }
                  self.userInfo = {
                    nick: res.data[0].result[0].trueName,
                    powerName: res.data[0].result[0].roleName,
                    userId: res.data[0].result[0].id,
                    roleId: res.data[0].result[0].roleId
                  }
                  // 存入vuex用户信息
                  self.$store.commit('updateUserInfo', self.userInfo)
                  // 同时存入localStorage用户信息
                  localStorage.setItem("userinfomation", JSON.stringify(self.userInfo))

                  var mydata = JSON.parse(localStorage.userinfomation)

                  // console.info(mydata)
                  if(mydata.roleId == 1) {
                     self.$router.push('/components/verifylist')
                  } else if(mydata.roleId == 3) {
                     self.$router.push('/components/implement')
                  } else if(mydata.roleId == 2) {
                     self.$router.push('/components/infoinput')
                  }

                  // if(self.userInfo.roleId == 1) {
                  //    self.$router.push('/components/userlist')
                  // } else if(self.userInfo.roleId == 3) {
                  //    self.$router.push('/components/implement')
                  // } else if(self.userInfo.roleId == 2) {
                  //    self.$router.push('/components/infoinput')
                  // }
                }

              })
              .catch(function(err) {
                console.log(err)
              })
            }
        }
    }
</script>

<style  scoped>
body{
   width: 100%;
   height: 100%;
}
.body-wrapper{

}
.body-bg{

}
.login-wrapper{
  width: 431px;
  height: 365px;
  /* background-image: url(/static/img/login/bg.png); */
  background-size:cover;
  padding-top: 90px;
  position: absolute;
  top:20%;
  right:10%;
}
.ivu-form{
  margin-top: 30px;
}
.ivu-form-item {
    width: 300px;
}
.ivu-form-item-content button{
  width: 300px;
  background-color: #7fb0ff;
}

</style>
