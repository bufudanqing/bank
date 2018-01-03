<template lang="html">
 <div class="userlist">
    <div class="title">
      <div class="subtitle">
        <img :src="icon" alt="icon">
        <span>审核列表</span>
      </div>

    </div>
    <div class="data-part">
       <Table border highlight-row ref="selection" :columns="columns7" :data="data6" @on-current-change="handleRowChange" @on-row-click="handleRowClick"></Table>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <!-- <div class="tips">
      审核状态：0-待审核，5-审核失败
    </div> -->
    <!-- 查看每个银行详情信息 -->
    <div class="bank-info">
      <el-dialog title="厂商信息查看" :visible.sync="outerVisible">
        <!-- <el-dialog
          width="30%"
          title="内层 Dialog"
          :visible.sync="innerVisible"
          append-to-body>
        </el-dialog> -->
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
          <!-- <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button> -->
        </div>
      </el-dialog>
    </div>
    <!-- 图片预览容器 -->
    <Modal title="查看图片" v-model="visible" :style="modalStyle" @on-ok="outerVisible = true" @on-cancel="outerVisible = true">
        <!-- <img :src="'http://123.56.196.192:8889/bank/upload/businessLicence/48318Hydrangeas.jpg' " v-if="visible" style="width: 100%"> -->
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
               <Radio label="通过" v-model='animal_1'></Radio>
               <span @click="showText()">
                 <Radio label="不通过" v-model='animal_2' @click="showText()"></Radio>
              </span>
           </Radio-group>
            <Input v-show="unpass" v-model="value6" type="textarea" :rows="4" placeholder="请输入不通过原因"></Input>
       </Modal>
    </div>
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
        animal: '通过',
        showAdd: false,
        modal8: false,
        animal_1: '',
        animal_2: '',
        value6: '',
        rowId: '',
        option: '',
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
              // {
              //   title: '评估ID',
              //   key: 'options'
              // },
              // {
              //   title: '打分ID',
              //   key: 'indexs'
              // },
              {
                  title: '操作',
                  key: 'action',
                  width: 140,
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
                                  }
                              }
                          }, '审核'),
                      ]);
                  }
              }
          ],
          data6: [
              {

              }
          ]
      }
    },
    created () {
      this.spinShow = true
      let self = this
      this.$http.post('/bank/assess/findAssessByStatus.do').then(function(res) {
      // 请求列表数据
        self.spinShow = false
        console.log(res)
        for(var i=0;i<res.data[0].pageDate.length;i++){

          console.log(res.data[0].pageDate[i])
           self.data6 = res.data[0].pageDate
           if(res.data[0].pageDate[i].status == 0 ) {
             res.data[0].pageDate[i].status = "待审核"
           } else if (res.data[0].pageDate[i].status == 5) {
             res.data[0].pageDate[i].status = "审核不通过"
           }
        }
      }).catch(function (err) {
        console.info(err)

      })
    },
    methods: {
        show (index) {
          this.outerVisible = true

          // alert(index)
          // this.outerVisible = true
            // this.$Modal.info({
            //     title: '银行申请信息',
            //     content: `银行名字：${this.data6[index].bankName}<br>银行申请时间：${this.data6[index].strReviewedTime}<br>银行简介：${this.data6[index].bankInfo}<br>银行人数：${this.data6[index].peopleNumber}<br>营业执照：${this.data6[index].businessLicencePath}<br>营业状态：${this.data6[index].currentStatus}`
            // })
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
        ok () {

            // (this.animal = '通过') ? this.verifyStatus = 1 : this.verifyStatus = 5
            this.verifyStatus = this.animal == '通过' ? 1 : 5
            console.info(this.verifyStatus)
            console.info(this.value6)
            let self = this
            axios({
              method: 'get',
              url: '/bank/assess/assessUpdate.do?id='+this.rowId+'&verifyStatus='+self.verifyStatus+'&cause='+self.value6
            })
            .then(function(res){
              console.log(res.data[0].status)
              self.verifyStatus =''
              self.animal = ''
              // 刷新当前页面
              // self.$router.push('/components/verifylist')
              // let self = this
              axios.post('/bank/assess/findAssessByStatus.do').then(function(res) {
                console.info(res.data[0].pageDate)
                for(var i=0;i<res.data[0].pageDate.length;i++){
                   self.data6 = res.data[0].pageDate

                   if(res.data[0].pageDate[i].status == 0 ) {
                     res.data[0].pageDate[i].status = "待审核"
                   } else if (res.data[0].pageDate[i].status == 5) {
                     res.data[0].pageDate[i].status = "审核不通过"
                   }
                }

              }).catch(function (err) {
                console.info(err)

              })
            })
            .catch(function(err){
              console.log(err)
            })


         },
         cancel () {
             // this.$Message.info('Clicked cancel');
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
