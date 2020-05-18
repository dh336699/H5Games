<template>
  <article class="Live">
    <!-- <video
      id="my-player"
      class="npm run  vjs-big-play-centered"
      controls
      preload="auto"
      poster="//vjs.zencdn.net/v/oceans.png"
      data-setup='{}'>
    <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
    <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm" />
    <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg" />
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank">
        supports HTML5 video
      </a>
    </p>
</video> -->

  <div style="height: 314px;">
    <section class="Live__topWrapper">
    <video id="container" class="video-js vjs-big-play-centered"
    width="700" height="450" controls preload="auto"></video>

    <div class="Live__user">
      <div class="Live__user-left">
        <img class="avatar" src="../../common/images/avatar@2x.png"/>
        <div class="title">
          <p>华侨城</p>
          <span>美好如期 欢乐同行</span>
        </div>
      </div>
    </div>

    <div class="Live__navs">
      <ul class="Live__navs-nav">
        <li v-for="(item, index) in navLists" :key="index"
        @click="activeIdx = index"
        :class="{'active': activeIdx === item.index}">
          {{item.nav}}
        </li>
      </ul>
    </div>
  </section>
  </div>

  <ActiveInfo v-if="activeIdx === 0" />
  <ChatIn v-else-if="activeIdx === 1" />
  <PlayGame v-else-if="activeIdx === 2" />
  </article>
</template>

<script>
// import * as api from '@/api'
// import * as xx from '@/common/js/wx'
// import { transform13Time } from '@/common/js'
import ActiveInfo from '../active-info'
import ChatIn from '../chat-in'
import PlayGame from '../play-game'
export default {
  data () {
    return {
      player: null,
      navLists: [
        {index: 0, nav: '活动信息'},
        {index: 1, nav: '聊天互动'},
        {index: 2, nav: '精彩纷橙'},
        {index: 3, nav: '达人直播'},
        {index: 4, nav: '精彩华侨城'}
      ],
      activeIdx: 1
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
  methods: {
  },
  components: {
    ActiveInfo, ChatIn, PlayGame
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
    .list(column, space-between);
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
}
</style>
