<template>
  <article class="ActiveInfo">
    <img src="../../common/images/activity.png" class="ActiveInfo__active">
  </article>
</template>

<script>
// import * as api from '@/api'
// import * as xx from '@/common/js/wx'
// import { transform13Time } from '@/common/js'
export default {
  data () {
    return {

    }
  },
  methods: {
  },
  components: {

  }
}
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';
.ActiveInfo {
  padding: .28rem /* 10.5/37.5 */ 1.2rem /* 45/37.5 */ 0;
  background: #F5F9FA;
  &__active {
    width: 100%;
  }
}
</style>
