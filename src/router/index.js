import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: App
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/') { // eslint-disable-next-line
  }
  else {
  }
})

export default router
