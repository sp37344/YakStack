// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import Hot from './components/Hot'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'

Vue.use(Router)

const routes = [
{path: '/', redirect: '/self'},
{path: '/hot', component: Hot},
{path: '/self', component: Dashboard},
{path: '/signin', component: Landing}
]
const router = new Router({
  routes: routes
})

window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
