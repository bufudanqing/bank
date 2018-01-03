<template lang="html">
  <div class="add">
    <div class="wrapper">
      <button class="clo" type="button" name="button" @click="close">X</button>

    </div>
    <Form  label-position="left" :label-width="100">
         <FormItem label="登录名">
             <!-- <Input v-model = 'name'></Input> -->
              <Input type="text" placeholder="" v-model="userName"></Input>
         </FormItem>
         <FormItem label="密码">
             <!-- <Input v-model = 'pwd'></Input> -->
             <Input type="password" placeholder="" v-model="password"></Input>
         </FormItem>
         <FormItem label="用户邮箱">
             <Input type="text" placeholder="" v-model="userEmail"></Input>
         </FormItem>
         <FormItem label="真实姓名">
             <Input type="text" placeholder="" v-model="trueName"></Input>
         </FormItem>
     </Form>

     <Button class='ba' @click="confirmAdd">确认</Button>
     <Button @click="close()">取消</Button>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
        return {
          userName: '',
      		password: '',
          userEmail: '',
          trueName: ''
        }
    },
    methods: {
      // let self = this
      close: function(){
        this.$emit('close');
      },
      confirmAdd: function () {
        // alert(this.userName+this.password+this.trueName)

        axios({
          method: 'get',
          url: '/api/bank/user/addUser.do?userName='+this.userName+'&password='+this.password+'&userEmail='+this.userEmail+'&trueName='+this.trueName

        })
        .then(function(response) {
             if (response.data[0].result == false){
               alert(userName);
               alert('新建用户失败');

             } else {
               alert('新建用户成功');
               close();
               this.$emit('close');
             }
        })
        .catch(function(error) {
             console.log(error);
        })
      }
    }
}

</script>

<style lang="css">
.wrapper{
  width: 100%;
  margin-bottom: 10px;
  height: 30px;
}
Form{
  margin-bottom: 30px;
}
.clo{
  display: block;
  width: 30px;
  float: right;
  /*margin-bottom: 10px;*/
}
</style>
