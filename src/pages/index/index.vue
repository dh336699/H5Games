<template>
  <article class="Index">
    <section class="Index__countDown" @click="toLive">
      <span>跳过 {{time}}</span>
    </section>
  </article>
</template>

<script>
  export default {
    data () {
      return {
        startTime: '',
        timer: null,
        timePush: null,
        time: 5
      }
    },
    mounted () {
      this.timer = setInterval(() => this.countDown(), 1000)
      this._listen()
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
          console.log(1)
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
  position: relative;
  height: 100vh;
  background: url(../../common/images/index.png);
  background-size: 100% 100%;
  font-size: 0;

  &__countDown {
    position: absolute;
    top: .68rem /* 25.5/37.5 */;
    right: .44rem /* 16.5/37.5 */;
    z-index: 1;
    .list(column, center, center);
    width: 1.8533rem /* 69.5/37.5 */;
    height: .7467rem /* 28/37.5 */;
    background: rgb(52, 52, 52);
    border-radius: .3733rem /* 14/37.5 */;

    span {
      font-size: 14px;
      color: white;
    }
  }
}
</style>
