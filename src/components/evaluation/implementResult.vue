<template lang="html">
 <div class="userlist">
    <div class="title">
      <div class="subtitle">
        <img :src="icon" alt="icon">
        <span>实施结果</span>
      </div>

    </div>
    <div class="data-part">
       <Spin size="large" fix v-if="spinShow"></Spin>
      <Table border ref="selection" :columns="columns4" :data="data1" @on-row-click="handleRowClick"></Table>
      <!-- <div class="tips">
      审核状态：0-待审核，1-审核通过，2-评分高于60分，3-评分低于60分，5-审核失败
    </div> -->
    </div>
 </div>

</template>

<script>
import axios from 'axios'
import icon from '../../assets/user/icon.png'
import li from '../../assets/user/line.png'
export default {
  data () {
    return {
      icon:icon,
      value4: '',
      uInfo: {
      },
      docPath:'',
      spinShow: false,
      link:'',
      columns4: [

        {
          title: '服务厂商',
          key: 'bankName'
        },
        {
          title: '申请时间',
          key: 'strReviewedTime',
          sortable: true
        },
        {
          title: '厂商简介',
          key: 'bankInfo'
        },
        // {
        //   title: '银行人数',
        //   key: 'peopleNumber'
        // },
        // {
        //   title: '营业执照',
        //   key: 'businessLicence'
        // },
        // {
        //   title: '营业执照上传路径',
        //   key: 'businessLicencePath'
        // },
        // {
        //   title: '开户证明',
        //   key: 'openingLermission'
        // },
        // {
        //   title: '开户证明上传路径',
        //   key: 'openingLermissionPath'
        // },
        {
          title: '业务名',
          key: 'workNake'
        },
        {
          title: '业务介绍',
          key: 'workFlowInfo'
        },
        // {
        //   title: '开发者',
        //   key: 'developer'
        // },
        // {
        //   title: '管理部门',
        //   key: 'adminDept'
        // },
        // {
        //   title: '运行时间',
        //   key: 'setTime'
        // },
        // {
        //   title: '目前运行状态',
        //   key: 'currentStatus'
        // },
        // {
        //   title: '页面截图',
        //   key: 'screenshot'
        // },
        // {
        //   title: '页面截图上传地址',
        //   key: 'setTime'
        // },
        {
          title: '审核状态',
          key: 'status',
          sortable: true
        },
        {
          title: '评价分数',
          key: 'index',
           sortable: true
        },
        // {
        //   title: '评价ID',
        //   key: 'options'
        // },
        // {
        //   title: '打分ID',
        //   key: 'indexs'
        // },
        {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            // render: (h, params) => {
            //   return h('a', {
            //     props: {}
            //   })
            // }
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
                                // this.show(params.index)
                                // this.modal8 = true
                                // this.handleRowClick()
                            }
                        }
                    }, '导出报告'),
                ]);
            }
        }
      ],
      data1: [

      ]
    }
  },
  created () {
    this.spinShow = true
    let self = this
    this.$http.post('/bank/oprtion/oprtionResult.do').then(function(res) {
      // console.info(res.data[0].pageDate)
      // console.info(res.data[0].pageDate[1])
      // console.info(res.data.pageDate[1])
      self.spinShow = false
      for(var i=0;i<res.data[0].pageDate.length;i++){
        if(res.data[0].pageDate[i].status == 2 ) {
          res.data[0].pageDate[i].status = "合格"
        } else if (res.data[0].pageDate[i].status == 3) {
          res.data[0].pageDate[i].status = "不合格"
        }
         self.data1 = res.data[0].pageDate
      }
    }).catch(function (err) {
      console.info(err)
    })
  },
  methods: {
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    handleRowClick(info, index){
      this.uInfo = info
      console.info(this.uInfo.id)
      let aid = this.uInfo.id
      this.exportDoc(aid)
    },
    exportDoc (id) {
      let self = this
      axios.get('/bank/index/generateReport.do?aId='+id)
      .then(function(res){
        console.info(res.data)
        self.docPath = res.data
        let str = self.docPath
        str = str.substring(str.indexOf("upload"),str.length)
        self.docPath = "http://123.56.196.192:8889/"+str
        self.docPath =JSON.stringify(self.docPath)
        console.info(self.docPath)
        self.link = self.docPath

        // window.location.href = "http://www.cnblogs.com/code-ten/"
         // window.open("http://www.cnblogs.com/code-ten/")
         window.open(str)
      })
      .catch(function(err){
        console.info(err)
      })
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
