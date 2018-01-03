import axios from 'axios'
import Vue from 'vue'
export default Vue.prototype.$http = {
  param: {parameter: {}},
  // get: function (url,args) {
  //   axios.post () {

  //   }
  // },
  post: function (url, args) {
    this.cheackUrl(url)
    this.copyArgs(args)
    return axios.post(url,
        JSON.stringify(this.param),
        { headers: {'Content-Type': 'text/plain;charset=UTF-8'} })
  },
  cheackUrl: function (url) {
    return (typeof url === 'string' && url.length > 0)
  },
  copyArgs: function (args) {
    if (typeof args === 'object' && args != null) {
      for (let attr in args) {
        this.param.parameter[attr] = args[attr]
      }
    }
  }
}
