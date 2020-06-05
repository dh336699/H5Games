import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const RouterConfig = {
  mode: 'history',
  routes
}

const router = new Router(RouterConfig)

router.beforeEach((to, from, next) => {
  let token = document.cookie.wechat_user
  console.log(token)
  // if (!token) {
  //   // next({
  //   //   path: '/getToken',
  //   //   query: {redirect: to.fullPath}
  //   // })
  //   window.location.href = 'https://api.shanghaichujie.com/huacheng/index'
  // }
  next()
})
//
router.afterEach((to, from, next) => {
  // if (to.meta && to.meta.title) {
  //   setTitle(to.meta.title)
  // }
  // next()
})

export default router
