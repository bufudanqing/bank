<template lang="html">
   <div class="infoinput">
     <div class="model-wrapper">
       <h2>请选择打分模型</h2>
       <div>
         <el-radio v-model="radio7" label="1" border :disabled="chooseStatus.disabled1"   @change="handleOption">模型1</el-radio>
         <el-radio v-model="radio7" label="2" border :disabled="chooseStatus.disabled2"  @change="handleOption">模型2</el-radio>
         <div class="btn-wrapper">
           <Button type="primary" :disabled="chooseStatus.disabled3" @click = "submitOption" >选择完毕</Button>
         </div>
       </div>
       <br />
     </div>

     <img :src="model" v-show="modelChoose==true"/>
     <img :src="model1" v-show="modelChoose==false"/>
     <Modal
          v-model="modal1"
          title="提示"
          @on-ok="ok"
          @on-cancel="cancel">
          <p>确认选择该评估模型？</p>

      </Modal>
   </div>

</template>

<script>
import model from '../../assets/model/model.png'
import model1 from '../../assets/model/model1.png'
export default {
  props: {
    disabled: {
      type: Boolean
    }
  },
  data (){
    return {
      radio7: '1',
      modal1: false,
      model:model,
      model1:model1,

      // modelChoose1:true,
      // modelChoose2:true,
      modelChoose:true,

      chooseStatus: {
        disabled1:false,
        disabled2:false,
        disabled3:false,
      },
      modelStatus:''
    }
  },
  mounted() {
    this.modelStatus = this.radio7
    console.log(this.modelStatus)
    // this.chooseStatus = sessionStorage.getItem("chooseStatus")
  },
  destroy () {

  },
  methods: {

    handleOption(status){

      this.modelStatus = status
      console.log(this.modelStatus)
      if(this.modelStatus == 1) {
        this.modelChoose = true
      } else if(this.modelStatus == 2){
        this.modelChoose = false
      }
    },
    // warning () {
    //    this.$Message.warning('请选择一个评估模型');
    //  },
    // 对话框1 的确定取消事件
    ok () {
      this.modal1 = false
      if (this.modelStatus ==1 ) {
         this.chooseStatus.disabled1 = true
         this.chooseStatus.disabled2 = true
         this.chooseStatus.disabled3 = true

         sessionStorage.setItem('chooseStatus', self.chooseStatus)
         // self.$store.commit('chooseStatus', self.chooseStatus)

         // 同时存入localStorage选择状态
         // localStorage.setItem("chooseStatus", JSON.stringify(self.chooseStatus))
      } else if(this.modelStatus == 2) {
          this.chooseStatus.disabled1 = true
          this.chooseStatus.disabled2 = true
          this.chooseStatus.disabled3 = true

          sessionStorage.setItem('chooseStatus', self.chooseStatus)

           // self.$store.commit('chooseStatus', self.chooseStatus)
      }

    },
    cancel () {
       // this.modal1 = false
    },
    submitOption() {
      if( !this.modelStatus && this.modelStatus === '' ) {
         this.warning()
         return false
      }
      this.modal1 = true

    }
  }
}
</script>

<style lang="css" scoped>
   .infoinput{
     position: absolute;
     top:110px;
     left:240px;
     right: 0;
     bottom: 0;
     overflow: auto;
     padding-right: 3px;
     background-color: #fff;
   }
   .infoinput>img{
     margin-top: 15px;
     width: 570px;
   }
   .btn-wrapper{
     margin-top:20px;
     text-align: center;
   }
   .ivu-btn-primary{
     /* display: block; */
   }
   .model-wrapper{
     float: left;
      padding: 20px;
      margin-top: 30px;
   }
   .model-wrapper h2{
     display: block;
    margin-bottom: 20px;
   }
</style>
