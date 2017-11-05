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
import Vue2Leaflet from 'vue2-leaflet'
import InfoCard from 'vue-info-card'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.scss'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
Vue.use(VueTabs)
Vue.component('info-card', InfoCard)
Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)

// import './lib/vue-grid-layout'
const Defiant = require('./lib/defiant')
console.log(Defiant)

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
