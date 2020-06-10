<template>
  <article class="ActiveInfo">
    <img src="../../common/images/activte.png" class="ActiveInfo__active">
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
  padding: .3rem /* 10.5/37.5 */ .7rem /* 45/37.5 */ 0;
  background: url('../../common/images/abg.png') no-repeat;
  background-size: 100% 100%;
  &__active {
    width: 100%;
  }
}
</style>
