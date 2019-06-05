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
import VueSocketIO from 'vue-socket.io'

let connectionStr
if (window.location.hostname === 'localhost') {
  connectionStr = window.location.origin
} else {
  connectionStr = 'http://' + window.location.hostname
}

Vue.use(Vuetify)
Vue.use(new VueSocketIO({
  debug: true,
  connection: connectionStr
}))
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
