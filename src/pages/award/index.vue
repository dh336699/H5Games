<template>
  <article class="award">
    <div class="wrap" v-if="reward == 0">
      <p class="name">很遗憾没有中奖</p>
      <p class="name">下次继续加油吧</p>
    </div>
    <div class="wrap" v-else-if="reward == 3">
      <p class="name">恭喜您获得</p>
      <p class="name">欢乐谷年卡一张</p>
      <p class="tips">请选择想要领取年卡的城市，欢乐谷年卡将会于2个工作日内发放到华侨城官方商城<span>【花橙旅游】</span>，我的优惠券中。此优惠券只能购买所选择城市的欢乐谷年卡一张。</p>
    </div>
    <div class="wrap" v-else>
      <p class="name">领取成功</p>
      <p class="tips">
        恭喜您获得
        <span v-if="reward == 1">【花橙全国畅游单人卡一张】</span>
        <span v-if="reward == 2">【花橙全国畅游亲子卡一张】</span>
        <span v-if="reward == 4">【满100减10优惠券一张】</span>
        <span v-if="reward == 5">【满200减30优惠券一张】</span>
      </p>
      <p class="tips tips-b"> <img src="../../common/images/finger.png" alt=""> 点击查看</p>
    </div>
    <div class="btn-award">
      <div class="list" v-if="reward == 3" @click="show = true">
        <input type="text" placeholder="城市：" v-model="city" readonly>
        <img src="../../common/images/arrow.png" alt="">
      </div>
      <div class="list">
        <input type="text" placeholder="请输入手机号码" class="in-input">
      </div>
      <img src="../../common/images/get.png" alt="" class="icon">
      <!-- <img src="../../common/images/back.png" alt="" class="icon"> -->
    </div>
  </article>
</template>

<script>
import {getAward} from '@/api/index'
export default {
  data () {
    return {
      show: false,
      city: '',
      reward: null,
      pickData: [
        '深圳',
        '成都',
        '重庆',
        '北京',
        '上海',
        '武汉',
        '天津'
      ]
    }
  },
  mounted () { 
    this.init ()
  },
  methods: {
    init () {
      getAward({
        openid: 'o1RgAsxDHW_fGXfehpSsjgo0LXvo', 
        score: this.$route.query.gameCoins
      }).then(res => {
        // this.reward = res.reward
        this.reward = 3
      })
    },
    cancel () {
      this.show = false
    },
    confirm (e) {
      this.show = false
      this.city = e
    } 
  },
  components: {

  }
}
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';
.award {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../../common/images/bg.png') no-repeat;
  background-size: 100% 100%;
  .wrap {
    width: 100%;
    min-height: 150px;
    margin-top: 48%;
    .name {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
    }
    .tips {
      width: 60%;
      margin-left: 20%;
      font-size: 12px;
      color: #ffffff;
      margin-top: 10px;
      span {
        color: #fdb27b;
      }
    }
    .tips-b {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20px;
      }
    }
  }
  .btn-award {
    text-align: center;
    margin-top: 3.2rem;
    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 4rem;
      background: #ffffff;
      padding: 5px 10px;
      margin: 20px auto 0;
      input {
        width: 80%;
        font-size: 18px;
      }
      img {
        width: 15px;
      }
      .in-input {
        width: 100%;
      }
    }
    .icon {
      width: 4rem;
      margin-top: 20px;
    }
  }
  .time-wrap {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
