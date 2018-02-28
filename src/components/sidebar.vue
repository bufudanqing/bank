<template>
  <div class="side">
    <Row>
        <Col span="8">
            <Menu :open-names="['2']" :active-name="$router.name" accordion @on-select="changeMenu" >

                <Submenu name="2">
                    <template slot="title"><Icon type="ios-paper"></Icon>质量评价</template>
                    <!-- 普通用户只可以看到信息采集，别的菜单都看不到 -->
                    <MenuItem name="infoinput" v-show='show1'>信息采集</MenuItem>
                    <MenuItem name="verifylist" v-show='show2'>审批列表</MenuItem>
                    <MenuItem name="verifylistAdmin" v-show='show3'>审核列表</MenuItem>
                    <MenuItem name="implement"  v-show='show4' onloadedmetadata="">评价实施</MenuItem>
                    <MenuItem name="implementResult" v-show='show5'>实施结果</MenuItem>
                </Submenu>
                <Submenu name="3" v-show='show'>
                    <template slot="title"><Icon type="stats-bars"></Icon>评价模型</template>
                    <MenuItem name="modelList">评价模型</MenuItem>
                </Submenu>
                <Submenu name="4" v-show='show'>
                    <template slot="title"><Icon type="ios-navigate"></Icon>评价指标</template>
                    <MenuItem name="system">指标体系</MenuItem>
                    <MenuItem name="weight">指标权重</MenuItem>
                </Submenu>
                <Submenu name="5" v-show='show'>
                    <template slot="title"><Icon type="ios-analytics"></Icon>综合分析</template>
                    <MenuItem name="charts">报表详情</MenuItem>
                </Submenu>
                <Submenu name="1" v-show='show'>
                    <template slot="title"><Icon type="ios-people"></Icon>用户管理</template>
                    <MenuItem name="userlist">{{liebiao}}</MenuItem>
                    <MenuItem name="role">角色管理</MenuItem>
                    <MenuItem name="authority">权限管理</MenuItem>
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
          show:  false,
          show1: false,
          show2: false,
          show3: false,
          show4: false,
          show5: false
        }
      },
      watch: {
        '$route' () {
          let mydata = JSON.parse(localStorage.userinfomation)
          console.info(mydata.roleId)//localstorage中的用户角色ID
          if (mydata.roleId == 1) {//管理员+
            this.show  = true
            this.show1 = false
            this.show2 = false
            this.show3 = false
            this.show4 = false
            this.show5 = true

          } else if (mydata.roleId == 3) {//专家
              this.show  = false
              this.show1 = false
              this.show2 = false
              this.show3 = false
              this.show4 = true
              this.show5 = false
          } else if (mydata.roleId == 2) {//普通用户，只有verifylist可以显示
              this.show = false
              this.show1 = true
              this.show2 = false
              this.show3 = false
              this.show4 = false
              this.show5 = false
          }  else if (mydata.roleId == 4) {//直属领导
              this.show = false
              this.show1 = false
              this.show2 = true
              this.show3 = false
              this.show4 = false
              this.show5 = false
          } else if (mydata.roleId == 5) {//负责人
              this.show = false
              this.show1 = false
              this.show2 = false
              this.show3 = true
              this.show4 = false
              this.show5 = false
          }
        }
      },
      created(){
        let mydata = JSON.parse(localStorage.userinfomation)
        console.info(mydata.roleId)//localstorage中的用户角色ID
        if (mydata.roleId == 1) {//管理员+
          this.show  = true
          this.show1 = false
          this.show2 = false
          this.show3 = false
          this.show4 = false
          this.show5 = true

        } else if (mydata.roleId == 3) {//专家
            this.show  = false
            this.show1 = false
            this.show2 = false
            this.show3 = false
            this.show4 = true
            this.show5 = false
        } else if (mydata.roleId == 2) {//普通用户，只有verifylist可以显示
            this.show = false
            this.show1 = true
            this.show2 = false
            this.show3 = false
            this.show4 = false
            this.show5 = false
        }  else if (mydata.roleId == 4) {//直属领导
            this.show = false
            this.show1 = false
            this.show2 = true
            this.show3 = false
            this.show4 = false
            this.show5 = false
        } else if (mydata.roleId == 5) {//负责人
            this.show = false
            this.show1 = false
            this.show2 = false
            this.show3 = true
            this.show4 = false
            this.show5 = false
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
/* .ivu-menu-submenu-title:hover {
    background: #f3f3f3;
    color: #1f60c0;
} */


</style>
