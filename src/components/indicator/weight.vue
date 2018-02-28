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
        <div class="filter-wrapper">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
        </div>
        <div class="blank">

        </div>
        <el-tree
          class="filter-tree"
          :data="data2"
          node-key="id"
          highlight-current
          @node-click="handleNodeClick"
          :default-expanded-keys= "num"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          :props="defaultProps"
          ref = "tree2">
        </el-tree>
      </div>
      <div class="main-inner">
        <h2>对选定指标评分项进行操作</h2>
        <h4>(评分项禁止输入"()""<>"等非字符)</h4>
        <div class="edit-items">
          <div>
            <!-- <tr>
              题目：
            </tr> -->
            <div>
              <!-- <td> -->
                <div style="">评分项</div><textarea class="ivu-text" ref="subject"
              v-model="subject" clearable :disabled="disabled0" placeholder=""></textarea>
            <!-- </td> -->
              <!-- <td><span>百分比</span><el-input ref="percentage"
              v-model="percentage" clearable :disabled="disabled1"></el-input></td> -->
              <!-- <td><span>分值</span><el-input ref="weight"
              v-model="weight" clearable :disabled="disabled1"></el-input></td> -->
            </div>
            <!-- <tr>
              选项：
            </tr> -->
            <div>
              <div class="opt"><span class="options">A选项</span><el-input
              v-model="a" clearable :disabled="disabled"></el-input></div>
              <!-- <div><span>百分比</span><el-input
              v-model="percentageA" clearable :disabled="disabled"></el-input></div> -->
              <div class="opt"><span class="options">分值</span><el-input
              v-model="weightA" clearable :disabled="disabled"></el-input></div>
            </div>
            <div>
              <div class="opt"><span class="options">B选项</span><el-input
              v-model="b" clearable :disabled="disabled" required="required"></el-input></div>
              <!-- <div><span>百分比</span><el-input
              v-model="percentageB" clearable :disabled="disabled"></el-input></div> -->
              <div class="opt"><span class="options">分值</span><el-input
              v-model="weightB" clearable :disabled="disabled"></el-input></div>
            </div>
            <div>
              <div class="opt"><span class="options">C选项</span><el-input
              v-model="c" clearable :disabled="disabled"></el-input></div>
              <!-- <div><span>百分比</span><el-input
              v-model="percentageC" clearable :disabled="disabled"></el-input></div> -->
              <div class="opt"><span class="options">分值</span><el-input
              v-model="weightC" clearable :disabled="disabled"></el-input></div>
            </div>
            <div>
              <div class="opt"><span class="options">D选项</span><el-input
              v-model="d" clearable :disabled="disabled"></el-input></div>
              <!-- <div><span>百分比</span><el-input
              v-model="percentageD" clearable :disabled="disabled"></el-input></div> -->
              <div class="opt"><span class="options">分值</span><el-input
              v-model="weightD" clearable :disabled="disabled"></el-input></div>
            </div>
            <div>
              <div class="opt"><span class="options">E选项</span><el-input
              v-model="e" clearable :disabled="disabled"></el-input></div>
              <!-- <div><span>百分比</span><el-input
              v-model="percentageE" clearable :disabled="disabled"></el-input></div> -->
              <div class="opt"><span class="options">分值</span><el-input
              v-model="weightE" clearable :disabled="disabled"></el-input></div>
            </div>
          </div>
          <span class="ivu-btn" @click="editSubject()">确认修改</span>
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
        num:[1],
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
        e:'',
        percentageE:'',
        weightE:'',
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
      filterNode(value, data) {
      if (!value) return true;
      return data.indexName.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        console.info(data)

        let numarr = []
        numarr.push(data.id)
        this.num = numarr
        console.info(this.num)
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
         this.e= data.e
         this.percentageE = data.percentageE
         this.weightE = data.weightE
       },
       editSubject(){
         let self = this
         axios.get('/bank/oprtion/addOprtion.do?id='
         +this.selnodeId+'&pid='+this.selnodePid+'&indexName='
         +this.selindexName+'&subject='+this.subject+'&A='+this.a+'&weightA='+this.weightA+'&B='+this.b+'&weightB='+this.weightB+'&C='+this.c+'&weightC='+this.weightC+'&D='+this.d+'&weightD='+this.weightD+'&E='+this.e+'&weightE='+this.weightE
         )
         .then(function(res){
           // console.log(res.data[0].result)
           self.open3()
           self.disabled = true
           self.disabled1 = true
           self.disabled0 = true
           if (res.data[0].result == true) {
             axios.get('/bank/oprtion/findAllOprtionKing.do')
             .then(function(res){
                self.data2 = res.data
             })
             .catch(function(e){console.info (e)})
           } else {
             self.open6()
             // alert("数据修改异常，请重试！")
           }
         })
         .catch(function(err){
           self.open6()
           console.log(err)
         })
       }

    }
  };
</script>


<style lang="css" scoped>
.opt{
  display: inline-block;
  width: 45%;
  margin-bottom: 1%;
}
.options{
  display: inline-block;
  width: 70px;
}
.ivu-text{
  display: inline-block;
    height:60px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    left:10px;
    cursor: text;
    width: 78% !important;
    margin: 0 auto;
    /* margin-bottom: 25px; */
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
}
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
  width: 50%;
  height: 100%;
  float: left;
  background-color: #fff;
  padding-top:40px;
  overflow: scroll;
}
.el-tree{
  margin-left: 15px;
}
.tree h1{
  margin-top:15px;
}
.tree-title{
  font-size:22px;
}
.filter-wrapper{
  width: 94%;
}
.filter-wrapper>.el-input{
  width: 94%;
}
.main{
  height: 100%;
}
.main-inner{
  width: 48%;
  float: right;
  padding-top: 10px;
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
  height: 88%;
}
.edit-items{
  margin-top: 10px;
}
.edit-items table{
  margin: 0 auto;
}
.edit-items table>tr{
  height:50px;
}
.edit-items table>tr>td>span{
  display: inline-block;
  width: 60px;
}
.el-input{
  width: 70%;
}
.blank{
  width: 100%;
  height: 20px;
}
</style>
