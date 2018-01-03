<template lang="html">
 <div class="infoinput">
   <div class="real-input">
     <div class="title">
       <div class="subtitle">
         <img :src="icon" alt="icon">
         <span>信息采集</span>
       </div>
     </div>

     <div class="content">
          <div class="content-title">
            信息采集表
          </div>
         <div class="">
            <form  id= "uploadForm" name="regForm" enctype="multipart/form-data" >
            <!-- <form class="" enctype="multipart/form-data" action="/api/api/bank/assess/assessInfoSubmit.do" method="post"> -->
              <label class="ivu-form-item-label" style="width: 80px;">银行名字</label>
              <input type="text" name="bankName" value="" class="ivu-input"><br>

              <label class="ivu-form-item-label" style="width: 80px;">银行简介</label>
              <input type="text" name="bankInfo" value="" class="ivu-input" required><br>
              <label class="ivu-form-item-label" style="width: 80px;">银行人数</label>
              <input type="text" name="peopleNumber" value="" class="ivu-input" required><br>
              <label class="ivu-form-item-label" style="width: 80px;">上传营业执照文件</label>
              <input type="file" name="businessLicence" value="" class="ivu-input" required><br>
              <label class="ivu-form-item-label" style="width: 80px;">上传开户许可文件</label>
              <input type="file" name="openingLermission" value="" class="ivu-input" required><br>
              <label class="ivu-form-item-label" style="width: 80px;">业务名称</label>
              <input type="text" name="workNake" value="" class="ivu-input" required><br>
              <label class="ivu-form-item-label" style="width: 80px;">业务介绍</label>
              <input type="text" name="workFlowInfo" value="" class="ivu-input" required><br>
              <label class="ivu-form-item-label" style="width: 80px;">开发者</label>
              <input type="text" name="developer" value="" class="ivu-input" required><br>
              <label class="ivu-form-item-label" style="width: 80px;">管理部门</label>
              <input type="text" name="adminDept" value="" class="ivu-input" required><br>
              <label class="ivu-form-item-label" style="width: 80px;">运行时间</label>
              <input type="text" name="setTime" value="" class="ivu-input" required><br>
              <label class="ivu-form-item-label" style="width: 80px;">目前运行状态</label>
              <input type="text" name="currentStatus" value="" class="ivu-input" required><br>
              <label class="ivu-form-item-label" style="width: 80px;">上传页面截图</label>
              <input type="file" name="screenshot" value="" class="ivu-input" required><br>
              <Button @click="goBack()">返回上一页</Button>
              <!-- <input type="button" @click="goSubmit()">确认并提交</input> -->
              <!-- <input type="submit" name="" value="确认并提交" class="ivu-btn"> -->

             <input type="button" value="上传" @click="doUpload()" />
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
  data () {
    return {
      value4: '',
      icon:icon,
      formItem: {
                 input1: '',
                 input2: '',
                 input3: '',
                 input4: '',
                 input5: '',
                 input6: '',
                 input7: '',
                 input8: '',
                 textarea: ''
             },
            imgName: '',
            visible: false,
            uploadList: []
    }
  },
  methods: {
        doUpload: function () {
         var formData = new FormData($( "#uploadForm" )[0]);
         $.ajax({
              url: 'http://localhost:8889/api/bank/assess/assessInfoSubmit.do' ,
              type: 'post',
              data: formData,
              async: false,
              cache: false,
              contentType: false,
              processData: false,
              success: function (returndata) {
                  console.log(111)
              },
              error: function (returndata) {
                  console.log(222)
              }
         });
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    turnNext () {
      this.$router.push('infodetail2')
    },
    goBack () {
      this.$router.go(-1)
    },
    goSubmit () {
      document.forms["regForm"].submit()
      return false

    }
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
</style>
