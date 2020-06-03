<template>
  <div id="app">
    <router-view class="slideInRight" />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  html {
    height: 100%;
    -webkit-overflow-scrolling: touch;
    touch-action: none;
    body {
      // 解决移动端modal滚动击穿
      height: 100%;
      &.dialog-open {
        position: fixed;
        width: 100%;
      }
    }
    #app {
      min-height: 100%;
      background: #F3EEEB;
      .vcp-controls-panel {
        font-size: 10px;
      }
      .vux-header {
        background: white;
        color: #231815 !important;
        .vux-header-title {
          font-size: .426667rem;
          color: #231815 !important;
        }
      }
      .slideInRight {
        -webkit-animation-name: slideInRight;
        animation-name: slideInRight;
        -webkit-animation-duration: .5s;
        animation-duration: .5s;
      }
      @keyframes slideInRight {
        from {
          -webkit-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);
          visibility: visible;
        }

        to {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
      }
      ::-webkit-scrollbar {
        display: none;
      }

      .huaqiao {
        .vjs-big-play-button{
          font-size: 1.5em!important;
        }
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
        margin: 0;
        transform: translate(-50%, -50%);
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
      }
      .video-js.vjs-playing .vjs-tech {
        pointer-events: auto;
      }

      .vjs-fullscreen-control {
        position: absolute !important;
        right: 0;
      }
    }
  }

</style>
