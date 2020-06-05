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

    <textarea v-model="input"></textarea>

<!-- <emoji-picker @emoji="insert" :search="search">
  <div slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
    <button type="button">open</button>
  </div>
  <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
    <div>
      <div>
        <div v-for="(emojiGroup, category) in emojis" :key="category">
          <h5>{{ category }}</h5>
          <div>
            <span
              v-for="(emoji, emojiName) in emojiGroup"
              :key="emojiName"
              @click="insert(emoji)"
              :title="emojiName"
            >{{ emoji }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</emoji-picker> -->
<Emoji></Emoji>
  </div>
</template>

<script>
import { MESSAGE_TYPE } from 'vue-baberrage'
import Emoji from '../components/emoji'

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
        currentId: 0,
        input: '',
        search: ''
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
      },
      insert (emoji) {
        this.input += emoji
      }
    },
    components: {
      Emoji
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
