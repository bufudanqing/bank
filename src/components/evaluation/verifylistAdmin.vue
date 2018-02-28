<template lang="html">
 <div class="userlist">
    <div class="title">
      <div class="subtitle">
        <img :src="icon" alt="icon">
        <span>审核列表</span>
      </div>

    </div>
    <div class="select">
     <el-button-group>
        <el-button type="primary" @click="getNew()">待审核</el-button>
        <el-button type="primary" @click="getSuccess()">审核成功</el-button>
        <el-button type="primary" @click="getFailed()">审核失败</el-button>
        <el-button type="primary" @click="getAllbank()">全部审核信息</el-button>
      </el-button-group>
    </div>
    <div class="data-part">
       <Table border highlight-row ref="selection" :columns="columns7" :data="data6" @on-current-change="handleRowChange" @on-row-click="handleRowClick"></Table>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <!-- 查看每个银行详情信息 -->
    <div class="bank-info">
      <el-dialog title="厂商信息查看" :visible.sync="outerVisible">
        <div class="bankdetail">
          <Form :model="bankInformation" label-position="left" :label-width="100">
            <FormItem label="服务提供厂商">
              <Input v-model="bankInformation.bankName" :disabled="true"></Input>
            </FormItem>
            <FormItem label="厂商简介">
              <Input v-model="bankInformation.bankInfo" :disabled="true"></Input>
            </FormItem>
            <FormItem label="厂商人数">
              <Input v-model="bankInformation.peopleNumber" :disabled="true"></Input>
            </FormItem>
            <FormItem label="产品图片">
              <Input v-model="bankInformation.businessLicence" :disabled="true"></Input>
            </FormItem>
            <FormItem label="查看产品图">
              <Input v-model="bankInformation.businessLicencePath" :disabled="true"></Input>
              <span :title = "bankInformation.businessLicencePath" @click = "handleImage">点击预览</span>
            </FormItem>

            <FormItem label="产品许可">
              <Input v-model="bankInformation.openingLermission" :disabled="true"></Input>
            </FormItem>
            <FormItem label="查看产品许可">
              <Input v-model="bankInformation.openingLermissionPath" :disabled="true"></Input>
              <span :title = "bankInformation.openingLermissionPath" @click = "handleImage">点击预览</span>
            </FormItem>
            <FormItem label="业务名">
              <Input v-model="bankInformation.workNake" :disabled="true"></Input>
            </FormItem>
            <FormItem label="业务介绍">
              <Input v-model="bankInformation.workFlowInfo" :disabled="true"></Input>
            </FormItem>
            <FormItem label="运行状态">
              <Input v-model="bankInformation.currentStatus" :disabled="true"></Input>
            </FormItem>
            <FormItem label="运行时间">
              <Input v-model="bankInformation.setTime" :disabled="true"></Input>
            </FormItem>
            <FormItem label="业务截图">
              <Input v-model="bankInformation.screenshot" :disabled="true"></Input>
            </FormItem>
            <FormItem label="查看业务截图">
              <Input v-model="bankInformation.screenshotPath" :disabled="true"></Input>
              <span :title = "bankInformation.openingLermissionPath" @click = "handleImage">点击预览</span>
            </FormItem>
            <FormItem label="申请时间">
              <Input v-model="bankInformation.strReviewedTime" :disabled="true"></Input>
            </FormItem>
           </Form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="outerVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 图片预览容器 -->
    <Modal title="查看图片" v-model="visible" :style="modalStyle" @on-ok="outerVisible = true" @on-cancel="outerVisible = true">
        <img :src= "imgPath"  v-if="visible" style="width: 100%">
    </Modal>
    <div class="window">

        <Modal
           v-model="modal8"
           title="审核:"
           @on-ok="ok"
           @on-cancel="cancel"
           @on-visible-change="selectOption()">
           <Radio-group v-model="animal">
               <Radio label="通过"></Radio>
               <span @click="showText()">
                 <Radio label="不通过" @click="showText()"></Radio>
              </span>
           </Radio-group>
            <Input v-show="unpass" v-model="value6" type="textarea" :rows="4" placeholder="请输入不通过原因"></Input>
       </Modal>
    </div>
    <Modal
       v-model="modal9"
       title="分配专家:"
       @on-ok="ok1"
       @on-cancel="cancel1">
       <el-select v-model="expert" placeholder="请选择评分专家">
          <el-option
            v-for="item in experts"
            :key="item.id"
            :label="item.trueName"
            :value="item.id">
          </el-option>
        </el-select>
        <Input v-show="unpass" v-model="value6" type="textarea" :rows="4" placeholder="请输入不通过原因"></Input>
   </Modal>
 </div>

</template>

<script>
import icon from '../../assets/user/icon.png'
import li from '../../assets/user/line.png'
import axios from 'axios'
export default {
    props: {
      disabled: {
        type: Boolean
      }
    },
    data () {

      return {
        modalStyle: {
          position:"relative",
          zIndex:"999"
        },
        icon:icon,
        li:li,
        animal: '',
        showAdd: false,
        modal8: false,
        modal9: false,
        value6: '',
        rowId: '',
        option: '',
        expert:'',
        experts:[],
        dataAll:[],
        dataNew:[],
        dataSuccess:[],
        dataFailed:[],
        verifylist:[],
        bankInformation:{
          bankName: '',
          bankInfo:'',
          peopleNumber:'',
          businessLicence:'',
          businessLicencePath:'',
          setTime:'',
          currentStatus:'',
          openingLermission:'',
          openingLermissionPath:'',
          workNake:'',
          workFlowInfo:'',
          strReviewedTime:'',
          screenshot:'',
          screenshotPath:''
        },
        imgPath:'',
        unpass: false,
        verifyStatus:'',
        spinShow:false,
        outerVisible: false,
        innerVisible: false,
        visible:false,
        value4: '',
          columns7: [

              {
                title: '服务厂商',
                key: 'bankName'
              },
              {
                title: '申请时间',
                key: 'strReviewedTime',
                sortable: true
              },
              // {
              //   title: '银行简介',
              //   key: 'bankInfo'
              // },
              {
                title: '厂商人数',
                key: 'peopleNumber'
              },
              {
                title: '审核状态',
                key: 'status',
                sortable: true
              },
              {
                title: '评价专家',
                key: 'expert'
              },
              // {
              //   title: '打分ID',
              //   key: 'indexs'
              // },
              {
                  title: '操作',
                  key: 'action',
                  width: 230,
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
                                  click: () => {
                                      this.show(params.index)
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
                                  click: () => {
                                      // this.show(params.index)
                                      this.modal8 = true
                                      this.outerVisible = false

                                      this.value6 = ''
                                      this.animal = ''
                                      this.unpass = false
                                      this.verifyStatus = ''
                                      // console.log(this.animal)
                                  }
                              }
                          }, '审核'),
                          h('Button', {
                              props: {
                                  type: 'primary',
                                  size: 'small'
                              },
                              style: {
                                  marginRight: '5px'
                              },
                              on: {
                                  click: () => {
                                      // this.show(params.index)
                                      // this.getExperts()
                                      this.modal9 = true
                                      this.expert = ''
                                  }
                              }
                          }, '分配专家'),
                      ]);
                  }
              }
          ],
          data6: [
          ]
      }
    },
    created () {
      // 读取用户角色，判断负责人or部门经理
      let mydata = JSON.parse(localStorage.userinfomation)
      this.spinShow = true
      this.getNew()
    },
    mounted() {
      this.$nextTick(() => {
        this.getExperts()
      })
    },
    methods: {
      getExperts(){
        let self= this
        axios.get('/api/bank/user/getExpert.do')
        .then(function(res){
          // console.log(res)
          for( let i=0; i<res.data.length;i++){
            let myMap = {}
            myMap["id"] = res.data[i].id
            myMap["trueName"] = res.data[i].trueName
            self.experts.push(myMap)
          }
          // console.log(self.experts)
        })
        .catch(function(err){
          console.log(err)
        })
      },
      open1() {
        this.$alert('请选择专家', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.modal9 = true
          }
        });
      },
      bindExpert(bankIde, expertIde){
        if(bankIde == '' || expertIde == '') {
          this.open1()
          return false
        }
        let self = this
        axios.get('/api/bank/assess/assessSetExpert.do?aId='+bankIde+'&expert='+expertIde)
        .then(function(res){
          alert("绑定成功！")
          self.getNew()
        })
        .catch(function(err){
          console.log(err)
        })
      },
      // 部门经理-0，1,2
      getAll(){
        // this.spinShow = true
        let self = this
        axios.get('/api/bank/assess/assessLeadership.do?roleId=5')
        .then(function(res) {
          // 请求列表数据
          self.spinShow = false
          // console.info(res.data[0].pageDate)
          let result = res.data[0].pageDate
          for(let i=0;i<result.length;i++){
            if(result[i].status == 1) {
              result[i].status = "待审核"
            } else if (result[i].status == 3) {
              result[i].status = "审核成功"
            } else {
              result[i].status = "审核失败"
            }
          }
          let experts1 = self.experts
          for(let j=0;j<result.length;j++){
            if(result[j].expert == 0) result[j].expert = "未绑定专家"
            for(let k=0;k<experts1.length;k++){
              if (result[j].expert === experts1[k].id){
                // console.info(result[j].expert)
                // console.info(experts1[k].id)
                result[j].expert = experts1[k].trueName
              }
            }
          }
          self.data6 = result

        }).catch(function (err) {
          console.info(err)
        })
      },
      getNew(){
        let self = this
        axios.get('/api/bank/assess/findAssessByStatusS1.do')
        .then(function(res){
          self.spinShow = false
          // console.log(res.data[0].pageDate)
          // self.data6 = res.data[0].pageDate
          let result = res.data[0].pageDate
          for(let i=0;i<result.length;i++){
            if(result[i].status == 1) {
              result[i].status = "待审核"
            } else if (result[i].status == 3) {
              result[i].status = "审核成功"
            } else {
              result[i].status = "审核失败"
            }
          }
          let experts1 = self.experts
          for(let j=0;j<result.length;j++){
            if(result[j].expert == 0) result[j].expert = "未绑定专家"
            for(let k=0;k<experts1.length;k++){
              if (result[j].expert === experts1[k].id){
                // console.info(result[j].expert)
                // console.info(experts1[k].id)
                result[j].expert = experts1[k].trueName
              }
            }
          }
          self.data6 = result
        })
        .catch(function(err){
          console.log(err)
        })
      },
      // 负责人-3
      getSuccess(){
        let self = this
        axios.get('/api/bank/assess/findAssessByStatusS.do')
        .then(function(res){
          self.spinShow = false
          // console.log(res.data[0].pageDate)
          self.data6 = res.data[0].pageDate
          let result = res.data[0].pageDate
          for(let i=0;i<result.length;i++){
            if(result[i].status == 1) {
              result[i].status = "待审核"
            } else if (result[i].status == 3) {
              result[i].status = "审核成功"
            } else {
              result[i].status = "审核失败"
            }
          }
          let experts1 = self.experts
          for(let j=0;j<result.length;j++){
            if(result[j].expert == 0) result[j].expert = "未绑定专家"
            for(let k=0;k<experts1.length;k++){
              if (result[j].expert === experts1[k].id){
                // console.info(result[j].expert)
                // console.info(experts1[k].id)
                result[j].expert = experts1[k].trueName
              }
            }
          }
          self.data6 = result
        })
        .catch(function(err){
          console.log(err)
        })
      },
      getFailed(){
        let self = this
        axios.get('/api/bank/assess/findAssessByStatusF.do')
        .then(function(res){
          self.spinShow = false
          // console.log(res.data[0].pageDate)
          self.data6 = res.data[0].pageDate
          let result = res.data[0].pageDate
          for(let i=0;i<result.length;i++){
            if(result[i].status == 1) {
              result[i].status = "待审核"
            } else if (result[i].status == 3) {
              result[i].status = "审核成功"
            } else {
              result[i].status = "审核失败"
            }
          }
          let experts1 = self.experts
          for(let j=0;j<result.length;j++){
            if(result[j].expert == 0) result[j].expert = "未绑定专家"
            for(let k=0;k<experts1.length;k++){
              if (result[j].expert === experts1[k].id){
                // console.info(result[j].expert)
                // console.info(experts1[k].id)
                result[j].expert = experts1[k].trueName
              }
            }
          }
          self.data6 = result
        })
        .catch(function(err){
          console.log(err)
        })
      },
      getAllbank(){
        this.spinShow = true
        this.getAll()
      },
        show (index) {
          this.outerVisible = true
        },
        remove (index) {
          this.data6.splice(index, 1);
        },
        handleSelectAll (status) {
          this.$refs.selection.selectAll(status);
        },
        // 输出选中行的信息
        handleRowChange(currentRow, oldCurrentRow){
          // console.log(currentRow)
          this.rowId = currentRow.id
        },
        handleRowClick(info, index){
          this.bankInformation = info
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
        addData () {
          this.showAdd = true
        },
        closeAdd () {
          this.showAdd = false
        },
        selectOption(flag){
          // console.log(flag)
        },
        showText() {
          // alert()
          this.unpass = true
        },
        open() {
          this.$alert('请选择审核状态', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.modal8 = true
            }
          });
        },
        ok () {
          if(!this.animal || this.animal=='') {
            this.open()
          }
            this.verifyStatus = this.animal == '通过' ? 3 : 4
            let self = this
            // console.info(this.rowId)
            // console.info(this.verifyStatus)
            // console.info(this.value6)
            axios({
              method: 'get',
              url: '/api/bank/assess/assessUpdate.do?id='+this.rowId+'&verifyStatus='+self.verifyStatus+'&cause='+self.value6
            })
            .then(function(res){
              // console.info(res)
              self.verifyStatus =''
              self.animal = ''
              self.unpass = false
              // 刷新当前页面
              self.getNew()
            })
            .catch(function(err){
              console.log(err)
            })
         },
         cancel () {
           this.value6 = ''
           this.animal = ''
           this.unpass = false
         },
         ok1(){
           this.bindExpert(this.rowId, this.expert)
         },
         cancel1(){
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
.select{
  height:75px;
  background-color: #f2f1f1;
  padding-left: 40px;
  padding-top: 18px;
}
.el-button{
  font-size: 16px;
}
.select>div{
  float: left;
}
.select-item{
  font-size: 22px;
  color: #515152;
  margin-top: 20px;
  margin-left: 10px;
}
.second-title{
  width: 100%;
  height:80px;
  padding-right: 80px;
  padding-left: 50px;
  padding-top: 25px;
  background-color: #f2f1f1;
}
.second-title .wrapper{
  display: inline-block;
  float: left;
  font-size:22px;
  color:#515152;
  margin-right: 10px;
}
.second-title .wrapper div,img{
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
.tips{
  margin-top: 20px;
  margin-left: 10px;
  float:left;
}
</style>
