<template lang="html">
 <div class="userlist">
    <div class="title">
      <div class="subtitle">
        <img :src="icon" alt="icon">
        <span>模型列表</span>
      </div>
      <Input v-model="value4" icon="android-search" placeholder="" style="width: 200px;float:right"></Input>
      <span>模型名称:</span>
    </div>

    <div class="data-part">
      <!-- <Table border ref="selection" :columns="columns4" :data="data1"></Table> -->
      <Table border ref="selection" :columns="columns7" :data="data6" @on-row-click="handleRowClick"></Table>
        <Button @click="addModel()">添加模型</Button>

        <Button @click="handleSelectAll(true)">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
        <!-- <Button @click="addData()">添加</Button> -->
         <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <!-- 查看模型窗口 -->
      <el-dialog
        title="查看模型"
        :visible.sync="dialogVisible"
        width="30%"
        :mask-closable="true">
        <div class="read-tree">
          <el-tree
            class="filter-tree"
            :data="data2"
            node-key="id"
            highlight-current
            default-expand-all
            :props="defaultProps"
            ref = "tree2">
          </el-tree>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

 </div>

</template>

<script>
import icon from '../../assets/user/icon.png'
import li from '../../assets/user/line.png'

import axios from 'axios'
export default {
       data () {
           return {
             icon:icon,
             line: li,
             uInfo: {
             },
             data2:[],
             defaultProps: {
               children: 'children',
               label: 'indexName'
             },
             animal: '普通用户',
             modal7: false,
             modal8: false,
             modal9: false,
             modelData:'',
             clickModel:'',
             clickNode:'',
             showAdd: false,
             spinShow: false,
             dialogVisible: false,
             centerDialogVisible: false,
             password1:'',
             ruleForm: {
               name: '',
               email: '',
               realname: '',
               password: ''
             },
             ruleForm1: {
               password1: ''
             },
             value4: '',
               columns7: [
                   {
                     type: 'selection',
                     width: 60,
                     align: 'center'
                   },
                   {
                     title: '模型名',
                     key: 'indexName'
                   },
                   {
                     title: '模型ID',
                     key: 'id'
                   },
                   {
                     title: '是否可用',
                     key: 'status'
                   },
                   {
                       title: '操作',
                       key: 'action',
                       width: 260,
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
                                       click: (ev) => {
                                         this.data2 = []
                                         var oEvent = ev || event;
                                         oEvent.stopPropagation();
                                         console.info(params.row.id)
                                         this.getModel(params.row.id)
                                         this.dialogVisible = true
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
                                       click: (ev) => {
                                         var oEvent = ev || event;
                                         oEvent.stopPropagation();
                                         console.info(params.row.id)
                                           this.$router.push({path:'/components/addWeight', query:{id: params.row.id}})
                                       }
                                   }
                               }, '修改权重'),
                               h('Button', {
                                   props: {
                                       type: 'primary',
                                       size: 'small'
                                   },
                                   style: {
                                       marginRight: '5px'
                                   },
                                   on: {
                                       click: (ev) => {
                                         var oEvent = ev || event;
                                         oEvent.stopPropagation();
                                         // console.info(params.row.id)
                                         this.deleteModel(params.row.id)
                                       }
                                   }
                               }, '删除'),
                           ]);
                       }
                   }
               ],
               data6: [
               ]
           }
       },
       created () {
         this.spinShow = true
         this.getModelList()
       },
       methods: {
         getModel(id){
           let self = this
           axios.get('/bank/model/findModelAllById.do?id='+id)
           .then(function(res){
             // console.info(res.data)
              // console.log(res.data instanceof Array)
              self.data2 = res.data
           })
           .catch(function(e){console.info (e)})
         },
         addModel(){
           this.$router.push("/components/model")
         },
         getModelList () {
           let self = this
           this.$http.post('/bank/model/findModelAll.do').then(function(res) {
             self.spinShow = false
             // console.info(res.data)
             for(let i = 0; i<res.data.length;i++){
               if(res.data[i].status == 0) {
                 res.data[i].status ='不可用，待修改'
               } else {
                 res.data[i].status ='模型可用'
               }
             }
             self.data6 = res.data
             self.modelData = res.data
           }).catch(function (err) {
             console.info(err)
           })
         },
         handleRowClick(info, index){
           // console.info(info)
         },
         handleSelectAll (status) {
             this.$refs.selection.selectAll(status);
         },
         handleClose() {
         },
         deleteModel(id) {
           let self = this
           axios.get('/bank/model/deleteModel.do?id='+id)
           .then(function(res){
             alert("删除成功！")
             self.getModelList()
           })
           .catch(function(e){
             console.log(err)
             alert("删除失败，请重试！")
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
