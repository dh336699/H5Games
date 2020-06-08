<template>
  <article class="PlayGame">
    <section class="PlayGame__play">
      <img class="PlayGame__play-bg" src="../../common/images/play-games.png" alt="">
      <!-- <img class="PlayGame__play-btn" src="../../common/images/play-games-btn.png" alt=""> -->
      <button @click="play">开始游戏<span v-show="timeDown !== '00:00'">{{timeDown}}</span></button>
    </section>
  </article>
</template>

<script>
// import * as api from '@/api'
// import * as xx from '@/common/js/wx'
// import { transform13Time } from '@/common/js'
import Timer from '../../class/timer.js'
import * as moment from 'moment'
export default {
  data () {
    return {
      timeStamp: '',
      timeDown: ''
    }
  },
  mounted () {
    this._initTimeDown()
  },
  methods: {
    _initTimeDown () {
      if (localStorage.userInfo) {
        this.timeStamp = localStorage.userInfo.draw_last + (10 * 60 * 1000)
        let now = moment().format('x')
        if (this.timeStamp < now) this.countDown()
        else this.timeDown = '00:00'
      } else this.timeDown = '00:00'
    },
    play () {
      console.log('开始游戏')
      if (this.timeDown !== '00:00') return
      window.location.href = 'http://api.shanghaichujie.com/res/huacheng/game/index.html'
    },
    updateToZero (val) {
      this.timeDown = val
      console.log('ending' + val)
    },
    updateTimeDown (val) {
      this.timeDown = val
      console.log('waining' + val)
    },
    countDown () {
      let timer = new Timer()
      timer.countDown(this.timeStamp, this.updateTimeDown, this.updateToZero)
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
    position: relative;
    // padding: .16rem /* 6/37.5 */ .8267rem /* 31/37.5 */ 0 .56rem /* 21/37.5 */;
    &-bg {
      width: 90%;
      margin-left: 5%;
    }
    // &-btn {
    //   position: absolute;
    //   bottom: 10px;
    //   left: 139px;
    //   width: 120px;
    // }
    button {
      position: absolute;
      bottom: 10px;
      left: 50%;
      width: 120px;
      height: 35px;
      margin-left: -43px;
      font-size: 14px;
      line-height: 35px;
      border-radius: 20px;
      color: #ffffff;
      font-weight: bold;
      text-align: center; 
      background:  linear-gradient(to right, rgba(248, 59, 61, 255), rgba(251, 132, 82, 255));
    }
  }
}
</style>
