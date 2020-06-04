<template>
  <article class="Daren">
    <BScroll class="Daren__Bscroll" :data="data">
      <ul class="Daren__list">
        <li class="Daren__list-li" v-for="(item, index) in data" :key="index" @click="navTo(item.url)">
          <img :src="item.img" class="avatar" alt="">
          <div class="info">
            <p>{{item.title}}</p>
            <span>{{item.content}}</span>
          </div>
          <div class="source" v-if="item.source || item.icon">
            <img :src="item.icon" alt="">
            <p>
              <span></span>
              <span>{{item.source}}</span>
            </p>
          </div>
        </li>
      </ul>
    </BScroll>
  </article>
</template>

<script>
// import * as api from '@/api'
// import * as xx from '@/common/js/wx'
// import { transform13Time } from '@/common/js'
import BScroll from '../../components/bscroll'
export default {
  data () {
    return {

    }
  },
  props: {
    data: {
      type: Array,
      defaul: []
    }
  },
  methods: {
    navTo (url) {
      window.location.href = url
    }
  },
  components: {
    BScroll
  }
}
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';
.Daren {
  position: absolute;
  top: 8.48rem /* 318/37.5 */;
  left: 0;
  right: 0;
  padding-bottom: .2667rem /* 10/37.5 */;
  background: #F5F9FA;

  &__Bscroll {
    height: 8.3733rem /* 314/37.5 */;
  }

  &__list {
    padding: .4rem /* 15/37.5 */ .3067rem /* 11.5/37.5 */;
    background: #F5F9FA;
    &-li {
      position: relative;
      display: flex;
      margin-bottom: .5333rem /* 20/37.5 */;
      padding: .4rem /* 15/37.5 */ .7467rem /* 28/37.5 */ .4rem /* 15/37.5 */ .5867rem /* 22/37.5 */;
      background: white;
      border: .2667rem /* 10/37.5 */;
      border-radius: .1067rem /* 4/37.5 */;

      .avatar {
        .imgs(1.8133rem /* 68/37.5 */, 1.8133rem /* 68/37.5 */);
        margin-right: .4267rem /* 16/37.5 */;
      }

      .info {
        overflow: hidden;
        p {
          margin-bottom: .16rem /* 6/37.5 */;
          padding-top: .0667rem /* 2.5/37.5 */;
          font-size: 14px;
          font-weight: 500;
          line-height: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        span {
          font-size: 10px;
          .line-hidden(2);
          color: rgb(183, 183, 183);
          line-height: 1.5;
        }
      }

      .source {
        position: absolute;
        right: 1.0667rem /* 40/37.5 */;
        bottom: .16rem /* 6/37.5 */;
        .list(row, flex-start, center);
        img {
          margin-right: .1067rem /* 4/37.5 */;
          height: .3333rem /* 12.5/37.5 */;
        }
        p {
          position: relative;
          width: .5333rem /* 20/37.5 */;
          height: .4rem /* 15/37.5 */;
          span:first-of-type {
            position: absolute;
            top: 0;
            left:0;
            display: block;
            width: .5333rem /* 20/37.5 */;
            height: .4rem /* 15/37.5 */;;
          }
          span:last-of-type {
            display: block;
            width: 40px;
            height: 15px;
            font-size: 20px;
            color: rgb(183, 183, 183);
            line-height: 1.5;
            transform: scale(0.5);
            transform-origin: 0 0;
          }
        }
      }
    }
    &-li:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
