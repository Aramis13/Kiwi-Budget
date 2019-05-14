import Vue from 'vue'
import Router from 'vue-router'
import VueCookie from 'vue-cookie'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'

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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      props: true,
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
  } else next()
})

export default router
