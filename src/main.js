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

// content components
import Vue2Leaflet from 'vue2-leaflet'
import InfoCard from 'vue-info-card'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.scss'
import VTooltip from 'v-tooltip'
import VueYouTubeEmbed from 'vue-youtube-embed'
import VTable from './components/Table'
import VCTable from './content-components/VCTable'
import SectionLink from './components/SectionLink'
import MathJaxComponent from './components/MathJax'
import { TableComponent, TableColumn } from './content-components/vctable-component'

import {charts} from './content-components/Charts'
charts(Vue)

const Defiant = require('./lib/defiant') // eslint-disable-line

Vue.use(VTooltip)
Vue.use(VueTabs)
Vue.use(VueYouTubeEmbed)
Vue.component('sectionlink', SectionLink)
Vue.component('vtable', VTable)
Vue.component('vctable', VCTable)
Vue.component('mj', MathJaxComponent)
Vue.component('info-card', InfoCard)
Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
Vue.component('table-component', TableComponent)
Vue.component('table-column', TableColumn)

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
