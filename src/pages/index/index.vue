<template>
  <article class="Index">
    <section class="Index__countDown">
      <span>{{time}}</span>
    </section>
    <img class="Index__bg" src="../../common/images/index.png">
    <img class="Index__gogogo" src="../../common/images/gogogo.png" @click="toLive">
  </article>
</template>

<script>
  export default {
    data () {
      return {
        startTime: '',
        timer: null,
        timePush: null,
        time: 3
      }
    },
    mounted () {
      this.timer = setInterval(() => this.countDown(), 1000)
      this._listen()
      console.log(document.cookie)
      if (document.cookie.wechat_user && !localStorage.userInfo) {
        localStorage.userInfo = document.cookie.wechat_user
      }
    },
    methods: {
      update (e) {
        this.endTime = e
      },
      handle (e) {
        // this._orderNumber()
      },
      toLive () {
        this.$router.push('/live')
      },
      countDown () {
        if (this.time) this.time--
        return this.time
      },
      _listen () { // 清除定时器
        this.$once('hook:beforeDestroy', () => {
          clearInterval(this.timer)
        })
      this.$once('hook:beforeDestroy', () => {
        clearTimeout(this.timePush)
      })
      }
    },
    watch: {
      time (newVal, oldVal) {
        !newVal && (this.timePush = setTimeout(() => {
          this.toLive()
        }, 1000))
      }
    },
    components: {
    }
  }
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';

.Index {
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }

  &__countDown {
    position: absolute;
    top: .68rem /* 25.5/37.5 */;
    right: .44rem /* 16.5/37.5 */;
    z-index: 1;
    .list(column, center, center);
    width: 1.0667rem /* 40/37.5 */;
    height: 1.0667rem /* 40/37.5 */;
    background: rgb(52, 52, 52);
    border-radius: 50%;
    opacity: 0.3;
    z-index: 3;

    span {
      font-size: 14px;
      color: white;
    }
  }

  &__gogogo {
    position: absolute;
    left: 50%;
    bottom: 1.3333rem /* 50/37.5 */;
    transform: translateX(-50%);
    width: 4rem /* 150/37.5 */;
    z-index: 2;
  }
}
</style>
