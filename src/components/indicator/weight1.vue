<template lang="html">
<div class="infoinput">
  <div class="title">
    <div class="subtitle">
      <img src="/static/img/user/1.png" alt="icon">
      <span>指标权重</span>
    </div>

  </div>
  <div class="content">
    <Form :model="formRight" label-position="right" :label-width="100">
    <FormItem label="1">
        <Input v-model="formRight.input1"></Input>
    </FormItem>
    <FormItem label="2">
        <Input v-model="formRight.input2"></Input>
    </FormItem>
    <FormItem label="3">
        <Input v-model="formRight.input3"></Input>
    </FormItem>
</Form>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      formRight: {
                  input1: '',
                  input2: '',
                  input3: ''
              },
    }
  }
}
</script>

<style lang="css">
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
Form{
  padding-top: 50px;
  width: 300px;
  margin: 0 auto;
}
</style>
