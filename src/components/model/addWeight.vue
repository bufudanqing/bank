<template lang="html">
<div class="infoinput">

  <div class="main">
    <div class="title">
      <div class="subtitle">
        <img :src="icon" alt="icon">
        <div>生成模型</div>
        <img :src="li" alt="line">
        <div>设置权重</div>
      </div>
    </div>
    <div class="main-content" v-show="true">
      <div class="main-left">
        <div class="findnode">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
        </div>
        <div class="tree">
          <el-tree
            class="filter-tree"
            :data="data2"
            node-key="id"
            highlight-current
            @node-click="handleNodeClick"
            default-expand-all
            :expand-on-click-node=false
            :filter-node-method="filterNode"
            :props="defaultProps"
            ref = "tree2">
          </el-tree>
        </div>
      </div>
      <div class="main-inner">
        <h1>给当前节点设置权重</h1>
        <div class="edit-items">
          <div class="select-item">
            <span class="ivu-form-item-label">当前节点:</span><span class="nodename">{{subject}}</span>
          </div>
          <div class="select-item">
            <span class="ivu-form-item-label">权重</span><el-input ref="weight"
            v-model="weight" clearable :disabled="disabled"></el-input>
          </div>
          <span class="ivu-btn" @click="editNode()">确认修改</span>
          <span class="ivu-btn" @click="checkModel()">检验模型</span>
          <span class="ivu-btn" @click="goList()">返回列表</span>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import icon from '../../assets/user/icon.png'
import li from '../../assets/user/line.png'
import axios from 'axios'
export default {
    data() {
      return {
        icon:icon,
        li:li,
        disabled:false,
        required:true,
        data2:[],
        filterText: '',
        expand: true,
        selectedNode:'',
        nodeId:'',
        parentId:'',
        subject: '',
        weight:'',
        result:'',
        defaultProps: {
          children: 'children',
          label: 'indexName'
        }
      };
    },
    mounted (){
       this.$nextTick(() => {
         this.getModel(this.$route.query.id)
       })
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods:{
      open3() {
        this.$notify({
          title: '成功',
          message: '节点权重修改成功(3秒后自动关闭)',
          type: 'success',
          duration: 4000
        });
      },
      open6() {
        this.$notify.error({
          title: '错误',
          message: '节点权重修改失败，请重试(3秒后自动关闭)',
          duration: 4000
        });
      },
      goList() {
        let r = confirm("是否返回列表页？")
        if( r == true){
          this.$router.push('/components/modelList')
        } else{
          return false
        }
      },
      getCheckedNodes() {
        this.selectedNode = this.$refs.tree.getCheckedNodes()
        console.info(this.selectedNode)
      },
      getCurrentNode() {
       // console.log(this.$refs.tree.getCurrentNode());
       this.selectedNode = this.$refs.tree.getCurrentNode()
      },
      getModel(id){
        let self = this
        axios.get('/bank/model/findModelAllById.do?id='+id)
        .then(function(res){
           // console.log(res)
           // console.log(res.data)
           // console.log(res.data instanceof Array)
           self.data2 = res.data
        })
        .catch(function(e){console.info (e)})
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.indexName.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        // console.info(data)
        this.subject = data.indexName
        this.weight  = data.weight
        this.nodeId  = data.id
        this.parentId= data.pid
       },
       editNode(){
         let self = this
         axios.get('/bank/model/modelAddWeight.do?id='+this.nodeId+'&weight='+this.weight)
         .then(function(res){
           console.log(res.data[0].status)
           if (res.data[0].status == 1) {
             self.open3()
             console.log(self.$route.query.id)
             self.getModel(self.$route.query.id)
           } else {
             alert("数据修改异常，请重试！")
           }
         })
         .catch(function(err){
           self.open4()
           console.log(err)
         })
       },
       checkModel() {
         console.info(this.$route.query.id)
         axios.get('/bank/model/detectionModelCan.do?id='+this.$route.query.id)
         .then(function(res){
           console.log(res.data[0].result)
           alert(res.data[0].result)
           // if()
         })
         .catch(function(err){
           console.log(err)
           alert("检验出错，请重试！")
         })
       }
    }
  };
</script>


<style lang="css" scoped>
.infoinput{
  position: absolute;
  top:110px;
  left:240px;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding-right: 3px;
}
.tree{
  width: 100%;
  margin-left:50px;
  /* min-height: 400px; */
  float: left;
  background-color: #fff;
  padding-top:20px;
  padding-left: 10px;
  padding-right: 10px;
  overflow: scroll;
}
.tree h1{
  margin-top:15px;
}
.tree-title{
  font-size:22px;
}
.main{
}
.main-inner{
  width: 45%;
  float: right;
  padding-top: 40px;
  padding-right: 50px;
}
.title{
  width: 100%;
  height:60px;
  padding-right: 80px;
  padding-left: 50px;
  padding-top: 20px;
  background-color: #dbd9d9;
}
.sub-title{
  font-size:12px;
}
.subtitle{
  float:left;
}
.subtitle div,img{
  float: left;
  margin-left: 10px;
  font-size:22px;
  color:#2060c1;
}
.ivu-btn{
  margin-right: 18px;
  background-color: #7fb0ff;
  color: #fff;
  font-size: 16px;
  margin-top: 30px;
  height: 30px;
  line-height: 18px;
}
.main-content{
  /* margin-top: 20px; */
}
.edit-items{
  margin-top: 10px;
}
.edit-items table{
  margin: 0 auto;
}
.el-input{
  width: 50%;
}
.blank{
  width: 100%;
  height: 20px;
}
.ivu-form-item-label{
  display: inline-block;
  text-align: right;
  margin-right: 15px;
  width: 110px !important;
  font-size: 18px !important;
}
.findnode{
  text-align: left;
  padding-left: 50px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.main-left{
  width: 50%;
  float: left;
}
.nodename{
  display: inline-block;
  font-size:18px;
}
.select-item{
  width: 96%;
  text-align: left;
  margin-left: 10%;
  margin-top:20px;
}
</style>
