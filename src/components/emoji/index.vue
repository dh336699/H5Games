<template>
  <article class="Emojs">
    <section>
      <div v-for="(item, index) in emojsArr" :key="index">
        <span v-if="item.status === 'used'">常用</span>
        <span v-else>人物</span>
        <div>
          <span @click="getEmoji(it)" v-for="(it, idx) in item.child" :key="idx" class="emoji-span">
            {{it.value}}
          </span>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
// import * as api from '@/api'
// import * as xx from '@/common/js/wx'
// import { transform13Time } from '@/common/js'
import { EmoJs } from './emoji'
export default {
  data () {
    return {
      emojsArr: []
    }
  },
  mounted () {
    console.log(EmoJs)
    this.emojsArr = EmoJs
  },
  methods: {
    getEmoji (it) {
      this.$emit('getEmoji', it)
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../common/styles/elements.less';
.Emojs {
  font-size: 20px;
  background: gray;
  padding-left: .2133rem /* 8/37.5 */;
  .emoji-span {
    display: inline-block;
    text-align: center !important;
    margin-bottom: 8px !important;
    padding: 0 8px 0 0;
  }
}
</style>
