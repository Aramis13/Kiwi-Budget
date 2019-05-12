import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/App'
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
      component: Dashboard
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.fullPath === '/') { // eslint-disable-next-line
//   }
//   else {
//   }
// })

export default router
