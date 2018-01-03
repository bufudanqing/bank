<template lang="html">
<div class="infoinput">

  <div class="main">
    <div class="title">
      <div class="subtitle">
        <img :src="icon" alt="icon">
        <div>信息采集</div>
        <img :src="li" alt="line">
        <div>服务产出</div>
      </div>
    </div>
    <div class="main-content" v-show="true">
      <div class="tree">
        <!-- <div class="tree-title">
          指标体系<br />
          <span class='sub-title'>只有底层节点包含评分项</span>
        </div> -->
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <div class="blank">

        </div>
        <el-tree
          class="filter-tree"
          :data="data2"
          show-checkbox
          node-key="id"
          highlight-current
           @node-click="handleNodeClick"
           default-expanded-all
           :filter-node-method="filterNode"
          :props="defaultProps"
          ref = "tree2">
        </el-tree>
      </div>
      <div class="main-inner">
        <h1>对选定指标评分项进行操作</h1>
        <div class="edit-items">
          <table>
            <tr>
              题目：
            </tr>
            <tr>
              <td><span>评分项</span><el-input ref="subject"
              v-model="subject" clearable :disabled="disabled0" ></el-input></td>
              <td><span>百分比</span><el-input ref="percentage"
              v-model="percentage" clearable :disabled="disabled1"></el-input></td>
              <td><span>权重</span><el-input ref="weight"
              v-model="weight" clearable :disabled="disabled1"></el-input></td>
            </tr>
            <tr>
              选项：
            </tr>
            <tr>
              <td><span>A选项</span><el-input
              v-model="a" clearable :disabled="disabled"></el-input></td>
              <td><span>百分比</span><el-input
              v-model="percentageA" clearable :disabled="disabled"></el-input></td>
              <td><span>权重</span><el-input
              v-model="weightA" clearable :disabled="disabled"></el-input></td>
            </tr>
            <tr>
              <td><span>B选项</span><el-input
              v-model="b" clearable :disabled="disabled" required="required"></el-input></td>
              <td><span>百分比</span><el-input
              v-model="percentageB" clearable :disabled="disabled"></el-input></td>
              <td><span>权重</span><el-input
              v-model="weightB" clearable :disabled="disabled"></el-input></td>
            </tr>
            <tr>
              <td><span>C选项</span><el-input
              v-model="c" clearable :disabled="disabled"></el-input></td>
              <td><span>百分比</span><el-input
              v-model="percentageC" clearable :disabled="disabled"></el-input></td>
              <td><span>权重</span><el-input
              v-model="weightC" clearable :disabled="disabled"></el-input></td>
            </tr>
            <tr>
              <td><span>D选项</span><el-input
              v-model="d" clearable :disabled="disabled"></el-input></td>
              <td><span>百分比</span><el-input
              v-model="percentageD" clearable :disabled="disabled"></el-input></td>
              <td><span>权重</span><el-input
              v-model="weightD" clearable :disabled="disabled"></el-input></td>
            </tr>
          </table>
          <span class="ivu-btn" @click="editSubject()">确认修改</span>
          <!-- <el-button type="text" @click="open"></el-button> -->
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
        disabled0:true,
        disabled:true,
        disabled1:true,
        required:true,
        data2: [],
        filterText: '',
        selnodeId:'',
        selnodePid:'',
        selindexName:'',
        subject: '',
        percentage:'',
        weight:'',
        a:'',
        percentageA:'',
        weightA:'',
        b:'',
        percentageB:'',
        weightB:'',
        c:'',
        percentageC:'',
        weightC:'',
        d:'',
        percentageD:'',
        weightD:'',
        defaultProps: {
          children: 'children',
          label: 'indexName'

        }
      };
    },
    mounted (){
       this.$nextTick(() => {
         let self = this
         axios.get('/bank/oprtion/findAllOprtionKing.do')
         .then(function(res){
              self.data2 = res.data
         })
         .catch(function(e){console.info (e)})
       })
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods:{

      filterNode(value, data) {
      if (!value) return true;
      return data.indexName.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        console.info(data)
         if(data.children && (data.children.length > 0)){
           this.disabled0 = true
           this.disabled1 = false
           this.disabled = true
         } else {
           this.disabled0 = false
           this.disabled1 = false
           this.disabled = false
         }
        // console.log(data)
        //  console.log(data.subject)
         this.selnodeId = data.id
         this.selnodePid = data.pid
         this.selindexName = data.indexName
         this.subject = data.subject
         this.percentage = data.percentage
         this.weight = data.weight
         this.a = data.a
         this.percentageA = data.percentageA
         this.weightA = data.weightA
         this.b = data.b
         this.percentageB = data.percentageB
         this.weightB = data.weightB
         this.c = data.c
         this.percentageC = data.percentageC
         this.weightC= data.weightC
         this.d= data.d
         this.percentageD = data.percentageD
         this.weightD = data.weightD
       },
       editSubject(){
         let self = this
         axios.get('/bank/oprtion/addOprtion.do?id='+this.selnodeId+'&pid='+this.selnodePid+'&indexName='+this.selindexName+'&subject='+this.subject+'&percentage='+this.percentage+'&weight='+this.weight+'&A='+this.a+'&percentageA='+this.percentageA+'&weightA='+this.weightA+'&B='+this.b+'&percentageB='+this.percentageB+'&weightB='+this.weightB+'&C='+this.c+'&percentageC='+this.percentageC+'&weightC='+this.weightC+'&D='+this.d+'&percentageD='+this.percentageD+'&weightD='+this.weightD,
         //  {
         //   id : this.selnodeId,
         //   pid : this.selnodePid,
         //   indexName : this.selindexName,
         //   subject:this.subject,
         //   percentage:this.percentage,
         //   weight:this.weight,
         //   A:this.a,
         //   percentageA:this.percentageA,
         //   weightA:this.weightA,
         //   B:this.b,
         //   percentageB:this.percentageB,
         //   weightB:this.weightB,
         //   C:this.c,
         //   percentageC:this.percentageC,
         //   weightC:this.weightC,
         //   D:this.d,
         //   percentageD:this.percentageD,
         //   weightD:this.weightD
         // }
       )
         .then(function(res){
           // console.log(res.data[0].result)
           alert("节点修改成功")
           self.disabled = true
           self.disabled1 = true
           if (res.data[0].result == true) {
             axios.get('/bank/oprtion/findAllOprtionKing.do')
             .then(function(res){

                  self.data2 = res.data
             })
             .catch(function(e){console.info (e)})
           } else {
             alert("数据修改异常，请重试！")
           }
         })
         .catch(function(err){
           console.log(err)
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
  width: 300px;
  /* height: 100%; */
  /*border:solid;*/
  min-height: 400px;
  float: left;
  background-color: #fff;
  padding-top:40px;
}
.tree h1{
  margin-top:15px;
}
.tree-title{
  font-size:22px;
}
.main{
  /* position: absolute; */
  /* left:250px;
  right:0; */
}
.main-inner{
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
  width: 90%;
}
.blank{
  width: 100%;
  height: 20px;
}
</style>
