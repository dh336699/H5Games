<template>
  <article class='Live'>
  <div style='height: 314px;'>
    <section class='Live__topWrapper'>
    <video id='container' class='video-js vjs-big-play-centered'
    width='700' height='450' controls preload='auto'></video>

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
          <p class='bg' :style="{width: activePercentBg + '%'}">{{activePercent}}%</p>
          <img class='orange' :style="{left: activePercentOrange + '%'}" src='../../common/images/orange-icon.png' alt=''>
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
  <ChatIn v-show='activeIdx === 1' />
  <PlayGame :timeDown="timeDown" v-show='activeIdx === 2' />
  <DaRenLive v-show='activeIdx === 3' />

  <section v-show='activeIdx === 4' class='Live__huaqiao'>
    <BScroll :pullup='true' @scrollToEnd='scroll()' class='Live__huaqiao-videoWrapper'>
      <div v-for='(item, idx) in list' :key='item.id' class='videoDiv' @click="play(idx)">
        <video :id="'myVideo' + idx" class='huaqiao video-js vjs-big-play-centered'>
          <source :src="item.src" type="video/mp4" />
        </video>
        <p>我曹啊</p>
      </div>
    </BScroll>
  </section>
  </article>
</template>

<script>
// import * as api from '@/api'
// import * as xx from '@/common/js/wx'
// import { transform13Time } from '@/common/js'
import ActiveInfo from '../active-info'
import ChatIn from '../chat-in'
import PlayGame from '../play-game'
import DaRenLive from '../daRen-live'
import BScroll from '../../components/bscroll'
import Timer from '../../class/timer.js'
export default {
  data () {
    return {
      player: null,
      navLists: [
        {index: 0, nav: '活动信息'},
        {index: 1, nav: '聊天互动'},
        {index: 2, nav: '精彩纷橙'},
        // {index: 3, nav: '达人直播'},
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
      timeDown: null
    }
  },
  computed: {
    activePercentBg () {
      if (this.activePercent === 100) return 86
      return (this.activePercent - 4)
    },
    activePercentOrange () {
      if (this.activePercent === 100) return 89
      else if (this.activePercent < 20.33) return 24
      return (this.activePercent)
    }
  },
  mounted () {
    this.player = videojs('container', {}, function onPlayerReady () {
      // 视频播放器初始化完毕，就会调用这个回调函数
      this.src({
        src: '//vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      })
    })
  },
  beforeDestroy () {
    this.list.map((item, i) => {
      videojs('myVideo' + i).dispose()
    })
  },
  methods: {
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
          this.showVideoList()
        })
      }
      if (this.activeIdx === 2) {
        this.countDown()
      }
    },
    showVideoList () {
      this.list.map((item, i) => {
        let play = videojs('myVideo' + i, {
           preload: 'auto',
           autoplay: false,
           controls: true
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

  &__user {
    .list(row, space-between);
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
