// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import 'material-icons/iconfont/material-icons.css'
import VueCookie from 'vue-cookie'
import Toasted from 'vue-toasted'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading)
Vue.use(VueSocketio, io())
Vue.use(Vuetify)
Vue.use(Toasted)
Vue.use(VueCookie)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
