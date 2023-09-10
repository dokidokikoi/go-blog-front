<template>
  <li v-if="!(!/\/admin\/*/.test($route.fullPath) && comment.state !== 0)">
    <div style="margin-bottom: 20px;">
      <el-avatar
        :src="comment.author.avatar? comment.author.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
      <div class="info">
        <p class="name">
          {{ comment.author.nickname }}
        </p>
        <p class="date">
          <!-- {{ formatDate(comment.createDate) }} -->
        </p>
        <p class="content">
          <span
            v-if="comment.toUserNickname"
            class="callName"
          >@{{ comment.toUserNickname }}</span>{{ comment.content }}
        </p>
        <el-button
          type="primary"
          class="btn"
          @click="recover()"
        >
          回复
        </el-button>

        <el-button
          v-show="comment.state===0"
          v-if="/\/admin\/*/.test($route.fullPath)"
          type="danger"
          class="btn right"
          @click="deleteComment"
        >
          删除
        </el-button>
        <el-button
          v-show="comment.state===1"
          v-if="/\/admin\/*/.test($route.fullPath)"
          type="success"
          class="btn right"
          @click="deleteComment"
        >
          恢复
        </el-button>
        <slot name="recover" />
      </div>
    </div>
    <slot />
  </li>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'

const props = defineProps({
  comment: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {}
  },
  recover: {
    default: () => {}
  },
  loadList: {
    default: () => {}
  }
})

interface EmitsType {
  (e: 'showPub', id: string): void
}
const emit = defineEmits<EmitsType>()
const recover = () => {
  emit('showPub', props.comment.id)
}

const deleteComment = async () => {
  // const data = await commentApi.setCommentState({ id: props.comment.id, flag: props.comment.state !== 0 })

  // if (data.code === 200) {
  //   ElMessage.success('修改成功')
  //   props.loadList()
  // }
}

</script>

<style scoped>
  ul,li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    border-top: dashed 1px #ddd;
    padding-top: 10px;
    margin-bottom: 20px;
  }

  .el-avatar {
    float: left;

    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }

  .info {
    margin-left: 50px;
    padding-bottom: 10px;
  }

  .name, .date {
    margin: 0;
    padding: 0;
  }

  .name {
    font-weight: bold;
  }

  .date {
    font-style: italic;
    font-size: .7em;
  }

  .callName {
    font-weight: bold;
    margin-right: 5px;
  }
</style>
