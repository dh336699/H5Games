<template>
  <article class="Chat">
    <ul class="Chat__list">
      <li class="Chat__list-li">
        <img src="../../common/images/index.png" class="avatar" alt="">
        <div class="info">
          <div class="info-title">
            <p>花橙小助手 </p>
            <img src="../../common/images/offical.png" alt="">
            <img src="../../common/images/ding.png" alt="">
          </div>
          <p class="info-desc">直播间将会不定时开启游戏抽奖直播间将会不定时开启游戏抽奖直播间将会不定时开启游戏抽奖直播间将会不定时开启游戏抽奖直播间将会不定时开启游戏抽奖</p>
        </div>
      </li>
    </ul>
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
  },
  components: {

  }
}
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';
.Chat {
  &__list {
    padding: .4rem /* 15/37.5 */ .3067rem /* 11.5/37.5 */;
    &-li {
      .list(row, flex-start);
      padding: .2667rem /* 10/37.5 */ .44rem /* 16.5/37.5 */;
      background: white;
      border: .2667rem /* 10/37.5 */;
      border-radius: .1067rem /* 4/37.5 */;
      .avatar {
        .imgs(1.12rem /* 42/37.5 */, 1.12rem /* 42/37.5 */);
        margin-right: .5333rem /* 20/37.5 */;
        border-radius: 50%;
      }
      .info {
        &-title {
          .list(row, flex-start, center);
          margin-bottom: .0533rem /* 2/37.5 */;
          p:first-of-type {
            font-size: .32rem /* 12/37.5 */;
            color: rgb(77, 139, 226);
          }
          img {
            height: .4267rem /* 16/37.5 */;
          }
          img:first-of-type {
            margin: 0 .16rem /* 6/37.5 */;
          }
        }
        &-desc {
          font-size: .2667rem /* 10/37.5 */;
        }
      }
    }
  }
}
</style>
