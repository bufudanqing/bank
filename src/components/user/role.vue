<template lang="html">
 <div class="userlist">
    <div class="title">
      <div class="subtitle">
        <img :src="icon" alt="icon">
        <span>角色管理</span>
      </div>
      <Input v-model="value4" icon="android-search" placeholder="" style="width: 200px;float:right"></Input>
      <span>角色名称:</span>
    </div>

    <div class="data-part">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        <Button @click="handleSelectAll(true)">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
        <Button @click="addDialog()">添加</Button>
        <Button >修改</Button>
        <Button >删除</Button>
    </div>
    <el-dialog
    title="添加角色"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input v-model="ruleForm.note"></el-input>
      </el-form-item>
    </el-form>

      <!-- <el-form-item>
         <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
         <el-button @click="resetForm('ruleForm')">重置</el-button>
       </el-form-item> -->
      <el-button class="role-btn" @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>

  </el-dialog>
 </div>

</template>

<script>
import icon from '../../assets/user/icon.png'
import li from '../../assets/user/line.png'
export default {
  data () {
    return {
      icon:icon,
      line: li,
      value4: '',
      spinShow: false,
      centerDialogVisible: false,
      ruleForm: {
        name: '',
        code: ''
      },
      rules: {
         name: [
           { required: true, message: '请输入角色名称', trigger: 'blur' }
         ],
         code: [
           { required: true, message: '请输入角色编码', trigger: 'blur' },
         ]
      },
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '角色ID',
          key: 'roleId'
        },
        {
          title: '角色编码',
          key: 'roleNumber'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '备注',
          key: 'note'
        }
      ],
      data1: [

      ]
    }
  },
  created () {
    this.spinShow = true
    let self = this
    this.$http.post('/bank/role/roleList.do').then(function(res) {
      self.spinShow = false
      for(var i=0;i<res.data[0].pageDate.length;i++){
         self.data1 = res.data[0].pageDate
      }

    }).catch(function (err) {
      console.info(err)
    })
  },
  methods: {
    addDialog () {
     this.centerDialogVisible = true
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
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
.role-btn{
  margin-left: 30%;
}
</style>
