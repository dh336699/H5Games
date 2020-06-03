<template>
  <article class="PlayGame">
    <section class="PlayGame__play">
      <img class="PlayGame__play-bg" src="../../common/images/play-games.png" alt="">
      <img class="PlayGame__play-btn" src="../../common/images/play-games-btn.png" alt="">
      <button @click="play">倒计时{{timeDown}}</button>
    </section>
  </article>
</template>

<script>
// import * as api from '@/api'
// import * as xx from '@/common/js/wx'
// import { transform13Time } from '@/common/js'
export default {
  data () {
    return {

    }
  },
  props: {
    timeDown: {
      type: String
    }
  },
  methods: {
    play () {
      console.log('开始')
    }
  },
  components: {

  }
}
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';
.PlayGame {
  background: #F5F9FA;
  position: absolute;
  top: 8.48rem /* 318/37.5 */;
  left: 0;
  right: 0;
  &__play {
    padding: .16rem /* 6/37.5 */ .8267rem /* 31/37.5 */ 0 .56rem /* 21/37.5 */;
    &-bg {
      width: 100%;
    }
    &-btn {
      position: absolute;
      bottom: 10px;
      left: 139px;
      width: 120px;
    }
    button {
      position: absolute;
      bottom: 10px;
      left: 139px;
      width: 120px;
      height: 50px;
      background: transparent;
      font-size: 12px;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
