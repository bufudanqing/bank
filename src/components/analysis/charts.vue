<template lang="html">
 <div class="infoinput">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="title">
      <div class="subtitle">
        <img :src="icon" alt="icon">
        <span>报表详情</span>
      </div>
    </div>
    <div class="pie">

      <div id="pie">

      </div>
    </div>
    <div class="map">
      <!-- <div class="map-time">
        <Row>
         <Col span="12">
             <DatePicker type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 200px"></DatePicker>
         </Col>
        </Row>
      </div> -->
      <div id="map">

      </div>
    </div>
 </div>

</template>

<script>

import icon from '../../assets/user/icon.png'
import li from '../../assets/user/line.png'
import axios from 'axios'
import echarts from 'echarts'
export default {
  name: 'hello',

  data () {
    return {
      icon:icon,
      msg: 'evaluation',
      spinShow:false,
    }
  },
  created() {

  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('map'))
        let myPie = this.$echarts.init(document.getElementById('pie'))
        let _this = this
        // 绘制饼图
        myChart.setOption({
            title : {
            text: '被评价次数分布情况',
            // subtext: '纯属虚构',
            x:'center'
            },
            tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            // orient: 'vertical',
            // left: 'left',
            // data: ['华夏银行','农业银行','招商银行']
            // },
            series : [
                // {
                //     name: '评价次数',
                //     type: 'pie',
                //     radius : '55%',
                //     center: ['50%', '60%'],
                //     data:[
                //         {value:"1", name:'华夏银行'},{value:"4", name:'农业银行'},{value:"3", name:'招商银行'}
                //     ],
                //     itemStyle: {
                //         emphasis: {
                //             shadowBlur: 10,
                //             shadowOffsetX: 0,
                //             shadowColor: 'rgba(0, 0, 0, 0.5)'
                //         }
                //     }
                // }
            ]
        });
        axios({
          method: 'get',
          url: '/bank/oprtion/oprtionByAssess.do'
        })
        .then(function(response) {
             // console.log(response.data)
             let chartData = response.data;
             let seriesData = [];
             chartData.forEach(function(item){
                  let outObj = {};
                  let valueKey = Object.keys(item);
                  outObj.value = valueKey[0];

                  outObj.name = item[valueKey[0]];
                  seriesData.push(outObj);

             });
             console.log(seriesData)
             // console.log(seriesData[0].name)
             myChart.setOption({
               // legend: {
               // orient: 'vertical',
               // left: 'left',
               // data: ['华夏银行','农业银行','招商银行']
               // },
               series:[
                 {
                     name: '评价次数',
                     type: 'pie',
                     radius : '50%',
                     center: ['50%', '60%'],
                     data:seriesData,
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.5)'
                         }
                     }
                 }
               ]
             })
        })
        .catch(function(error) {
             console.log(error);
        })
        // 绘制柱形图
        myPie.setOption({
            title: {
                text: '分数分布情况'
            },
            tooltip : {},
            xAxis: {
               data: ["60分以下","60分到80分之间","80分以上"]
            },
            yAxis: {},
        });
        axios({
          method: 'get',
          url: '/bank/assess/assessByDateAndgrades.do'
        })
        .then(function(response) {
             // console.log(response.data)
             let chartData = response.data;
             let seriesData = [];
             chartData.forEach(function(item){
                  let outObj = {};
                  let valueKey = Object.keys(item);
                  outObj.value = valueKey[0];
                  outObj.name = item[valueKey[0]];
                  // seriesData.push(outObj);
                  seriesData.push(outObj.name);
             });
             console.log(seriesData)
             myPie.setOption({
               series : [
                   {
                     name: '银行个数',
                     type: 'bar',
                     data: seriesData
                   }
               ]
             })
        })
        .catch(function(error) {
             console.log(error);
        })
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
  height:160px;
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
  font-size:22px;
  color:#7b7b7b;
  width: 650px;
  margin: 0 auto;
  text-align: left;
}
.data-part{
  margin-bottom: 20px;
}
.pie{
  margin-top:30px;
  width: 50%;
  float:right;
}
.map{
  margin-top:30px;
  width: 50%;
  float:right;
}
#map{
  width: 500px;
  height:400px;
  /*border:solid;*/
  margin:0 auto;
}
#pie{
  width: 500px;
  height:400px;
  /*border:solid;*/
  margin:0 auto;
}
#map,#pie{
  float: left;
}
.pie-time，.map-time{
  width:300px;
  display: block;
  height:100px;
  margin-top: 20px;
  margin-bottom:50px;
  position: relative;
  left: 90px;
  z-index: 10;
}
.map-time{
  width:300px;
  display: inline-block;
  float:right;
}
</style>
