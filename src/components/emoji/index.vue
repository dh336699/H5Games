<template>
  <article class="Emojs">
    <section>
      <ul v-for="(item, index) in EmoJs" :key="index">{{item.name}}</ul>
    </section>
  </article>
</template>

<script>
// import * as api from '@/api'
// import * as xx from '@/common/js/wx'
// import { transform13Time } from '@/common/js'
import { EmoJs } from './emoji.js'
export default {
  data () {
    return {

    }
  },
  mounted () {
    console.log(EmoJs)
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
@import '../../common/styles/elements.less';

</style>
