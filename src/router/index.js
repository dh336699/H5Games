import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

function getAbsolutePath () {
  let path = location.pathname
  return path.substring(0, path.lastIndexOf('/') + 1)
}

const RouterConfig = {
  mode: 'history',
  base: '/res/huacheng/index/',
  routes
}

const router = new Router(RouterConfig)

//读取cookie
const getCookie = () => {
  if (document.cookie.length > 0) {
      var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
      for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('='); // 再次切割
          // 判断查找相对应的值
          if (arr2[0] == 'wechat_user') {
            localStorage.token = decodeURIComponent(arr2[1]); // 保存到保存数据的地方
            console.log(localStorage.token)
          }
      }
  }
}

router.beforeEach((to, from, next) => {
  getCookie()
  if (!localStorage.token && to.meta.requireAuth) {
    window.location.href = 'https://api.shanghaichujie.com/huacheng/index'
  }
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
