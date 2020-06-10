<template>
  <article class="award">
    <!-- <div class="wrap" v-if="reward == 0">
      <p class="name">很遗憾没有中奖</p>
      <p class="name">下次继续加油吧</p>
    </div>
    <div class="wrap" v-else>
      <p class="name">恭喜您获得</p>
      <p class="name" v-if="reward == 1">花橙全国畅游单人卡一张</p>
      <p class="name" v-if="reward == 2">花橙全国畅游亲子卡一张</p>
      <p class="name" v-if="reward == 3">欢乐谷年卡一张</p>
      <p class="name" v-if="reward == 4">满100减10优惠券一张</p>
      <p class="name" v-if="reward == 5">满200减30优惠券一张</p>
      <p class="tips first" v-show="reward == 3">
        请选择想要领取年卡的城市，欢乐谷年卡</p>
      <p class="tips" v-show="reward == 3">将会于2个工作日内发放到华侨城官方商城</p>
      <p class="tips" v-show="reward == 3"><span>【花橙旅游】，我的优惠券中。此优惠券</span></p>
      <p class="tips" v-show="reward == 3">只能购买所选择城市的欢乐谷年卡一张。</p>
    </div> -->
    <img src="../../common/images/a4.png" alt="" v-if="reward == 0" class="tips">
    <img src="../../common/images/a1.png" alt="" v-if="reward == 1" class="tips">
    <img src="../../common/images/a2.png" alt="" v-if="reward == 2" class="tips">
    <img src="../../common/images/a3.png" alt="" v-if="reward == 3" class="tips">
    <img src="../../common/images/100-10.png" alt="" v-if="reward == 4" class="tips">
    <img src="../../common/images/200-30.png" alt="" v-if="reward == 5" class="tips">
    <div class="btn-award">
      <div class="list" v-show="reward == 3">
        <input type="text" v-model="city" class="in-input" placeholder="城市" readonly>
        <img src="../../common/images/arrow.png" alt="" @click="show = true">
      </div>
      <div class="list" v-if="reward !== 0">
        <input type="number" placeholder="请输入手机号码" class="in-input" v-model="phone">
      </div>
      <img src="../../common/images/back.png" alt="" class="icon" v-if="reward == 0" @click="back()">
      <img src="../../common/images/get.png" alt="" class="icon" @click="submit" v-else>
      <PopupPicker :data="pickData" v-model="city" placeholder="请选择城市" width="100%" :show.sync="show" v-show = "flag"></PopupPicker>
    </div>
  </article>
</template>

<script>
import { getAward, getGift } from '@/api/index'
import { PopupPicker } from 'vux'
export default {
  data () {
    return {
      flag: false,
      show: false,
      city: [],
      reward: 3,
      pickData: [[
        '深圳',
        '成都',
        '重庆',
        '北京',
        '上海',
        '武汉',
        '天津'
      ]],
      phone: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getAward({
        openid: 'o1RgAsxDHW_fGXfehpSsjgo0LXvo',
        score: this.$route.query.gameCoins
      }).then(res => {
        this.reward = res.reward
      })
    },
    submit () {
      if (this.reward == 3) {
        if (this.city.length == 0) {
          this.$vux.toast.show({
            text: '请选择城市',
            width: '10em',
            type: 'cancel'
          })
          return
        }
      }
      let telReg = /^1[2-9][0-9]{9}$/
      if (!telReg.test(this.phone)) {
        this.$vux.toast.show({
          text: '手机号不合法~',
          width: '10em',
          type: 'cancel'
        })
        return
      }
      let str = ''
      str = this.city.join(',')
      getGift({
        openid: 'o1RgAsxDHW_fGXfehpSsjgo0LXvo',
        phone: this.phone,
        city: str
      }).then(res => {
        if (res.code === 1) {
          this.$vux.toast.show({
            text: '提交成功',
            width: '10em',
            type: 'success'
          })
          this.$router.push({
            path: '/success'
          })
        } else {
          this.$vux.toast.show({
            text: res.message,
            width: '10em',
            type: 'cancel'
          })
        }
      })
    },
    back () {
      this.$router.push({
        path: '/live'
      })
    }
  },
  components: {
    PopupPicker
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
  background: url('../../common/images/bg.jpg') no-repeat;
  background-size: 100% 100%;
  .tips {
    width: 70%;
    margin-left: 15%;
    margin-top: 20px;
    vertical-align: bottom;
  }
  .btn-award {
    text-align: center;
    width: 100%;
    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 4.5rem;
      background: #ffffff;
      padding: 5px 10px;
      margin: 20px auto 0;
      text-align: left;
      span {
        text-align: left !important;
      }
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
      width: 4.2rem;
      margin-top: 20px;
    }
  }
}
</style>
