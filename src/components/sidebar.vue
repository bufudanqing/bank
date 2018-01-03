<template>
  <div class="side">
    <Row>
        <Col span="8">
            <Menu :open-names="['2']" :active-name="$router.name" accordion @on-select="changeMenu" >

                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        质量评价
                    </template>
                    <MenuItem name="infoinput" v-show="show2">信息采集</MenuItem>
                    <MenuItem name="verifylist" v-show="show1">审核列表</MenuItem>
                    <MenuItem name="implement" v-show="show3">评价实施</MenuItem>
                    <MenuItem name="implementResult" v-show="show1">实施结果</MenuItem>
                </Submenu>
                <Submenu name="3" v-show="show1">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        评价模型
                    </template>
                    <MenuItem name="model">评价模型</MenuItem>
                </Submenu>
                <Submenu name="4" v-show="show1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        评价指标
                    </template>
                    <MenuItem name="system">指标体系</MenuItem>
                    <MenuItem name="weight">指标权重</MenuItem>
                </Submenu>
                <Submenu name="5" v-show="show1">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        综合分析
                    </template>
                    <MenuItem name="charts">报表详情</MenuItem>
                </Submenu>
                <Submenu name="1" v-show="show1">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        用户管理
                    </template>
                    <MenuItem name="userlist">
                      {{liebiao}}
                      </MenuItem>
                    <MenuItem name="role"  >
                      角色管理
                  </MenuItem>
                    <MenuItem name="authority" >权限管理</MenuItem>
                </Submenu>
            </Menu>
        </Col>
    </Row>
  </div>
</template>
<script>
    export default {
      data () {
        return {
          liebiao: '用户列表',
          show1: true,
          show2: true,
          show3: true

        }
      },
      watch: {

        '$route' () {
          let mydata = JSON.parse(localStorage.userinfomation)
          if (mydata.roleId == 1) {
            this.show1 = true
            this.show2 = false
            this.show3 = false
          } else if (mydata.roleId == 2) {
            this.show1 = false
            this.show2 = true
            this.show3 = false
          } else if (mydata.roleId == 3) {
            this.show1 = false
            this.show2 = false
            this.show3 = true
          }
          // let mydata = JSON.parse(localStorage.userinfomation)
          //
          // if ( !mydata.userId || mydata.userId == ''){
          //   this.$router.push('/components/login')
          // }
        }
      },
      created(){

         // let rd = this.$store.state.userInfo.roleId
         let mydata = JSON.parse(localStorage.userinfomation)
         if (mydata.roleId == 1) {
           this.show1 = true
           this.show2 = false
           this.show3 = false
         } else if (mydata.roleId == 2) {
           this.show1 = false
           this.show2 = true
           this.show3 = false
         } else if (mydata.roleId == 3) {
           this.show1 = false
           this.show2 = false
           this.show3 = true
         }
      },
      methods: {
        changeMenu:function(name){
          this.$router.push(name)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side{
  background-color: #1f60c0;
  color:#fff;
}
.ivu-menu{
  color:#fff;
  font-size:22px;
  background-color: #1f60c0;
}
.ivu-menu-item{
  color:#fff;
  font-size:22px;
}
.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
    background: #3570cb !important;
}
.ivu-menu-submenu-title:hover{
  color:#1f60c0 !important;
}
/* .ivu-menu-submenu:hover{
  background: #f3f3f3;
  color: #2d8cf0;
} */

</style>
