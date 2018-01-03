import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import userlist from '@/components/user/userlist'
import role from '@/components/user/role'
import authority from '@/components/user/authority'
import infoinput from '@/components/evaluation/infoinput'
import infodetail1 from '@/components/evaluation/infodetail1'
import infodetail2 from '@/components/evaluation/infodetail2'
import verifylist from '@/components/evaluation/verifylist'
import implement from '@/components/evaluation/implement'
import score from '@/components/evaluation/score'
import implementResult from '@/components/evaluation/implementResult'
import system from '@/components/indicator/system'
import weight from '@/components/indicator/weight'
import charts from '@/components/analysis/charts'
import model from '@/components/model/model'
import addUser from '@/components/user/children/addUser'


Vue.use(Router)

export default new Router({
  mode: 'hash',
	base: '/bank/',
  routes: [
    // 重定向
    {
      path: '/',
      redirect: '/components/userlist'
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: userlist
    // },
    {
      path: '/components/login',
      name: 'login',
      component: login
    },
    {
      path: '/components/userlist',
      name: 'userlist',
      component: userlist
    },
    {
      path: '/components/role',
      name: 'role',
      component: role
    },
    {
      path: '/components/authority',
      name: 'authority',
      component:authority
    },
    {
      path: '/components/infoinput',
      name: 'infoinput',
      component: infoinput
    },
    {
      path: '/components/infodetail1',
      name: 'infodetail1',
      component: infodetail1
    },
    {
      path: '/components/infodetail2',
      name: 'infodetail2',
      component: infodetail2
    },
    {
      path: '/components/verifylist',
      name: 'verifylist',
      component: verifylist
    },
    {
      path: '/components/implement',
      name: 'implement',
      component: implement
    },
    {
      path: '/components/implementResult',
      name: 'implementResult',
      component: implementResult
    },
    {
      path: '/components/score',
      name: 'score',
      component: score
    },
    {
      path: '/components/system',
      name: 'system',
      component: system
    },

    {
      path: '/components/weight',
      name: 'weight',
      component: weight
    },
    {
      path: '/components/charts',
      name: 'charts',
      component: charts
    },
    {
      path: '/components/addUser',
      name: 'addUser',
      component: addUser
    },
    {
      path: '/components/model',
      name: 'model',
      component: model
    }
  ]
})
