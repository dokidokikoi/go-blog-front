<template>
  <li>
    <div class="fixed-top" v-if="comment.weight > 1">
      置顶
    </div>
    <div style="margin-bottom: 20px;margin-top: 20px;">
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
import { ElMessage, ElMessageBox } from 'element-plus'
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

const delComment = () => {
  ElMessageBox.confirm(
    '是否删除文章？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteComment([props.comment.id]).then(res => {
        ElMessage.success('删除成功')
        emit("loadList")
      })
    })
    .catch(() => {
    })
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
    position: relative;
  }
.fixed-top {
  position: absolute;
  top: 5px;
  left: -16px;
  background-color: red;
  color: aliceblue;
  font-size: .7em;
  padding: 1px 5px;
  border-radius: 3px;
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
