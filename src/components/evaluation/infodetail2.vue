<template lang="html">
 <div class="infoinput">
    <div class="title">
      <div class="subtitle">
        <img src="/static/img/user/1.png" alt="icon">
        <span>信息采集</span>
      </div>
    </div>

    <div class="content">
         <div class="content-title">
           信息采集表2
         </div>
         <div class="form-wrapper">
           <Form :model="formItem" :label-width="80">
            <FormItem label="用户姓名：">
              <Input v-model="formItem.input" placeholder=""></Input>
            </FormItem>
            <FormItem label="性别">
                <Select v-model="formItem.select">
                    <Option value="male">男</Option>
                    <Option value="female">女</Option>
                </Select>
            </FormItem>
            <FormItem label="出生年月">
                <Row>
                    <Col span="11">
                        <DatePicker type="date" placeholder="选择日期" v-model="formItem.date"></DatePicker>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <TimePicker type="time" placeholder="选择时间" v-model="formItem.time"></TimePicker>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Radio">
                <RadioGroup v-model="formItem.radio">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </RadioGroup>
            </FormItem>
            <!-- <FormItem label="Checkbox">
                <CheckboxGroup v-model="formItem.checkbox">
                    <Checkbox label="Eat"></Checkbox>
                    <Checkbox label="Sleep"></Checkbox>
                    <Checkbox label="Run"></Checkbox>
                    <Checkbox label="Movie"></Checkbox>
                </CheckboxGroup>
            </FormItem> -->
            <!-- <FormItem label="Switch">
                <i-switch v-model="formItem.switch" size="large">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
            </FormItem> -->
            <!-- <FormItem label="Slider">
                <Slider v-model="formItem.slider" range></Slider>
            </FormItem> -->
            <FormItem label="Text">
                <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <!-- <FormItem>
                <Button type="primary">Submit</Button>
                <Button type="ghost" style="margin-left: 8px">Cancel</Button>
            </FormItem> -->
         </Form>
         </div>

       </div>



    <div class="data-part">
        <Button @click="goBack()">返回上一页</Button></Button>
        <Button @click="handleSelectAll(false)">确认并提交</Button>
    </div>
 </div>

</template>

<script>
export default {
  data () {
    return {
      value4: '',
      formItem: {
                 input: '',
                 select: '',
                 radio: 'male',
                 checkbox: [],
                 switch: true,
                 date: '',
                 time: '',
                 slider: [20, 50],
                 textarea: ''
             }
    }
  },
  methods: {
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    goBack () {
      this.$router.go(-1)
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
  height:70px;
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
.content{
  margin:48px;
  background:#f5f4f4;
}
.content-title{
  height:65px;
  font-size:22px;
  color:#4b4a4a;
  line-height:65px;
  text-align:center;
  border:solid 2px #a0a0a0;
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
  width:350px;
  margin:0 auto;
}
.data-part{
  margin-bottom: 20px;
}
</style>
