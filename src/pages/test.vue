<template>
  <div id="111">
    <div style="height: 212px;">
      <vue-baberrage
        ref="baber"
        :isShow="true"
        :barrageList="barrageLists"
        style="width: 100%;height: 212px;"
        />
    </div>
    <p @click="addToList()">增加</p>
    <!-- <router-view class="slideInRight" /> -->
  </div>
</template>

<script>
import { MESSAGE_TYPE } from 'vue-baberrage'
  export default {
    data () {
      return {
        barrageLists: [
          {
            id: 0,
            msg: '我曹',
            time: 5,
            type: MESSAGE_TYPE.NORMAL
          },
          {
            id: 1,
            msg: '我曹',
            time: 5,
            type: MESSAGE_TYPE.NORMAL
          },
          {
            id: 2,
            msg: '我曹',
            time: 5,
            type: MESSAGE_TYPE.NORMAL
          }
        ],
        currentId: 0
      }
    },
    mounted () {
      console.log(111)
    },
    methods: {
      addToList (e) {
        console.log(this.barrageLists)
        this.barrageLists.push({
          id: ++this.currentId,
          msg: '我曹',
          time: 5,
          type: MESSAGE_TYPE.NORMAL
        })
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  .normal {
    padding: 0 10px !important;
  }
  .baberrage-avatar {
    display: none !important;
  }
  .baberrage-msg {
    padding-left: 0 !important;
  }

</style>
