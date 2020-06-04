<template>
  <article class='Live'>
  <div style='height: 314px; needsclick'>
    <section class='Live__topWrapper'>
    <!-- <canvas id="liveCanvas" class="Live__canvas"/> -->
    <!-- <video id='container' class="Live__canvas" style="z-index: 0" src=" video-js vjs-big-play-centered"></video> -->
    <div id='container' class='needsclick video-js vjs-big-play-centered'
    width='700' height='450' preload='auto'>
      <source src="http://bo2.syglh.com/live/huacheng.m3u8" class="needsclick" type="rtmp/flv">
      <div style="width: 100%;height: 212px;position: absolute;z-index: 10">
        <vue-baberrage
          ref="baber"
          :isShow="true"
          :barrageList="barrageLists" />
      </div>
    </div>
    <div class="Live__liveNum" v-show="commonData.people">
      当前人数: {{commonData.people / 10000}}万
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
          <img class='orange'
          :class="{'active-orange': isActiveOrange}"
          @click="toggleOrange()"
          :style="{left: activePercentOrange + '%'}" src='../../common/images/orange-icon.png' alt=''>
        </div>
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
  <ActiveInfo v-show='activeIdx === 0' />
  <ChatIn :data.sync="commonData.top" v-show='activeIdx === 1' />
  <PlayGame :timeDown="timeDown" v-show='activeIdx === 2' />
  <DaRenLive :data="commonData.live" v-show='activeIdx === 3' />

  <section v-show='activeIdx === 4' class='Live__huaqiao'>
    <BScroll :pullup='true' v-if="commonData.city" :data="commonData.city" @scrollToEnd='scroll()' class='Live__huaqiao-videoWrapper'>
      <div v-for='(item, idx) in commonData.city' :key='item.id' class='videoDiv' @click="play(idx)">
        <video :id="'myVideo' + idx" class='needsclick huaqiao video-js vjs-big-play-centered'>
          <source :src="item.url" type="video/mp4" />
        </video>
        <p>我曹啊</p>
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
import Timer from '../../class/timer.js'
import { MESSAGE_TYPE } from 'vue-baberrage'

export default {
  data () {
    return {
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
      timeStamp: 1590566435000,
      timeDown: null,
      commonData: {},
      isActiveOrange: false,
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
      }]
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
    this.getLive()
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
      if (this.isActiveOrange) return
      this.isActiveOrange = true
      setTimeout(() => {
        this.isActiveOrange = false
      }, 2000)
    },
    toogle () {
      console.log(this.player)
      this.player.togglePlay()
    },
    getLive () {
      // api.getLive()
    },
    async getCommon () {
      this.commonData = await api.getCommon()
      console.log(this.commonData)
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
    },
    changeActive (index) {
      this.activeIdx = index
      if (this.activeIdx === 4) {
        this.$nextTick(() => {
          this.commonData.city.length && this.showVideoList()
        })
      }
      if (this.activeIdx === 2) {
        this.countDown()
      }
    },
    showVideoList () {
      this.commonData.city.map((item, i) => {
        let play = videojs('myVideo' + i, {
           controls: true,
           controlBar: {
            playToggle: true,
            remainingTimeDisplay: false,
            progressControl: false
          }
        })
        this.huaqiaoArr.push(play)
      })
    },
    play (idx) {
      console.log(this.huaqiaoArr[idx])
      // this.player.pause()
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
        this.barrageLists.push({
          id: ++this.currentId,
          avatar: data.avatar,
          msg: data.content,
          time: 5,
          type: MESSAGE_TYPE.NORMAL
        })
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
    height: 5.6533rem /* 212/37.5 */;
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

  &__canvas {
    position: absolute;
    width: 640px;
    height: 212px;
    pointer-events: none;
    z-index: 1;
  }

  &__liveNum {
    position: absolute;
    top: 4.9867rem /* 187/37.5 */;
    right: .8533rem /* 32/37.5 */;
    color: white;
    z-index: 3;
    font-size: 10px;
  }

  &__user {
    .list(row, space-between, center);
    padding: .3333rem /* 12.5/37.5 */ 0.6267rem /* 23.5/37.5 */ .3333rem /* 12.5/37.5 */ .4667rem /* 17.5/37.5 */;
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
        }

        span {
          font-size: .32rem /* 12/37.5 */;
          color: rgb(171, 171, 171);
          font-weight: 500;
        }
      }
    }
    &-right {
      position: relative;
      padding-left: .52rem /* 19.5/37.5 */;
      flex: 1;
      width: 50%;
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
        .orange {
          position: absolute;
          top: 0;
          left: 26%;
          top: -4px;
          height: 1.0133rem /* 38/37.5 */;
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
          font-size: .4267rem /* 16/37.5 */;
          color: rgb(41, 110, 173);
          border-bottom: 2px solid rgb(41, 110, 173);
        }
      }
    }
  }

  &__huaqiao {
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

          .vjs-big-play-button{
            font-size: 1.5em!important;
          }
        }
        p {
          margin-top: .1333rem /* 5/37.5 */;
          font-size: .2667rem /* 10/37.5 */;
          font-weight: 500;
        }
      }
      .videoDiv:nth-of-type(2n) {
        margin-left: .7333rem /* 27.5/37.5 */;
      }
    }
  }
}
</style>
