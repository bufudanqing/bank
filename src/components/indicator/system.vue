<template lang="html">
<div class="infoinput">
  <!-- <div class="tree">
    <div class="tree-title">
      指标体系<br />

    </div>
    <div class='sub-title'>使用说明：<br>
     1. 选中一个节点，点击添加按钮，<br>即可添加一个子节点<br>
     2. 选中一个节点，点击编辑按钮，<br>即可进行节点内容编辑<br>
     3. 选中一个节点，点击删除，<br>即删除节点<br>
    </div>
  </div> -->
  <div class="main">
    <div class="title">
      <div class="subtitle">
        <img :src="icon" alt="icon">
        <div>信息采集</div>
        <img :src="li" alt="line">
        <div>服务产出</div>
      </div>
    </div>
    <div class="main-content">
       <Spin size="large" fix v-if="spinShow"></Spin>
      <div class="filter">
        <el-input class="inner"
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
      </div>

      <el-tree v-if="isShowTree"
        ref="tree"
        :data="data4"
        :props="defaultProps"
        node-key="id"
        :filter-node-method="filterNode"
        :default-expanded-keys= "num"
        :default-expand-all="false"
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>

      <el-dialog title="添加指标节点" :visible.sync="dialogFormVisible" width="400px" :show-close=true @close="dialogClose">

            <el-input v-model="formName" auto-complete="off" :label-width="formLabelWidth" placeholder="请输入指标节点"></el-input>
            <!-- <el-input v-model="percent" auto-complete="off" :label-width="formLabelWidth" placeholder="请输入百分比"></el-input> -->
            <!-- <el-input v-model="weight" auto-complete="off" :label-width="formLabelWidth" placeholder="请输入权重"></el-input> -->
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="closeMessageBox" v-if="closeButtonOne">确 定</el-button>
              <el-button type="primary" @click="editMessageBox" v-if="closeButtonTwo">确 定</el-button>
            </div>
      </el-dialog>
    </div>
  </div>
</div>
</template>

<script>
import icon from '../../assets/user/icon.png'
import li from '../../assets/user/line.png'
import axios from 'axios'
let id = 1000;

 export default {
   props: {
     showClose: {
       type: Boolean
     }
   },
   data() {
     return {
       newName:'',
       input: '',
       spinShow:false,
       num:[1],
       dialogFormVisible: false,
       formName: '',
       percent:'',
       weight:'',
       formLabelWidth: '50px',
       data: '',
       node: '',
       closeButtonOne: false,
       closeButtonTwo: false,
       // filterTextNode: '',
       isShowTree: true,
       icon:icon,
       filterText: '',
       li:li,
       data4: [],
       defaultProps: {
         children: 'children',
         label: 'indexName'
       }
     }
   },
   watch: {
     filterText(val) {
       this.$refs.tree.filter(val);
     }
   },
   created (){
     // this.spinShow = true
   },
   mounted (){
      this.$nextTick(() => {
        let self = this
        axios.get('/bank/oprtion/findAllOprtionKing.do')
        .then(function(res){
          console.info(res)
            console.info(res.data )
             self.data4 = res.data
        })
        .catch(function(e){console.info (e)})
      })
   },
   methods: {
     open3() {
       this.$notify({
         title: '成功',
         message: '节点修改成功(3秒后自动关闭)',
         type: 'success',
         duration: 4000
       });
     },
     open6() {
       this.$notify.error({
         title: '错误',
         message: '节点修改失败，请重试(3秒后自动关闭)',
         duration: 4000
       });
     },
     dialogClose () {
       this.closeButtonOne = false
       this.closeButtonTwo = false
       this.formName = ''
       this.percent = ''
       this.weight = ''
     },
     filterNode(value, data) {
        if (!value) return true;
        return data.indexName.indexOf(value) !== -1;
      },
     append(data) {
       if (this.formName === '' && !this.formName) {
         return false
       }
       let data1 = this.data
       const newChild = { id: id++, indexName: this.formName, children: [] };
        if (!data1.children) {
          this.$set(data1, 'children', []);
        }
        data1.children.push(newChild);
        let self = this
        // 添加没有题目的指标（根据有无id判断是添加还是修改）
        // 以下为添加

        axios.get('/bank/oprtion/addOprtion1.do?pid='+data1.id+'&indexName='+this.formName
        )
        .then(function(res) {
          console.log(res)
           // self.getData2()
           self.open3()
        })
        .catch(function(error) {
           console.log(error);
        })
        this.formName = ''
        this.percent = ''
        this.weight = ''
     },
     remove (node, data) {
       const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
     },
     // 编辑
     bj (node, data) {
       // console.log(node)
       // console.log(data)
       this.closeButtonTwo = true
       this.closeButtonOne = false
       this.data = data
       this.node = node
       this.formName = node.data.indexName
       this.weight = node.data.weight
       this.percent = node.data.percentage
       this.dialogFormVisible = true
     },
     closeMessageBox () {
       this.dialogFormVisible = false
       this.closeButtonOne = false
       this.closeButtonTwo = false
       this.append()
       // this.getData2()
       // alert(11)

     },
     // 编辑的确定按钮
     editMessageBox () {
       if (this.formName === '' && !this.formName) {
           this.closeButtonOne = false
           this.dialogFormVisible = false
           this.closeButtonTwo = false
           return false
         }
         this.node.data.indexName = this.formName
         this.getData()
     },
     // 修改指标
     getData () {
      let self = this
         axios.get('/bank/oprtion/addOprtion1.do?id='+self.node.data.id+'&pid='+self.node.data.pid+'&indexName='+self.formName+'&weight='+self.weight
           )
           .then(function(res) {
             // console.log(res)
             self.open3()
             // self.getData2()
             self.formName = ''
             self.data = ''
             self.node = ''
             self.formName = ''
             self.percent = ''
             self.weight = ''
             self.closeButtonTwo = false
             self.dialogFormVisible = false
             self.closeButtonOne = false
         })
         .catch(function(e){
             self.open6()
             console.info (e)
         })

     },
     // 初始化时获取所有指标
     getData2 () {
      // 获取所有指标
      let self = this
       axios.get('/bank/oprtion/findAllOprtionKing.do')
             .then(function(res){
                  // self.spinShow = false
                  self.data4 = res.data
             })
             .catch(function(e){console.info (e)})
     },
     // 增加指标
     zj (data) {
       // console.log(data)
       this.closeButtonOne = true
       this.dialogFormVisible = true
       this.data = data
       let num1 = []
       num1.push(data.id)
       this.num = num1
       // this.num.push(data.pid)
     },
     remove(node, data) {
       const parent = node.parent;
       const children = parent.data.children || parent.data;
       const index = children.findIndex(d => d.id === data.id);
       children.splice(index, 1);
       console.log(node.data)
       if(node.data.children.lenth != 0){
         alert("当前节点下有子节点，请将子节点清空后重试")
         return false
       } else {
         this.deleteData(node.data.id)
       }
     },
     deleteData(id) {
      let self = this
      axios.get('/bank/oprtion/delOprtion.do?id='+id)
        .then(function(res){
          // console.info(res)
          self.open3()
          self.getData2()
        })
        .catch(function(e){
          self.open6()
          console.info (e)
        })
     },
     renderContent(h, { node, data, store }) {
       return (
         <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
           <span>
             <span>{node.label}</span>
           </span>
           <span>
             <el-button style="font-size: 12px;" type="text" on-click={ () => this.zj(data) }>添加</el-button>
             <el-button style="font-size: 12px;" type="text" on-click={ () => this.bj(node, data) }>修改</el-button>
             <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
           </span>
         </span>);
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
      background-color: #fff;
}
.tree{
  width: 250px;
  height: 100%;
  /*border:solid;*/
  float: left;
  background-color: #fff;
  padding-top:40px;
}
.tree-title{
  font-size:22px;
}
.main{
  /* position: absolute;
  left:250px;
  right:0; */
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
  text-align: left;
  margin-top: 20px;
  padding: 10px;
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
.el-button--mini, .el-button--mini.is-round {
  padding: 3px 5px !important;
}
.main-content{
  background: #fff;
  padding-top: 20px;
}
.el-tree{
  width: 80%;
  margin: 0 auto;
}
.filter{
  /* width: 100%; */
  height: 41px;
  margin-bottom: 15px;
  margin-left:120px;
}
.inner{
  width: 40%;
  float: left;
}
</style>
