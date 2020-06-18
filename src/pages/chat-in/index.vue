<template>
  <article class="Chat">
    <div :click="false" ref="BScroll" :scrollToEndFlag="true" v-if="data" :data="data" class="Chat__Bscroll">
      <ul class="Chat__list" style="overflow: auto">
        <li class="Chat__list-li" v-for="(item, index) in data" :key="index">
          <img v-lazy="item.avatar" class="avatar" alt="">
          <div class="info">
            <div class="info-title">
              <p>{{item.nickname}} </p>
              <img src="../../common/images/offical.png" v-show="item.is_official" alt="">
              <img src="../../common/images/ding.png" alt="">
            </div>
            <p class="info-desc">{{item.msg}}</p>
          </div>
        </li>
        <div id="empty-box"></div>
      </ul>
    </div>
    <section class="Chat__sendMsgWrapper">
      <transition name="fade">
        <Emoji @getEmoji="getEmoji" v-show="isShowEmoji" />
      </transition>
      <div class="Chat__sendMsgWrapper-sendMsg">
        <img class="Chat__sendMsgWrapper-sendMsg-emoji" @click="isShowEmoji = !isShowEmoji" src="../../common/images/emoji.png" alt="">
        <input type="text" class="Chat__sendMsgWrapper-sendMsg-input" v-model="msg" placeholder="我也来聊几句...">
        <button class="Chat__sendMsgWrapper-sendMsg-btn" @click="sendMsg()">发送</button>
      </div>
      </section>
  </article>
</template>

<script>
import * as api from '@/api'
// import * as xx from '@/common/js/wx'
// import { transform13Time } from '@/common/js'
import BScroll from '../../components/bscroll'
import Emoji from '../../components/emoji'
export default {
  data () {
    return {
      msg: '',
      checked: false,
      isShowEmoji: false,
      emptyDom: null
    }
  },
  props: {
    data: {
      type: Array
    },
    showDanMu: {
      type: Boolean
    }
  },
  mounted () {
    this.emptyDom = document.querySelector('#empty-box')
    this.emptyDom && this.emptyDom.scrollIntoView()
  },
  methods: {
    getEmoji (it) {
      this.msg += it.value
    },
    async sendMsg () {
      // this.data.push(this.msg)
      let token = JSON.parse(localStorage.token)
      if (!this.msg) return
      if (token.enabled == 1) {
        this.$vux.toast.show({
          text: '当前禁止发弹幕',
          type: 'text',
          position: 'middle'
        })
        return
      }
      await api.sendMsg({openid: token.openid ? token.openid : 'o1RgAsxDHW_fGXfehpSsjgo0LXvo', content: this.msg})
      this.msg = ''
      this.isShowEmoji = false
      this.emptyDom.scrollIntoView({behavior: 'smooth'})
    }
  },
  components: {
    BScroll, Emoji
  }
}
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';
.Chat {
  position: absolute;
  top: 8.48rem /* 318/37.5 */;
  left: 0;
  right: 0;
  padding-bottom: .96rem /* 36/37.5 */;
  background: #F5F9FA;

  &__Bscroll {
    height: 8.3733rem /* 314/37.5 */;
  }

  &__list {
    padding: .4rem /* 15/37.5 */ .3067rem /* 11.5/37.5 */ 1.3333rem /* 50/37.5 */;
    background: #F5F9FA;
    &-li {
      .list(row, flex-start);
      margin-bottom: .5333rem /* 20/37.5 */;
      padding: .2667rem /* 10/37.5 */ .44rem /* 16.5/37.5 */;
      background: white;
      border: .2667rem /* 10/37.5 */;
      border-radius: .1067rem /* 4/37.5 */;
      .avatar {
        .imgs(1.12rem /* 42/37.5 */, 1.12rem /* 42/37.5 */);
        flex: 0 0 1.12rem /* 42/37.5 */;
        margin-right: .5333rem /* 20/37.5 */;
        border-radius: 50%;
      }
      .info {
        &-title {
          .list(row, flex-start, center);
          margin-bottom: .0533rem /* 2/37.5 */;
          p:first-of-type {
            flex: 0 0 1.2rem /* 45/37.5 */;
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
          line-height: 1.3;
        }
      }
    }
    &-li:last-of-type {
      margin-bottom: 0;
    }
  }
  &__sendMsgWrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;

    .fade-enter {
      opacity: 0;
    }

    .fade-enter-active {
      opactiy: 0;
      transition: all 1s ease;
    }

    .fade-enter-to {
      opacity: 1;
    }
    .fade-leave-active {
      transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .fade-leave-to {
      opacity: 0;
    }
    &-sendMsg {
      .list(row, flex-end, center);
      padding: .16rem /* 6/37.5 */;
      background: white;
      &-emoji {
        margin-right: .36rem /* 13.5/37.5 */;
        width: .64rem /* 24/37.5 */;
      }
      &-input {
        margin-right: .2133rem /* 8/37.5 */;
        padding-left: .16rem /* 6/37.5 */;
        width: 7.0533rem /* 264.5/37.5 */;
        height: .6933rem /* 26/37.5 */;
        border: .0533rem /* 2/37.5 */ solid rgb(219, 219, 219);
        border-radius: .2133rem /* 8/37.5 */;
        font-size: 10px;
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
}
</style>
