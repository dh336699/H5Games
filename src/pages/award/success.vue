<template>
  <article class="success">
    <div class="wrap">
      <p class="name">领取成功</p>
      <p class="tips">
        优惠券已发放到华侨城官方商城
      </p>
      <p class="tips">
        <span>【花橙旅游】</span>，我的优惠券中
      </p>
      <p class="tips tips-b" @click="skip"> <img src="../../common/images/finger.png" alt=""> 点击查看</p>
    </div>
    <div class="btn-award">
      <img src="../../common/images/back.png" alt="" class="icon" @click="back()">
    </div>
  </article>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {},
  methods: {
    back () {
      this.$router.push({
        path: '/live'
      })
    },
    skip () {
      window.location.href = 'https://m.smartoct.com/'
    }
  }
}
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';
.success {
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
    margin-top: 50%;
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
      text-align: center;
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
