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
import io from 'socket.io-client'
// import VueSocketIO from 'vue-socket.io'

// let connectionStr = window.location.hostname
// if (connectionStr === 'localhost') {
//   connectionStr = window.location.origin
// }
Vue.use(io(window.location.origin))
Vue.use(Vuetify)
// Vue.use(new VueSocketIO({
//   connection: 'http://localhost:8080'
// }))
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
