<template lang="html">
 <div class="infoinput">

   <div class="title">
     <div class="subtitle">
       <img :src="icon" alt="icon">
       <span>信息采集</span>
     </div>
   </div>
<!-- 0，待审批-查看信息；
     1，审批通过待打分-查看信息
     5，审批不通过-编辑信息
     2，评价成功-分数超过60-看到分数，开放信息采集
     3，评价失败-分数低于60-看到分数，开放信息采集
  -->
   <el-alert
     title="上一条申请正在审批(下表为申请信息)"
     type="info"
     center
    show-icon
     v-show="title.title1">
   </el-alert>
   <el-alert
     title="上一条申请审批通过待评价(下表为申请信息)"
     type="info"
     center
    show-icon
     v-show="title.title2">
   </el-alert>
   <el-alert
     title="上一条申请审批失败，请修改后再次提交(原因如下)"
     ref="upassReason"
     :description="cause"
     type="error"
     center
    show-icon
     v-show="title.title3">
   </el-alert>

   <el-alert
     title="上一条申请评价失败，请重新提交申请(分数如下)"
     :description="bankScore"
     type="error"
     center
     show-icon
     v-show="title.title5">
   </el-alert>
   <el-alert
     title="上一条申请评价成功，可提交新的申请(分数如下)"
     :description="bankScore"
     type="success"
     center
    show-icon
     v-show="title.title6">
   </el-alert>
   <div class="xieyi" v-show="show1">

     <div class="second-title">
       <div class="wrapper">
       <span>信息采集承诺书</span><br>
       <span>尊敬的用户，您好！请您认真阅读下面的选项，确认每项都同意后才能生成完整的可供填写的表格。</span>
       </div>
     </div>
     <div class="items">
      <div>1.&nbsp请确认您的填写是真实有效的。</div><br>
      <div>2.&nbsp请确认您已经仔细看过信息采集须知，并会按照须知认真填写。</div><br>
      <div>3.&nbsp请确认您的信息是符合填写要求所满足的问题。</div><br>
      <div>4.&nbsp您要对所填写的内容负责。</div><br>
      <div>5.&nbsp您要对审核的结果负责。</div><br>

     </div>
     <div class="data-part">
         <Button @click="turnNext()">同意并继续</Button></Button>
         <Button >不同意并返回</Button>
     </div>
   </div>

   <div class="real-input" v-show="show2">
     <!-- <Col class="demo-spin-col" span="8" v-if="loadingShow">
         <Spin fix>
             <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
             <div>Loading</div>
         </Spin>
     </Col> -->
     <div class="content">
          <div class="content-title">
            信息采集表(所有选项必填)
          </div>
         <div class="">
            <form  id= "uploadForm" name="regForm" enctype="multipart/form-data" >
              <label class="ivu-form-item-label" style="width: 80px;">服务厂商</label>
              <input type="text" name="bankName" v-model="input.input1" class="ivu-input" :disabled="isReadOnly" :required="true"><br>



              <label class="ivu-form-item-label" style="width: 80px; position: relative;bottom: 100px;">厂商简介</label>
              <textarea  name="bankInfo" v-model="input.input2" class="ivu-text" :disabled="isReadOnly" required="required"></textarea><br>
              <label class="ivu-form-item-label" style="width: 80px;">厂商人数</label>
              <input type="text" name="peopleNumber" v-model="input.input3" class="ivu-input" :disabled="isReadOnly" required="required"><br>
              <label class="ivu-form-item-label" style="width: 80px;">产品图片</label>
              <input type="file" name="businessLicence"  v-show="fileshow"  class="ivu-input" :disabled="isReadOnly" required="required" accept="image/gif,image/jpeg,image/jpg,image/png"><br>


              <label class="ivu-form-item-label" style="width: 80px;">产品许可文件</label>
              <input type="file" name="openingLermission" v-show="fileshow"  class="ivu-input" :disabled="isReadOnly" required="required" accept="image/gif,image/jpeg,image/jpg,image/png"><br>
              <label class="ivu-form-item-label" style="width: 80px;">产品名称</label>
              <input type="text" name="workNake" v-model="input.input6" class="ivu-input" :disabled="isReadOnly" required="required"><br>
              <label class="ivu-form-item-label" style="width: 80px;">产品介绍</label>
              <input type="text" name="workFlowInfo" v-model="input.input7" class="ivu-input" :disabled="isReadOnly" required="required"><br>
              <label class="ivu-form-item-label" style="width: 80px;">开发者</label>
              <input type="text" name="developer" v-model="input.input8" class="ivu-input" :disabled="isReadOnly" required="required"><br>
              <label class="ivu-form-item-label" style="width: 80px;">管理部门</label>
              <input type="text" name="adminDept" v-model="input.input9" class="ivu-input" :disabled="isReadOnly" required="required"><br>
              <label class="ivu-form-item-label" style="width: 80px;">运行时间</label>
              <input type="text" name="setTime" v-model="input.input10" class="ivu-input" :disabled="isReadOnly" required="required"><br>
              <label class="ivu-form-item-label" style="width: 80px;">目前运行状态</label>
              <input type="text" name="currentStatus" v-model="input.input11" class="ivu-input" :disabled="isReadOnly" required="required"><br>
              <label class="ivu-form-item-label" style="width: 80px;">上传页面截图</label>
              <input type="file" name="screenshot"  v-show="fileshow" class="ivu-input" :disabled="isReadOnly" required="required" accept="image/gif,image/jpeg,image/jpg,image/png"><br>
              <!-- <Button v-show="showbtn" @click="goBack()">返回上一页</Button> -->

              <!-- <input type="file" name="screenshot"  v-show="fileshow" class="ivu-input" :disabled="isReadOnly" required><br> -->


               <input class="ivu-btn" v-show="showbtn" :disabled="disabled1"  type="button" value="确认提交" @click="doUpload()" />

               <input class="ivu-btn" v-show="showedit" :disabled="disabled2" type="button" value="确认修改并提交" @click="editUpload()" />

            </form>


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
  props: {
    description: {
      type: String,
      disabled:Boolean
    }
  },
  data () {

    return {
      icon:icon,
      value4: '',
      bankId: '',
      bankName: '',
      bankScore: '',
      cause: '',
      disabled1: false,
      disabled2:false,
      title: {
        title1: false,
        title2: false,
        title3: false,
        title4: false,
        title5: false,
        title6: false,
      },
      fileshow:true,
      isReadOnly:false,
      showbtn:true,
      showedit:false,
      spinShow:false,
      loadingShow:false,
      input: {
        input1: '',
        input2: '',
        input3: '',
        input6: '',
        input7: '',
        input8: '',
        input9: '',
        input10: '',
        input11: ''
      },
      show1: false,
      show2:false
    }
  },
  mounted () {
    // 请求当前用户的最近一条申请记录

    this.$nextTick(() => {
       this.initData()

   })

  },
  methods: {
    turnNext () {
      this.$router.push('infodetail1')
    },
    fillData() {
      let self = this
      axios.get('/api/bank/assess/selAssessRecently.do')
      .then(function(res){
        console.log(typeof(res.data[0].result.cause))
        self.bankId = res.data[0].result.id
        let st = res.data[0].result.status
          self.input.input1=res.data[0].result.bankName
          self.input.input2=res.data[0].result.bankInfo
          self.input.input3=res.data[0].result.peopleNumber
          self.input.input6=res.data[0].result.workNake
          self.input.input7=res.data[0].result.workFlowInfo
          self.input.input8=res.data[0].result.developer
          self.input.input9=res.data[0].result.adminDept
          self.input.input10=res.data[0].result.setTime
          self.input.input11=res.data[0].result.currentStatus
      })
      .catch(function(err){
        console.log(err)
      })
    },
    initData(){
      let self = this
      axios.get('/api/bank/assess/selAssessRecently.do')
      .then(function(res){
        console.info(res.data[0].status)

        // console.info(res.index)


        if (res.data[0].status == 0) {
          // self.title.title1 = false
          // self.title.title2 = false
          // self.title.title3 = false
          // self.title.title5 = false
          // self.title.title6 = false
          self.show2 = true
          self.isReadOnly = false
          // console.info(111)
        } else {
          let st = res.data[0].result.status
          let name = res.data[0].result.namkName
          let cause = res.data[0].result.cause
          let bankScore = res.data[0].result.index

                  if (st == 0) {
                    // self.$refs.upassReason.description = res.data[0].result.index
                    self.title.title1 = true
                    self.fillData()
                    self.show2 = true
                    self.isReadOnly = true
                    self.showbtn = false
                  } else if (st == 5) {
                    self.title.title3 = true
                    // self.bankScore = res.data[0].result.index
                    self.cause = cause

                    self.fillData()
                    self.show2 = true
                    self.isReadOnly = false
                    self.showbtn = false
                    self.showedit = true
                  } else if (st == 1) {
                    self.title.title2 = true
                    self.fillData()
                    self.show2 = true
                    self.isReadOnly = true
                    self.showbtn = false
                  } else if (st == 2) {
                    self.bankScore = bankScore
                    self.title.title6 = true
                    self.show2 = true

                  }
                   else if (st ==3) {
                     self.bankScore = bankScore
                     self.title.title5 = true
                     self.show2 = true
                   }
        }

      })
      .catch(function(err){
        console.log(err)
      })
    },
    winReload:function(cond){
         window.location.reload();
    },
    doUpload: function () {
      // this.showbtn = false
      // this.spinShow = true
      // this.loadingShow = true
      this.disabled1 = true
      let self = this
     var formData = new FormData($( "#uploadForm" )[0]);

         $.ajax({
              url: '/api/bank/assess/assessInfoSubmit.do' ,
              type: 'post',
              data: formData,
              async: false,
              cache: false,
              contentType: false,
              processData: false,
              success: function (returndata) {
                self.showbtn = true
                  self.spinShow = false
                  self.loadingShow = true
                  console.log(111)
                  self.bankId = ''
                  this.disabled1 = false
                  let roleid = self.$store.state.userInfo.roleId
                  let mydata = JSON.parse(localStorage.userinfomation)
                  if (mydata.roleId == 1) {
                    self.$router.push('/components/verifylist')

                  } else if (mydata.roleId == 2) {
                    self.winReload()
                    // self.$router.push('/components/infoinput')
                    // self.$router.go(0)
                  }
              },
              error: function (error) {
                  console.log(222)
                  console.log(error)
              }
         });
    },
    editUpload: function (bkid) {
        this.spinShow = true
        this.disabled2 = true
      let self = this
     var formData = new FormData($( "#uploadForm" )[0]);
     // console.log(self.bankId)
     formData.append("id" , self.bankId)
         $.ajax({
              url: '/api/bank/assess/updateAssess.do' ,
              type: 'post',
              data: formData,
              async: false,
              cache: false,
              contentType: false,
              processData: false,
              success: function (returndata) {
                self.spinShow = false
                 console.log(self.bankId)
                  console.log("修改信息提交成功")
                  self.bankId = ''
                  this.disabled2 = false
                  // let roleid = self.$store.state.userInfo.roleId
                  // if (roleid == 1) {
                  //   self.$router.push('/components/verifylist')
                  //
                  // } else if (roleid == 2) {
                  //   self.$router.push('/components/infoinput')
                  // }
                  let mydata = JSON.parse(localStorage.userinfomation)
                  if (mydata.roleId == 1) {
                    self.$router.push('/components/verifylist')

                  } else if (mydata.roleId == 2) {
                    self.winReload()
                    self.$router.push('/components/infoinput')
                    // self.$router.go(0)
                  }
              },
              error: function (error) {
                  console.log(222)
                  console.log(error)
              }
         });
    },
  }
}
</script>

<style lang="css" scoped>
body{
}
.infoinput{
  position: absolute;
  top:110px;
  left:240px;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding-right: 3px;
    padding-bottom: 20px;
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
  height:100px;
  padding-right: 80px;
  padding-left: 50px;
  padding-top:15px;
  background-color: #f2f1f1;
}
.second-title .wrapper span:nth-child(1){
  font-size: 24px;
  color:#2f3030;
  display: block;
  /* margin-top:5px; */
  /* margin-bottom: 15px; */
}
.second-title .wrapper span:nth-child(2){
  font-size: 18px;
  color:#484849;
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
.items{
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
  height: 300px;
  padding-top: 30px;
}
.items div{
  display: block;
  font-size:18px;
  color:#7b7b7b;
  width: 650px;
  margin: 0 auto;
  text-align: left;
}
.data-part{
  margin-bottom: 20px;
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
  height:100px;
  padding-right: 80px;
  padding-left: 50px;
  padding-top: 25px;
  background-color: #f2f1f1;
}
.second-title .wrapper span:nth-child(1){
  font-size: 24px;
  color:#2f3030;
  display: block;
  margin-top:20px;
  margin-bottom: 15px;
}
.second-title .wrapper span:nth-child(2){
  font-size: 18px;
  color:#484849;
}
.content{
  margin-left:48px;
  margin-right:48px;
  background:#f5f4f4;
}
.content-title{
  height:40px;
  font-size:22px;
  color:#4b4a4a;
  line-height:60px;
  text-align:center;
  /* border:solid 2px #a0a0a0; */
  margin-bottom: 20px;
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
.form-wrapper{
  border:solid 1px #a0a0a0;
  padding-top:30px;
}
form{
  width:500px;
  margin:0 auto;
}
.data-part{
  margin-bottom: 20px;
}
.ivu-form-item-label{
  display: inline-block;
  width:90px !important;
  font-size:18px !important;
}
.ivu-text{
  display: inline-block;
    height:100px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    width: 80% !important;
    margin-bottom: 25px;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
}
.ivu-input{
  width: 80% !important;
  margin-bottom: 25px;
}
.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    #uploadForm{
      padding-bottom: 20px;
    }
</style>
