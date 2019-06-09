import Vue from 'vue'
import Router from 'vue-router'
import VueCookie from 'vue-cookie'
import Connections from '@/components/Connections'
import Records from '@/components/Records'
import Login from '@/components/LoginVuetify'
import Statistics from '@/components/Statistics'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/records',
      name: 'records',
      component: Records,
      meta: {
        auth: true
      }
    },
    {
      path: '/connections',
      name: 'connections',
      component: Connections,
      meta: {
        auth: true
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      meta: {
        auth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let cookie = VueCookie.get('portfolioManagerToken')
  if (to.matched.some(record => record.meta.auth)) {
    if (cookie != null) next()
    else next({ name: 'login' })
  } else {
    if (cookie != null) next({ name: 'records' })
    else next()
  }
})

export default router
