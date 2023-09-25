<template>
  <li>
    <div style="margin-bottom: 20px;">
      <el-avatar
        :src="comment.avatar? comment.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
      <div class="info">
        <div class="top" v-if="/\/admin\/*/.test($route.fullPath)">
          <el-tooltip
                effect="dark"
                content="置顶评论"
                placement="bottom-start"
                style="margin: 10px;"
                v-if="comment.weight < 2"
              >
                  <el-button
                    type="info"
                    size="small"
                    @click="setTop()"
                  >
                    <el-icon><Star /></el-icon>
                  </el-button>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="取消置顶"
                placement="bottom-start"
                style="margin: 10px;"
                v-else
              >
                <el-badge
                  is-dot
                  style="z-index: 100;"
                >
                  <el-button
                    type="info"
                    size="small"
                    @click="setTop()"
                  >
                    <el-icon><Star /></el-icon>
                  </el-button>
                </el-badge>
              </el-tooltip>
        </div>
        <p class="name">
          {{ comment.nickname }}
        </p>
        <p class="date">
          {{ formatTime(comment.created_at) }}
        </p>
        <p class="content">
          <span
            v-if="comment.to_nickname!==''"
            class="callName"
          >@{{ comment.to_nickname }}</span>{{ comment.content }}
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
          @click="delComment"
        >
          删除
        </el-button>
        <!-- <el-button
          v-show="comment.state===1"
          v-if="/\/admin\/*/.test($route.fullPath)"
          type="success"
          class="btn right"
          @click="deleteComment"
        >
          恢复
        </el-button> -->
        <slot name="recover" />
      </div>
    </div>
    <slot />
  </li>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { formatTime } from '../../utlis/time'
import {deleteComment} from "../../api/comment"
import { Star } from '@element-plus/icons-vue'
 
const props = defineProps({
  comment: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {}
  },
  recover: {
    default: () => {}
  },
  // loadList: {
  //   default: () => {}
  // }
})

const emit = defineEmits()
const recover = () => {
  emit('showPub', props.comment.id)
}

const delComment = async () => {
  const data = await deleteComment(props.comment.id)

  if (data.code === 0) {
    ElMessage.success('修改成功')
    emit("loadList")
    // props.loadList()
  }
}
function setTop() {
  emit("setWeight", props.comment.id, 3 - props.comment.weight)
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
    position: relative;
  }
.top {
  position: absolute;
  right: 0;
  top: 0;
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
