<template>
  <article>
  </article>
</template>

<script>
  import {getToken} from '@/api/index'
  import config from '@/config/index'
  export default {
    data () {
      return {
      }
    },
   mounted () {
      this.$vux.loading.show({
        text: '授权中...'
      })
      let token = document.cookie.wechat_user
      if (token) localStorage.token = token
      console.log(token)
      if (!token) {
        window.location.href = 'https://api.shanghaichujie.com/huacheng/index'
      } else this.$router.replace('/index')
    },
    methods: {
      async _getToken () {
        this.$vux.loading.show({
          text: '授权中...'
        })
        let code = this.$route.query.code
        console.log(code)
        // const datas = {code: code, mpid: config.mpid, appid: config.appid}
        // console.log(datas)
        await getToken({
          code: code, mpid: config.mpid, appid: config.appid
        }).then((res) => {
          console.log(res)
          localStorage.token = res.data.data.token
          this.$router.push('/register')
        })
      },
      _getCode () {
        localStorage.token = ''
          localStorage.removeItem('token')
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=' + config.loginUrl + '/getToken' + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      }
    },
    components: {
    }
  }
</script>

<style lang='less' scoped>
@import '../../styles/variables.less';
</style>
