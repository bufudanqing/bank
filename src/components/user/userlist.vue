<template lang="html">
 <div class="userlist">
    <div class="title">
      <div class="subtitle">
        <img :src="icon" alt="icon">
        <span>用户列表</span>
      </div>
      <Input v-model="value4" icon="android-search" placeholder="" style="width: 200px;float:right"></Input>
      <span>用户名称:</span>
    </div>

    <div class="data-part">
      <!-- <Table border ref="selection" :columns="columns4" :data="data1"></Table> -->
      <Table border ref="selection" :columns="columns7" :data="data6" @on-row-click="handleRowClick"></Table>
        <Button @click="handleSelectAll(true)">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
        <!-- <Button @click="addData()">添加</Button> -->
        <Button @click="addDialog()">添加</Button>

        <Button >修改</Button>
        <Button >删除</Button>
         <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <el-dialog
    title="添加用户"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="ruleForm.realname"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="ruleForm.note"></el-input>
        </el-form-item>
     </el-form>
        <el-button class="role-btn" @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd()">确 定</el-button>

   </el-dialog>
    <!-- <addUser class="add" v-if="showAdd" v-on:close = "closeAdd()"></addUser> -->
    <div class="window">
        <!-- <Button @click="modal8 = true">设置角色</Button> -->
        <Modal
            title="角色设置"
            v-model="modal8"
            :modal="true"
            @on-ok="ok"
        @on-cancel="cancel"
            :close-on-click-modal="true"
            :mask-closable="false">
            <span>用户ID:</span><span>{{ uInfo.id }}</span><br>
            <span>用户名:</span><span>{{ uInfo.userName }}</span><br>
            <span>用户邮箱:</span><span>{{ uInfo.userEmail }}</span><br>
            <span>真实姓名:</span><span>{{ uInfo.trueName }}</span><br>
            <span>已有角色:</span><span>{{ uInfo.roleName }}</span><br>
            <span>设置角色:</span>
            <RadioGroup v-model="animal">
                <Radio label="管理员"></Radio>
                <Radio label="专家"></Radio>
                <Radio label="普通用户"></Radio>
            </RadioGroup>
        </Modal>
    </div>
 </div>

</template>

<script>
import icon from '../../assets/user/icon.png'
import li from '../../assets/user/line.png'

import axios from 'axios'
import addUser from './children/addUser'
export default {
      components: {
        addUser:addUser
      },
       data () {
           return {
             icon:icon,
             line: li,
             uInfo: {

             },
             animal: '普通用户',
             modal7: false,
             modal8: false,
             showAdd: false,
             spinShow: false,
             centerDialogVisible: false,
             ruleForm: {
               name: '',
               email: '',
               realname: '',
               password: ''
             },
             rules: {
                name: [
                  { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                  { required: true, message: '请输入用户密码', trigger: 'blur' },
                ],
                email: [
                  { required: true, message: '请输入用户邮箱', trigger: 'blur' },
                ],
                realname: [
                  { required: true, message: '请输入用户真实姓名', trigger: 'blur' },
                ]
             },
             value4: '',
               columns7: [

                   {
                     type: 'selection',
                     width: 60,
                     align: 'center'
                   },
                   {
                     title: '用户名',
                     key: 'userName'
                   },
                   {
                     title: '用户邮箱',
                     key: 'userEmail'
                   },
                   {
                     title: '真实姓名',
                     key: 'trueName'
                   },
                   {
                     title: '角色编号',
                     key: 'roleId'
                   },
                   {
                     title: '用户角色',
                     key: 'roleName'
                   },
                   {
                       title: '操作',
                       key: 'action',
                       width: 200,
                       align: 'center',
                       render: (h, params) => {
                           return h('div', [
                               h('Button', {
                                   props: {
                                       type: 'primary',
                                       size: 'small'
                                   },
                                   style: {
                                       marginRight: '5px'
                                   },
                                   on: {
                                       click: () => {
                                           this.show(params.index)
                                       }
                                   }
                               }, '查看'),
                               h('Button', {
                                   props: {
                                       type: 'primary',
                                       size: 'small'
                                   },
                                   style: {
                                       marginRight: '5px'
                                   },
                                   on: {
                                       click: () => {
                                           // this.show(params.index)
                                           this.modal8 = true
                                       }
                                   }
                               }, '设置角色'),
                           ]);
                       }
                   }
               ],
               data6: [
                   {

                   }
               ]
           }
       },
         created () {
           this.spinShow = true
           let self = this
           this.$http.post('/bank/user/userList.do').then(function(res) {
             self.spinShow = false
             for(var i=0;i<res.data[0].pageDate.length;i++){
                self.data6 = res.data[0].pageDate
             }
           }).catch(function (err) {
             console.info(err)
           })
         },

       methods: {
           iniData () {
             let self = this
             this.$http.post('/bank/user/userList.do').then(function(res) {
               self.spinShow = false
               for(var i=0;i<res.data[0].pageDate.length;i++){
                  self.data6 = res.data[0].pageDate
               }
             }).catch(function (err) {
               console.info(err)
             })
           },
           handleRowClick(info, index){
             this.uInfo = info
             console.info(this.uInfo)
           },
           editRole( userId, roleId, roleName) {
             let self = this
             axios.get('/bank/user/userRoleUpdate.do?userId='+userId+'&roleId='+roleId+'&roleName='+roleName)
             .then(function() {
               console.log(123)
               self.iniData()
             })
             .catch(function(err){
               console.log(err)
             })
           },
           ok () {
             // this.$Message.info('Clicked ok');
             console.info(this.animal)
             let roleid
             let userid = this.uInfo.id
             let rolename = this.animal
             if(this.animal == "普通用户") {
               roleid = 2
             } else if (this.animal =="专家") {
               roleid = 3
             } else if (this.animal =="管理员") {
               roleid = 1
             }

             this.editRole( userid , roleid, rolename)
           },
           cancel () {
             // this.$Message.info('Clicked cancel');
           },
           show (index) {
               this.$Modal.info({
                   title: '用户信息',
                   content: `用户名：${this.data6[index].userName}<br>用户邮箱：${this.data6[index].userEmail}<br>真实姓名：${this.data6[index].trueName}<br>角色编码：${this.data6[index].roleId}<br>用户角色：${this.data6[index].roleName}`
               })
           },

           handleSelectAll (status) {
               this.$refs.selection.selectAll(status);
           },
           addData () {
             this.showAdd = true
           },
           closeAdd () {
             this.showAdd = false
           },
           addDialog () {
            this.centerDialogVisible = true
           },
           confirmAdd: function () {
             // alert(this.userName+this.password+this.trueName)
             let self = this
             axios({
               method: 'get',
               url: '/bank/user/addUser.do?userName='+self.ruleForm.name+'&password='+self.ruleForm.password+'&userEmail='+self.ruleForm.email+'&trueName='+self.ruleForm.realname

             })
             .then(function(response) {
                  if (response.data[0].result == false){
                    alert('新建用户失败');

                  } else {
                    alert('新建用户成功');
                    // close();
                    // this.$emit('close');
                    self.centerDialogVisible = false
                    self.iniData()
                  }
             })
             .catch(function(error) {
                  console.log(error);
             })
           }
       }
   }
</script>

<style lang="css" scoped>
body{
}
.userlist{
  position: absolute;
  top:110px;
  left:240px;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding-right: 3px;
}
.title{
  width: 100%;
      height: 60px;
  padding-right: 80px;
  padding-left: 50px;
  padding-top: 20px;
  background-color: #dbd9d9;
}
.title img{
  display:inline-block;
  width: 30px;
  height:30px;
  margin-right: 10px;
}
.title span{
  float:right;
  font-size:22px;
  color:#7d7d7e;
  display: inline-block;
  margin-right: 20px;
  line-height: 30px;
}
.subtitle{
  float:left;
}
.subtitle span{
  display: inline-block;
  margin-left: 10px;
  font-size:22px;
  color:#2060c1;
}
.second-title{
  width: 100%;
  height:80px;
  padding-right: 80px;
  padding-left: 50px;
  padding-top: 25px;
  background-color: #f2f1f1;
}
.second-title>.second-title-wrapper{
  display: inline-block;
  float: left;
  font-size:22px;
  color:#515152;
  margin-right: 10px;
  background-color: #f2f1f1 !important;
}
.second-title>.second-title-wrapper div,img{
  float: left;
  margin-right: 5px;
}
.data-part Button{
  margin-right:18px;
  background-color:#7fb0ff;
  color:#fff;
  font-size:16px;
  margin-top: 30px;
  height: 30px;
  line-height: 18px;
}
.add{
  width: 500px;
  height: 450px;
  padding: 30px;
  margin:0 auto;
  position: absolute;
  z-index: 5;
  top:30px;
  left:30%;
  background-color: #fff;
  border-radius: 3px;
  border:solid lightgrey;
}
.role-btn{
  margin-left: 30%;
}
.ivu-modal-body{
  padding-left: 50px;

}
.ivu-modal-body span{
  display: inline-block;
  /* margin: 2px 10px; */
}
</style>
