import axios from 'axios'
// import router from '@/router/index'
import config from '@/config/index'
// import  from '@/config/index'
// import * as types from '@/store/mutation-types'

let util = {

}

const BASEURL = 'https://api.shanghaichujie.com'
//  创建axiox 实例
util.http = axios.create({
  baseURL: BASEURL,
  timeout: 30000
})
// http request 拦截器
util.http.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json'
    }
    let token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
util.http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      console.log(error)
      switch (error.response.status) {
        case 401:
          localStorage.token = ''
          localStorage.removeItem('token')
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + config.loginUrl + '/getToken' + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      }
    }
    // console : Error: Request failed with status code 402
    console.log(error)
    return Promise.reject(error.response.data)
  })

export default util
