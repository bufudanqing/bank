// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
import store from './../store/index'
import Vuex from 'vuex'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(iView)
Vue.use(Vuex)
Vue.use(store)
Vue.use(ElementUI)


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

/* eslint-disable no-new */

Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(name) {
  var arr, reg = new RegExp("(^|)" + name + "=([^;]*)(;|$)");
  if(arr = document.cookie.match(reg))
     return (arr[2]);
  else
     return null;
}
Vue.prototype.getCookie = getCookie;

// 删除cookie
Vue.prototype.delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() -1);
  var cval = getCookie(name);
  if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
  watch:{
    "$route" : 'checkLogin'
  },
  // 进入页面时检查登录状态
  created(){
    this.checkLogin();
    const router = this.$router;
    // let props = this.$router.resolve({
    // name: 'ProductDetail',
    // params: { id: some_id, slug: some_slug },
    // });
    //
    // return props.href;
  },
  methods: {
    checkLogin(){
      // 检查是否存在session
      if(!this.getCookie('session')){
        this.$router.push('/components/login');
      }
      // else {
      //   this.$router.push('/components/userlist');
      // }
    }
  }
})
console.info(window)
