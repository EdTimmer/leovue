// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/arrow-left'
import 'vue-awesome/icons/arrow-right'
Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
require('./simpledrag.js')
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
