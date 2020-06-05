export default [
  {
    path: '/',
    redirect: '/index'
  }, {
    path: '/test',
    name: 'test',
    meta: {
      title: '授权',
      requireAuth: true
    },
    component: () => import('@/pages/test')
  }, {
    path: '/getToken',
    name: 'getToken',
    meta: {
      title: '授权',
      requireAuth: false
    },
    component: () => import('@/pages/getToken/getToken')
  }, {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
      requireAuth: true
    },
    component: () => import('@/pages/index')
  }, {
    path: '/live',
    name: 'live',
    meta: {
      title: '直播',
      requireAuth: true
    },
    component: () => import('@/pages/live')
  }, {
    path: '/award',
    name: 'award',
    meta: {
      title: '领奖',
      requireAuth: true
    },
    component: () => import('@/pages/award')
  }
]
