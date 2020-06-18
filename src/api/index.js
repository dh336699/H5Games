import Util from '@/libs/util'
// import config from '@/config'
// import { formatGetUri, formatFormData } from '@/utils'
// 获取jssdk
export const gainWx = data => Util.http.get('/jssdk/' + '?currentUrl=' + data.currentUrl, {})
// 获取token
export const getToken = data => Util.http.get('/core/getToken?code=' + data.code + '&mpid=' + data.mpid + '&appid=' + data.appid, {})
// 获取阿里oss上传token
export const upload = data => Util.http.get(`/wechat/common/oss-token`, data)
// 个人中心
export const queryBalance = data => Util.http.get('/core/queryBalance', {})

export const getLive = data => Util.http.get('rtmp://bo.syglh.com/huacheng/huacheng?auth_key=1590891727-0-0-99ded48e3cfdc77bc94cebd2713b127f', {baseURL: 'http: 123'})

export const getCommon = data => Util.http.get('/api/huacheng/common', {})

export const sendMsg = data => Util.http.post('/api/huacheng/msg', data)
// 授权
export const login = data => Util.http.post('/api/huacheng/draw', data)
// 获取中奖信息
export const getAward = data => Util.http.post('/api/huacheng/draw', data)
// 领取奖品
export const getGift = data => Util.http.post('/api/huacheng/confirm', data)
