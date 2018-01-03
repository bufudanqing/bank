<template lang="html">
  <div class="score">
    <div class="score-wrapper">
      <!--  展示银行信息-->
      <div class="left">
        <div class="">
          <div class="bank-title">
            <h3>待评分厂商：{{bkInfo.bankName}}</h3>
          </div>
          <div class="">
            <tr class="item-line">
              <td class="label">服务厂商</td>
              <td class="infor" v-text="bkInfo.bankName"></td>
            </tr>
            <tr class="item-line">
              <td class="label">厂商简介</td>
              <td v-text="bkInfo.bankInfo"></td>
            </tr>
            <tr class="item-line">
              <td class="label">产品图片</td>
              <!-- <td v-text="bkInfo.businessLicence"></td> -->
              <td><span :title = "bkInfo.businessLicencePath" @click = "handleImage">点击预览</span></td>
            </tr>
            <tr class="item-line">
              <td class="label">营业状态</td>
              <td v-text="bkInfo.currentStatus"></td>
            </tr>
            <tr class="item-line">
              <td class="label">开发者</td>
              <td v-text="bkInfo.developer"></td>
            </tr>
            <tr class="item-line">
              <td class="label">产品许可</td>
              <td><span :title = "bkInfo.openingLermissionPath" @click = "handleImage">点击预览</span></td>
              <!-- <td v-text="bkInfo.openingLermission"></td> -->
            </tr>
            <tr class="item-line">
              <td class="label">厂商人数</td>
              <td v-text="bkInfo.peopleNumber"></td>
            </tr>
            <tr class="item-line">
              <td class="label">页面截图</td>
              <td><span :title = "bkInfo.openingLermissionPath" @click = "handleImage">点击预览</span></td>
              <!-- <td v-text="bkInfo.screenshot"></td> -->
            </tr>
            <tr class="item-line">
              <td class="label">厂商业务</td>
              <td v-text="bkInfo.workFlowInfo"></td>
            </tr>

          </div>
        </div>


      </div>
      <!-- 打分 -->
      <div class="right">
        <h1 v-if="selectSys">请选择打分体系</h1>
        <div class="systems">
          <RadioGroup ref="chooseSys" v-if="selTitle" v-model="vertical" vertical @on-change="handleSelect">
              <Radio v-for="(item, indexName) in topNodes" :key="item.id" :label="item.indexName">
                  <span>{{item.indexName}}</span>
              </Radio>
          </RadioGroup>
          <div class="system-detail">
              <h1>已选择打分体系：{{ systemHead }}</h1>
              <ol  type="a">
                <table>
                  <tbody>
                    <div class="timu" v-for="(item, index, indexName, subject) in evaSubject" :key="item.id">
                    <div>
                      <div class="item-title">{{index+1}}.&nbsp&nbsp{{item.subject}}</div>
                    </div>
                    <!-- <span :class="hiddenNum">{{item.id}}</span> -->
                    <div class="item-option">
                      <td>
                      <input  class="sub-radio" type="radio" :name="item.subject" :id="item.id" :value="item.percentageA" ><label >{{item.A}}</label>
                      <span>({{item.percentageA}})</span>
                      </td>

                      <td>
                      <input  class="sub-radio" type="radio" :name="item.subject" :id="item.id" :value="item.percentageB"><label >{{item.B}}</label>
                      <span>({{item.percentageB}})</span>
                      </td>

                      <td>
                      <input class="sub-radio" type="radio" :name="item.subject" :id="item.id" :value="item.percentageC" v-show="item.percentageC !==''"><label >{{item.C}}</label>
                      <span v-show="item.percentageC !==''">({{item.percentageC}})</span>
                      </td>

                      <td>
                      <input class="sub-radio" type="radio" :name="item.subject" :id="item.id" :value="item.percentageD" v-show="item.percentageD !==''"><label >{{item.D}}</label>
                      <span v-show="item.percentageD !==''">({{item.percentageD}})</span>
                    </td>
                    </div>
                  </div>
                  </tbody>
                </table>
              </ol>
                 <span class="ivu-btn" v-if="orSubmit"  @click="submitScore()">确认提交</span>

          </div>
        </div>
      </div>
    </div>
    <!-- 图片预览容器 -->
    <Modal title="查看图片" v-model="visible" >
        <!-- <img :src="'http://123.56.196.192:8889/bank/upload/businessLicence/48318Hydrangeas.jpg' " v-if="visible" style="width: 100%"> -->
        <img :src= "imgPath"  v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
export default {
  data () {
    return {
      // bkId: ''
       bkInfo: '',
       bkId: '',
       orSubmit: false,
       selectSys:true,
       selTitle:true,
       vertical: 'apple',
       visible:false,
       // 保存顶层节点
       topNodes: '',
       // 保存体系题目
       systemHead: '',
       // 保存所有题目
       evaSubject: '',
       hiddenNum:{display:'none'}
    }
  },
  mounted(){
    this.$nextTick(function () {
      // 取出store中存放的银行id和name
      this.bkId = this.$store.state.bkId
      // let bkName = this.$store.state.bkName
      // alert(this.bkId)
      // 得到银行信息
      let self = this
      axios({
        method: 'get',
        url: '/bank/assess/assessImplementOne.do?id='+self.bkId

      })
      .then(function(res) {
        self.bkInfo = res.data[0].result
      })
      .catch(function(error) {
           console.log(error);
      })
      // 获得树目录
      axios({
        method: 'get',
        url: '/bank/oprtion/findAllOprtionKing.do'

      })
      .then(function(res) {
        console.info(res.data[0].children)
        self.topNodes = res.data[0].children
      })
      .catch(function(error) {
           console.log(error);
      })
    })
  },
  methods: {
    // 绑定银行和选定的指标体系

    bindSystem (bankId, systemId) {
      axios.get('/bank/assess/assessAndOprtion.do?aId='+bankId+'&oId='+systemId)
      .then(function(res){
        // console.log(res)
        console.log("已绑定银行和系统")
      })
      .catch(function(err){
        console.log(err)
      })
    },
    handleSelect (value) {
      let selectId
      for(let i=0;i< this.topNodes.length;i++){
        if(value == this.topNodes[i].indexName){
           selectId = this.topNodes[i].id
        }

      }
      let self = this

      // 绑定银行和指标
      this.bindSystem( self.bkId, selectId)
      // console.log(selectId)
      // 获得当前点击节点体系的题目
      axios({
        method: 'get',
        url: '/bank/oprtion/oprtionSubject.do?id='+selectId

      })
      .then(function(res) {
        // console.info(res)
        // this.$ref.chooseSys.style.display = "none"
        self.systemHead = res.data[0].indexName
        let subjects = []
        for(let j=0;j<res.data.length;j++){
          // console.log(res.data[j])
          if(res.data[j].subject !== ""){
            subjects.push(res.data[j])
          }
        }
        self.evaSubject = subjects
        // console.log(self.evaSubject)
        self.orSubmit = true
        self.selectSys = false
        self.selTitle = false
      })
      .catch(function(error) {
           console.log(error);
      })
    },
    handleImage(event) {
      let el = event.currentTarget
      // alert(el.title)
      this.imgPath = el.title
      let str = this.imgPath
      str = str.substring(str.indexOf("upload"),str.length)
      this.imgPath = "http://123.56.196.192:8889/bank/"+str
      this.visible = true
      this.outerVisible = false
      // alert(this.imgPath)

    },
    submitScore() {
      let self = this
      let radioArr = $('.sub-radio');
      // console.log(radioArr.length)
      let arr = []
      for(let k=0; k<radioArr.length; k++){
        if(radioArr[k].checked){
          // 得到题号
          // alert(radioArr[k].id)
          // 得到分数
          // alert(radioArr[k].value)
          var myMap = {}
          myMap["oId"] = radioArr[k].id
          myMap["grades"] = radioArr[k].value
          arr.push(myMap)
        }
      }
      arr = JSON.stringify(arr)

      // arr = arr.replace(/"/g,"\'\'")
      // console.log(typeof(arr))

      // 把打分值传给后台
      let bkId = this.$store.state.bkId
      // console.log(bkId)
      $.ajax({
           url: '/bank/index/indexImplementSubmit.do' ,
           type: 'post',
           // 采用formdata方式提交包含文件的数据
           data: {
               aId: bkId,
               grade:arr
           },
           success: function () {
               // console.log(111)
               let roleid = self.$store.state.userInfo.roleId
               if (roleid == 1) {
                 self.$router.push('/components/implementResult')
               } else if (roleid == 3) {
                 self.$router.push('/components/implement')
               }
           },
           error: function () {
               console.log(222)
           }
      });

    }
  }
}
</script>

<style lang="css" scoped>
.score{
  background-color: #fff;
  position: absolute;
  top:110px;
  left:240px;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding-right: 3px;
  /* background: pink; */
}
.score-wrapper{
  width: 100%;
  height: 100%;
  padding: 30px;
  border:none;
}
.left{
  width:40%;
  margin-left: 20px;
  margin-top: 20px;
  float: left;
  border:1px solid #e9eaec;
}
.ivu-table{
  border: 1px solid #e9eaec;
  min-width: 80%;
}
.ivu-table thead{
  border: 1px solid #e9eaec;
}
.ivu-table td, .ivu-table th {
    min-width: 0;
    height: 48px;
    /* box-sizing: border-box; */
    /* text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle; */
    border: 1px solid #e9eaec;
}
.right{
  width: 55%;
  float: left;
  margin-left:20px;
  padding-left: 20px;
}
.sub-radio{
  background-color: #fff;
  border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
}
.system-detail h1{
  display: inline-block;
  height: 60px;
  margin-top: 30px;
}
.system-detail li{
  height:60px;
}
.system-detail li label{
  font-size: 16px;
}
.display{
  display: none;
}
.bank-title{
  font-size:18px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e9eaec;
}
.timu{
  display: block;
  width: 100%;
  height:85px;
  /* border:solid 1px pink; */
}
.label{
  width:80px;
  height:50px;
  line-height: 50px;
  font-size:14px;
  border-right: 1px solid #e9eaec;
}
.item-title{
  font-size: 16px;
  display: block;
  /* margin-bottom: 10px; */
  /* margin-top: 10px; */
  /* border:solid 1px green; */
  /* float: left; */
  width: 100%;
  text-align: left;
}
.item-option{
  display: block;
  /* border:solid 1px; */
  float: left;
}
.item-line{
  display: block;
  height: 50px;
  border-bottom: 1px solid #e9eaec;
}
.ivu-btn{
  margin-top:20px;
  margin-bottom:20px;
}
</style>
