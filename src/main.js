// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/arrow-left'
import 'vue-awesome/icons/arrow-right'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/'
// import VueInstant from 'vue-instant/dist/vue-instant.common'
// import VueInstant from './lib/VueInstant'
// debugger
// Vue.use(VueInstant)

// import './lib/vue-grid-layout'
const Defiant = require('./lib/defiant')
console.log(Defiant)

// import './assets/global.css'
// const purecss = require('css-loader!./assets/global.css')

import VueYouTubeEmbed from 'vue-youtube-embed'
import SectionLink from './components/SectionLink'
Vue.use(VueYouTubeEmbed)
Vue.component('sectionlink', SectionLink)

sync(store, router)

const util = require('./util.js')
util.parseQueryString(window.lconfig, window.location.href) // fill in global config object from url params

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
