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

    <section class="Chat__sendMsg">
      <img class="Chat__sendMsg-emoji" src="../../common/images/emoji.png" alt="">
      <input type="text" class="Chat__sendMsg-input" placeholder="我也来聊几句...">
      <button class="Chat__sendMsg-btn">发送</button>
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
      margin-bottom: .1733rem /* 6.5/37.5 */;
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
    &-li:last-of-type {
      margin-bottom: 0;
    }
  }

  &__sendMsg {
    .list(row, flex-start, center);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: .16rem /* 6/37.5 */;
    background: white;
    &-emoji {
      margin-right: .36rem /* 13.5/37.5 */;
      width: .64rem /* 24/37.5 */;
    }
    &-input {
      margin-right: .2133rem /* 8/37.5 */;
      width: 7.0533rem /* 264.5/37.5 */;
      height: .6933rem /* 26/37.5 */;
      border: .0533rem /* 2/37.5 */ solid rgb(219, 219, 219);
      border-radius: .2133rem /* 8/37.5 */;
    }
    &-btn {
      width: 1.4533rem /* 54.5/37.5 */;
      height: .6933rem /* 26/37.5 */;
      background: rgb(253, 93, 67);
      color: white;
      border-radius: .2133rem /* 8/37.5 */;
    }
  }
}
</style>
