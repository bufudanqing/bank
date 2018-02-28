import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import userlist from '@/components/user/userlist'
import role from '@/components/user/role'
import authority from '@/components/user/authority'
import infoinput from '@/components/evaluation/infoinput'

import verifylist from '@/components/evaluation/verifylist'
import verifylistAdmin from '@/components/evaluation/verifylistAdmin'
import implement from '@/components/evaluation/implement'
import score from '@/components/evaluation/score'
import implementResult from '@/components/evaluation/implementResult'
import system from '@/components/indicator/system'
import weight from '@/components/indicator/weight'
import charts from '@/components/analysis/charts'
import model from '@/components/model/model'
import addWeight from '@/components/model/addWeight'
import modelList from '@/components/model/modelList'
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
      path: '/components/verifylist',
      name: 'verifylist',
      component: verifylist
    },
    {
      path: '/components/verifylistAdmin',
      name: 'verifylistAdmin',
      component: verifylistAdmin
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
    },
    {
      path: '/components/addWeight',
      name: 'addWeight',
      component: addWeight
    },
    {
      path: '/components/modelList',
      name: 'modelList',
      component: modelList
    }
  ]
})
