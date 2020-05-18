<template>
  <article class="PlayGame">
    <section class="PlayGame__play">
      <img src="../../common/images/play-games.png" alt="">
      <button @click="play"></button>
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
  &__play {
    padding: .16rem /* 6/37.5 */ .8267rem /* 31/37.5 */ 0 .56rem /* 21/37.5 */;
    img {
      width: 100%;
    }
    button {
      position: absolute;
      bottom: 120px;
      left:130px;
      width: 120px;
      height: 50px;
      background: transparent;
    }
  }
}
</style>
