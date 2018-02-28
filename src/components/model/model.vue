<template lang="html">
   <div class="infoinput">

       <div class="title">
         <div class="subtitle">
           <img :src="icon" alt="icon">
           <span>生成模型</span>
         </div>

       </div>
       <div class="tips">
         <el-alert
           title="操作方法：请勾选需要使用的底层指标节点（勾选非底层指标节点将导致生成的模型无效），勾选完毕后点击确认按钮即可生成新的指标体系，
           对每一项指标分配权重后点击提交按钮即可生成模型。"
           type="info"
           v-show="tip"
           center
           show-icon>
         </el-alert>

       </div>
       <div class="data-wrapper">
         <div class="filter">
           <el-input class="inner"
             placeholder="输入关键字进行过滤"
             v-model="filterText">
           </el-input>
           <el-button @click="showTip">操作方法</el-button>

           <el-button @click="preSystem">预览指标</el-button>
           <el-button @click="previewSystem">生成模型</el-button>
         </div>
         <div class="main-content">
           <Spin size="large" fix v-if="spinShow"></Spin>
           <el-tree
             ref="tree"
             :data="data4"
             :props="defaultProps"
             show-checkbox
             node-key="id"
             :filter-node-method="filterNode"
             :default-expanded-keys= "num"
             :default-expand-all="false"
             :expand-on-click-node="false"
             :render-content="renderContent">
           </el-tree>
         </div>

         <div class="new-container">
           <div class="placetext" v-show="placetext">
             预览指标
           </div>
           <h2>{{modelName}}</h2>
           <div class="new-wrapper" ref="refContent">
              <div class="new-item"  v-for="(item, index) in leafCheckedNodes">
              {{index+1}}. {{item.indexName}}
              </div>
           </div>
         </div>
       </div>

       <Modal
        title="输入模型名"
        v-model="modal5"
        @on-ok="okName"
        :mask-closable="false">
        <p class="name-wrapper">
        <el-input v-model="modelName" placeholder="请输入模型名"></el-input>
        </p>
       </Modal>
   </div>

</template>

<script>
import icon from '../../assets/user/icon.png'
import model from '../../assets/model/model.png'
import model1 from '../../assets/model/model1.png'
import axios from 'axios'
export default {
  props: {
    disabled: {
      type: Boolean
    }
  },
  data (){
    return {
      placetext:true,
      modal5:false,
      tip:false,
      radio7: '1',
      modal1: false,
      model:model,
      model1:model1,
      icon:icon,
      data4: [],
      num:[1],
      loading2: false,
      filterText: '',
      spinShow:false,
      defaultProps: {
        children: 'children',
        label: 'indexName'
      },
      modelChoose:true,
      chooseStatus: {
        disabled1:false,
        disabled2:false,
        disabled3:false,
      },
      modelStatus:'',
      checkedKeys:'',
      modelName:'',
      checkedNodes:'',
      leafCheckedNodes:[]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.modelStatus = this.radio7
    this.$nextTick(() => {
      this.getTree()
    })
  },
  destroy () {

  },
  methods: {
    // 清除已有题目
    clear() {
      this.$refs.refContent.innerHTML = ''
    },
    // 检查模型名是否重复
    checkName(name) {
      let self = this
      axios.get('/bank/model/documentNameModel.do?indexName='+name)
      .then(function(res){
        console.log(res.data[0].result)
        if(res.data[0].status == 0){
          alert(res.data[0].result)
          self.modal5 = true
        } else{
          self.submitCheckedKeys(self.modelName, self.checkedKeys)
        }
      })
      .catch(function(err){
        console.log(err)
      })
    },
    openName() {
        this.$alert('请输入模型名称', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.modal5 = true
          }
        });
      },
    okName() {
      console.info(this.modelName)
      if(!this.modelName || this.modelName == ''){
        this.openName()
      } else {
        this.checkName(this.modelName)
      }
    },
    open() {
      this.$alert('请输入体系名称', '提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
    },
    showTip() {
      this.tip = true
      setTimeout(() => {
        this.hideTip()
      },15000)
    },
    hideTip() {
      this.tip = false
    },
    getCheckedNodes() {
      this.checkedNodes = this.$refs.tree.getCheckedNodes()
    },
    getCheckedKeys() {
      this.checkedKeys = this.$refs.tree.getCheckedKeys()
      let keys = this.checkedKeys
      keys.sort(function(a, b){return a-b})
      this.checkedKeys = keys
    },
    previewSystem(){
      this.getCheckedKeys()
      if(!this.checkedKeys || this.checkedKeys == ''){
        alert("尚未选择指标")
        return false
      }else{
        this.modal5 = true
      }
    },
    preSystem(){
      this.leafCheckedNodes = []
      // this.clear()
      this.getCheckedNodes()
      this.placetext = false
      for(let i=0;i< this.checkedNodes.length; i++){
        if(!this.checkedNodes[i].children || this.checkedNodes[i].children ==''){
          this.leafCheckedNodes.push(this.checkedNodes[i])
        }
      }
      console.log(this.leafCheckedNodes)
    },
    submitCheckedKeys(name, keys){
      // console.log(name)
      // console.log(keys)
      let self = this
      axios.post('/bank/model/addmodel.do',{
        model    : keys,
        indexName: name
      })
      .then(function(res){
        // console.log(res)
        self.$router.push('/components/modelList')
      })
      .catch(function(err){
        console.log(err)
        alert("提交失败，请重新操作")
      })
    },
    toLoading2 () {
      this.loading2 = true;
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>

        </span>);
    },
    filterNode(value, data) {
       if (!value) return true;
       return data.indexName.indexOf(value) !== -1;
     },
    getTree(){
      let self = this
      axios.get('/bank/oprtion/findAllOprtionKing.do')
      .then(function(res){
        self.data4 = res.data
      })
      .catch(function(e){console.info (e)})
    },
    handleOption(status){
      this.modelStatus = status
      console.log(this.modelStatus)
      if(this.modelStatus == 1) {
        this.modelChoose = true
      } else if(this.modelStatus == 2){
        this.modelChoose = false
      }
    },
    // 对话框1 的确定取消事件
    ok () {
      this.modal1 = false
      if (this.modelStatus ==1 ) {
         this.chooseStatus.disabled1 = true
         this.chooseStatus.disabled2 = true
         this.chooseStatus.disabled3 = true
         sessionStorage.setItem('chooseStatus', self.chooseStatus)
      } else if(this.modelStatus == 2) {
          this.chooseStatus.disabled1 = true
          this.chooseStatus.disabled2 = true
          this.chooseStatus.disabled3 = true
          sessionStorage.setItem('chooseStatus', self.chooseStatus)
      }

    },
    cancel () {
    },
    submitOption() {
      if( !this.modelStatus && this.modelStatus === '' ) {
         this.warning()
         return false
      }
      this.modal1 = true
    }
  }
}
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
     background-color: #fff;
   }
   .infoinput>img{
     margin-top: 15px;
     width: 570px;
   }
   .btn-wrapper{
     margin-top:20px;
     text-align: center;
   }
   .ivu-btn-primary{
     /* display: block; */
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
     float: left;
   }
   .model-wrapper{
     float: left;
      padding: 20px;
      margin-top: 30px;
   }
   .model-wrapper h2{
     display: block;
    margin-bottom: 20px;
   }
   .data-wrapper{
     height: 75%;
   }
   .main-content{
     width:50%;
     float: left;
     height:100%;
     overflow: scroll;
   }
   .tips{
     /* font-size: 14px;
     height: 50px;
     padding-top:20px; */
   }
   .new-container{
     width:48%;
     float: right;
     border:solid 1px grey;
     height: 100%;
     padding: 30px;
     overflow: scroll;
   }
   .new-wrapper{
     margin-top:20px;
   }
   .new-item{
     text-align: left;
     height: 30px;
   }
   .filter{
     width: 100%;
    padding-left: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
   }
   .inner{
     position: relative;
    font-size: 14px;
    display: inline-block;
    width: 50%;
    float: left;
   }
   .name-wrapper{
     display: block;
    height: 50px;
   }
   .placetext{
     font-size: 36px;
      margin-top: 50px;
      color: lightgray;
      letter-spacing: 5px;
   }
</style>
