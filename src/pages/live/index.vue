<template>
  <article class='Live'>
  <div style='height: 314px; needsclick'>
    <section class='Live__topWrapper'>
    <div id='container' class='needsclick video-js vjs-big-play-centered'
    width='700' height='450' preload='auto'>
      <source src="http://bo2.syglh.com/live/huacheng.m3u8" class="needsclick" type="rtmp/flv">
      <div style="width: 100%;height: 52px;position: absolute;z-index: 10">
        <vue-baberrage
          ref="baber"
          :isShow="true"
          :barrageList="barrageLists" />
      </div>
    </div>
    <div class="Live__liveNum" v-show="commonData.people">
      <img class="Live__liveNum-userNum" src="../../common/images/user-num.png" /> {{commonData.people / 10000}}万
    </div>
    <div class="Live__danmu" @click="showDanMu = !showDanMu">
      <img class="Live__danmu-danmu" v-if="!showDanMu" src="../../common/images/close-danmu.png">
      <img class="Live__danmu-danmu" v-else src="../../common/images/open-danmu.png">
    </div>
    <div class='Live__user'>
      <div class='Live__user-left'>
        <img class='avatar' src='../../common/images/avatar@2x.png'/>
        <div class='title'>
          <p>华侨城</p>
          <span>美好如期 欢乐同行</span>
        </div>
      </div>
      <div class='Live__user-right'>
        <div class='slide-bar'>
          <img class='orange-bg' src='../../common/images/orange-bg.png' alt=''>
          <p class='bg' :style="{width: activePercentBg + '%'}">{{commonData.energy}}%</p>
          <transition-group name="fade">
            <img key="1" src='../../common/images/orange-icon.png' v-if="showMovedOrange" class='orange movedLogo'
            :style="{left: (activePercentOrange + 3) + '%', top: '-43px'}" />
            <!-- <img key="2" src='../../common/images/avatar@2x.png' v-if="showMovedLogo" class='orange movedLogo'
            :style="{left: (activePercentOrange + 3) + '%', top: '-43px'}" /> -->
          </transition-group>
          <img class='orange'
          @click="toggleOrange()"
          :class="{'active-orange': isActiveOrange}"
          :style="{left: activePercentOrange + '%'}" src='../../common/images/orange-icon.png' alt=''>
        </div>
        <img class="open-activity" src="../../common/images/open-activity.png" />
      </div>
    </div>

    <div class='Live__navs'>
      <ul class='Live__navs-nav'>
        <li v-for='(item, index) in navLists' :key='index'
        @click='changeActive(item.index)'
        :class="{'active': activeIdx === item.index}">
          {{item.nav}}
        </li>
      </ul>
    </div>
  </section>
  </div>
  <ActiveInfo v-if='activeIdx === 0' />
  <ChatIn ref="ChatIn" :showDanMu="showDanMu" :data.sync="commonData.top" v-else-if='activeIdx === 1' />
  <PlayGame v-else-if='activeIdx === 2' />
  <DaRenLive :data="commonData.live" v-else-if='activeIdx === 3' />

  <section v-show='activeIdx === 4' class='Live__huaqiao needsclick'>
    <BScroll :pullup='true' v-if="commonData.city" :data="commonData.city" @scrollToEnd='scroll()' class='needsclick Live__huaqiao-videoWrapper'>
      <div v-for='(item, idx) in commonData.city' :key='item.id' class='videoDiv' @click="play(idx)">
        <video :id="'myVideo' + idx" playsinline
        class='needsclick huaqiao video-js vjs-big-play-centered'>
          <source :src="item.url" class="needsclick" type="video/mp4" />
        </video>
        <p class="title">{{item.title}}</p>
      </div>
    </BScroll>
  </section>
  </article>
</template>

<script>
import * as api from '@/api'
// import * as xx from '@/common/js/wx'
// import { transform13Time } from '@/common/js'
import ActiveInfo from '../active-info'
import ChatIn from '../chat-in'
import PlayGame from '../play-game'
import DaRenLive from '../daRen-live'
import BScroll from '../../components/bscroll'
import { MESSAGE_TYPE } from 'vue-baberrage'

export default {
  data () {
    return {
      showDanMu: false,
      showMovedOrange: false,
      showMovedLogo: false,
      barrageLists: [],
      currentId: 0,
      player: null,
      navLists: [
        {index: 0, nav: '活动信息'},
        {index: 1, nav: '聊天互动'},
        {index: 2, nav: '精彩纷橙'},
        {index: 3, nav: '达人直播'},
        {index: 4, nav: '精彩华侨城'}
      ],
      activeIdx: 0,
      activePercent: 20,
      huaqiaoArr: [],
      list: [
        {
          src: '//vjs.zencdn.net/v/oceans.mp4',
          id: 0,
          pic: ''
        },
        {
          src: '//vjs.zencdn.net/v/oceans.mp4',
          id: 1,
          pic: ''
        },
        {
          src: 'http://img.yopoo.cn/banner_video.mp4',
          id: 2,
          pic: ''
        }
      ],
      timer: null,
      commonData: {},
      isActiveOrange: true,
      dataBarrage: [{
        value: 'speed设为0为非滚动',
        time: 1, // 单位秒
        speed: 0
      }, {
        value: 'time控制弹幕时间，单位秒',
        color: 'blue',
        time: 2
      }, {
        value: '视频共21秒',
        time: 3.2
      }],
      movedOrangeTimes: 0
    }
  },
  computed: {
    activePercentBg () {
      if (Number(this.commonData.energy) === 100) return 86
      return (Number(this.commonData.energy) - 4)
    },
    activePercentOrange () {
      if (Number(this.commonData.energy) === 100) return 89
      else if (Number(this.commonData.energy) < 20.33) return 24
      return (Number(this.commonData.energy))
    }
  },
  mounted () {
    this.getCommon()
    this._initVideo()
    this._getDanMu()
  },
  beforeDestroy () {
    this.list.map((item, i) => {
      videojs('myVideo' + i).dispose()
    })
  },
  methods: {
    addToList () {
      this.barrageList.push({
        id: ++this.currentId,
        avatar: '',
        msg: this.msg,
        time: 5,
        type: MESSAGE_TYPE.NORMAL
      })
    },
    toggleOrange () {
      if (this.showMovedOrange || this.showMovedLogo) return
      // this.movedOrangeTimes++
      if (this.movedOrangeTimes % 2 !== 1) {
        this.showMovedOrange = true
        setTimeout(() => {
          this.showMovedOrange = false
        }, 1000)
      } else {
        this.showMovedLogo = true
        setTimeout(() => {
          this.showMovedLogo = false
        }, 1000)
      }
      // this.showMovedOrange = true
      // setTimeout(() => {
      //   this.showMovedOrange = false
      // }, 1000)
    },
    toogle () {
      console.log(this.player)
      this.player.togglePlay()
    },
    async getCommon () {
      this.commonData = await api.getCommon()
      this.commonData.city = [...this.commonData.city]
      this.commonData.live = [...this.commonData.live]
      console.log(this.commonData)
    },
    changeActive (index) {
      this.activeIdx = index
      if (this.activeIdx === 4) {
        // this.$nextTick(() => {
          this.commonData.city.length && this.showVideoList()
        // })
      }
    },
    showVideoList () {
      this.commonData.city.map((item, i) => {
        let play = videojs('myVideo' + i, {
           controls: true,
           preload: true,
           poster: 'https://h5-touch.oss-cn-shanghai.aliyuncs.com/images/%E7%9B%B4%E6%92%AD%E5%BE%85%E6%9C%BA%E9%A1%B5%E9%9D%A2.png',
           controlBar: {
            playToggle: true, // 是否展示播放按钮
            remainingTimeDisplay: true, // 是否显示剩余时间
            progressControl: false, // 是否显示进度条
            volumeMenuButton: false // 是否显示音量按钮
          }
        })
        this.huaqiaoArr.push(play)
        // 处理fastclick和videojs的点击两次暂停问题
        let btnList = document.querySelectorAll('.vjs-control')
        btnList.forEach(item => {
          item.classList.add('needsclick')
        })
      })
    },
    play (idx) {
      console.log(this.huaqiaoArr[idx])
      this.player.pause()
      this.huaqiaoArr.forEach((player, index) => {
        idx === index && player.play()
        idx !== index && player.pause()
      })
    },
    scroll () {
      console.log(111)
    },
    _getDanMu () {
      console.log('进入')
      let socket = io('http://api.shanghaichujie.com:3000')
      socket.on('huacheng', (data) => {
        console.log(data, '!!!!!!!')
        if (this.showDanMu) { // 控制是否显示弹幕
          this.barrageLists.push({
            id: ++this.currentId,
            avatar: data.avatar,
            msg: data.content,
            time: 5,
            type: MESSAGE_TYPE.NORMAL
          })
        }
        this.commonData.top.push({
          avatar: data.avatar,
          msg: data.content,
          nickname: data.nickname
        })
          // this.$refs.ChatIn.scroll()
        console.log(this.barrageLists)
      })
    },
    _initVideo () {
      var options = {
        'm3u8': 'http://bo2.syglh.com/live/huacheng.m3u8', // ps请替换成实际可用的播放地址
        // 'autoplay': true, // iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        // mp4: '//1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f30.mp4',
        // controls: 'system',
        coverpic: {
          style: 'cover',
          src: 'https://h5-touch.oss-cn-shanghai.aliyuncs.com/images/%E7%9B%B4%E6%92%AD%E5%BE%85%E6%9C%BA%E9%A1%B5%E9%9D%A2.png'
        },
        autoplay: true,
        live: true,
        width: '100%',
        height: '212',
        wording: {
          2032: '请求视频失败，请检查网络',
          2048: '请求m3u8文件失败，可能是网络错误或者跨域问题',
          13: '直播已经结束，请稍后再来'
        },
        listener: (msg) => {
          if (msg.type === 'error') {
            console.log(msg)
          }
        }
      }
      this.player = new TcPlayer('container', options)
    }
  },
  components: {
    ActiveInfo, ChatIn, PlayGame, DaRenLive, BScroll
  }
}
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';

.Live {
  position: relative;
  height: 100vh;
  font-size: 0;
  background: #F5F9FA;
  ::-webkit-scrollbar {
    width: 0px;
    display: none;/*隐藏滚轮*/
  }

  .video-js {
    width: 100vw;
    height: 212px;
  }

  .video-js .vjs-big-play-button{
    font-size: 2.5em;
    line-height: 2.3em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(115,133,159,.5);
    border-width: 0.15em;
    margin-top: -1.25em;
    margin-left: -1.75em;
  }
  /* 中间的播放箭头 */
  .vjs-big-play-button .vjs-icon-placeholder {
      font-size: 1.63em;
  }
  /* 加载圆圈 */
  .vjs-loading-spinner {
      font-size: 2.5em;
      width: 2em;
      height: 2em;
      border-radius: 1em;
      margin-top: -1em;
      margin-left: -1.5em;
  }

  &__topWrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }

  &__liveNum {
    position: absolute;
    top: 190px;
    right: 32px;
    color: white;
    z-index: 3;
    font-size: 10px;
    .list(row, flex-start, center);
    &-userNum {
      margin-right: 6px;
      width: .32rem /* 12/37.5 */;
    }
  }

  &__danmu {
    position: absolute;
    top: 185px;
    right: 90px;
    color: white;
    z-index: 3;
    &-danmu {
      width: 26px;
      height: 24px;
    }
  }

  &__user {
    .list(row, space-between, center);
    padding: .3333rem /* 12.5/37.5 */ 0.6267rem /* 23.5/37.5 */ .16rem /* 6/37.5 */ .4667rem /* 17.5/37.5 */;
    background: white;
    &-left {
      flex: 1;
      width: 50%;
      border-right: .0533rem /* 2/37.5 */ solid rgb(253, 134, 10);
      .list(row, flex-start, center);
      .avatar {
        flex: 0 0 1.12rem /* 42/37.5 */;
        margin-right: .16rem /* 6/37.5 */;
        width: 1.12rem /* 42/37.5 */;
        height: 1.12rem /* 42/37.5 */;
      }

      .title {
        padding-top: .16rem /* 6/37.5 */;
        p {
          margin-bottom: .1067rem /* 4/37.5 */;
          line-height: .3733rem /* 14/37.5 */;
          font-size: .4267rem /* 16/37.5 */;
          font-weight: bold;
          color: #0068b6;
        }

        span {
          font-size: .32rem /* 12/37.5 */;
          color: rgb(171, 171, 171);
          font-weight: 500;
          color: #f6764f;
        }
      }
    }
    &-right {
      position: relative;
      padding-left: .52rem /* 19.5/37.5 */;
      flex: 1;
      width: 50%;
      .list(column, flex-start, center);
      .slide-bar {
        padding: 0 .0533rem /* 2/37.5 */ .0533rem /* 2/37.5 */;
        border: 1px solid rgb(253, 98, 69);
        border-radius: .7467rem /* 28/37.5 */;
        .orange-bg {
          width: 4.04rem /* 151.5/37.5 */;
        }
        .bg {
          position: absolute;
          top: .0667rem /* 2.5/37.5 */;
          /* left: 2.5px; */
          border-radius: .6267rem /* 23.5/37.5 */;
          min-width: 20.33%;
          height: .6267rem /* 23.5/37.5 */;
          background: #fd6043;
          display: flex;
          align-items: center;
          padding-left: .1067rem /* 4/37.5 */;
          color: white;
          font-size: .4rem /* 15/37.5 */;
        }
        .fade-enter, .fade-leave-to{
          opacity: 0;
        }
        .fade-enter-active, .fade-leave-active{
          transition: opacity 1s;
        }
        .orange {
          position: absolute;
          top: 0;
          left: 26%;
          top: -4px;
          height: 1.0133rem /* 38/37.5 */;
        }
        .movedOrange, .movedLogo {
          animation-name: moveLogoAnimation;
          transform-origin: center bottom;
          animation-duration: 1s;
          animation-fill-mode: both;
          animation-iteration-count: 1;
          animation-delay: 0s;
          height: .7467rem /* 28/37.5 */;
        }
        .movedLogo {
          animation-name: moveLogoAnimation
        }
        @keyframes moveAnimation {
          0% {
              top: -20px;
          }
          10% {
              top:-28px;
          }
          20% {
              top:-36px;
          }
          30% {
              top:-44px;
          }
          40% {
              top:-52px;
              // transform: rotate(12deg);
          }
          50% {
              top:-60px;
              // transform: rotate(24deg);
          }
          60% {
              top:-68px;
              // transform: rotate(12deg);
          }
          70% {
              top:-76px;
              // transform: rotate(0deg);
          }
          80% {
              top:-84px;
              // transform: rotate(-12deg);
          }
          90% {
              top:-92px;
              // transform: rotate(-24deg);
          }
          100% {
              top:-100px;
              // transform: rotate(-12deg);
          }
        }

        @keyframes moveLogoAnimation {
          0% {
              top: -20px;
              // transform: rotate(-12deg);
          }
          10% {
              top:-28px;
              // transform: rotate(-12deg);
          }
          20% {
              top:-36px;
              // transform: rotate(-24deg);
          }
          30% {
              top:-44px;
              // transform: rotate(-12deg);
          }
          40% {
              top:-52px;
              // transform: rotate(12deg);
          }
          50% {
              top:-60px;
              // transform: rotate(24deg);
          }
          60% {
              top:-68px;
              // transform: rotate(12deg);
          }
          70% {
              top:-76px;
              // transform: rotate(0deg);
          }
          80% {
              top:-84px;
              // transform: rotate(-12deg);
          }
          90% {
              top:-88px;
              // transform: rotate(-24deg);
          }
          100% {
              top:-92px;
              // transform: rotate(-12deg);
          }
        }
        .active-orange {
          animation-name: upAnimation;
          transform-origin: center bottom;
          animation-duration: 2s;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
          animation-delay: .5s;
        }
        @keyframes upAnimation {
        0% {
            transform: rotate(0deg);
            transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
        }

        10% {
            transform: rotate(-12deg);
            transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
        }

        20% {
            transform: rotate(12deg);
            transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
        }

        28% {
            transform: rotate(-10deg);
            transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
        }

        36% {
            transform: rotate(10deg);
            transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
        }

        42% {
            transform: rotate(-8deg);
            transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
        }

        48% {
            transform: rotate(8deg);
            transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
        }

        52% {
            transform: rotate(-4deg);
            transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
        }

        56% {
            transform: rotate(4deg);
            transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
        }

        60% {
            transform: rotate(0deg);
            transition-timing-function: cubic-bezier(0.755, .5, .855, .06)
        }

        100% {
            transform: rotate(0deg);
            transition-timing-function: cubic-bezier(0.215, .61, .355, 1)
        }
        }
      }
      .open-activity {
        margin-top: .2133rem /* 8/37.5 */;
        height: .3733rem /* 14/37.5 */;
      }
    }
  }

  &__navs {
    padding: .1067rem /* 4/37.5 */ .44rem /* 16.5/37.5 */ .2133rem /* 8/37.5 */ .4667rem /* 17.5/37.5 */;
    background: white;
    &-nav {
      .list(row, space-between, center);
      li {
        font-size: .3733rem /* 14/37.5 */;
        color: rgb(253, 178, 123);
        &.active {
          font-size: 18px;
          color: rgb(41, 110, 173);
          // border-bottom: 2px solid rgb(41, 110, 173);
        }
      }
    }
  }

  &__huaqiao {
    margin-top: .5333rem /* 20/37.5 */;
    padding: .3067rem /* 11.5/37.5 */ .5733rem /* 21.5/37.5 */;
    &-videoWrapper {
      .list(row, flex-start, center);
      flex-wrap: wrap;
      .videoDiv {
        margin-bottom: .2933rem /* 11/37.5 */;
        .huaqiao {
          width: 4.0533rem /* 152/37.5 */;
          height: 2.3867rem /* 89.5/37.5 */;
          border-radius: .32rem /* 12/37.5 */;

          video {
            border-radius: 0.32rem !important;
            width: 100% !important;
            height: 100% !important;
          }

          .vjs-big-play-button{
            font-size: 1.5em!important;
          }
        }
        .vjs-paused .vjs-big-play-button, .vjs-paused.vjs-has-started .vjs-big-play-button { display: block; }
        p {
          margin-top: .1333rem /* 5/37.5 */;
          font-size: .2667rem /* 10/37.5 */;
          font-weight: 500;
        }
      }
      .videoDiv:nth-of-type(2n) {
        margin-left: .7333rem /* 27.5/37.5 */;
      }
      .title {
        font-size: 15px;
        font-weight: 500;
        margin-top: 5px;
      }
    }
  }
}
</style>
