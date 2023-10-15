<template>
  <div>
    <app-card>
      <template #header>
        发表评论
      </template>
      <pub-comment
        :article-id="props.articleId"
        @load-list="loadList"
        @cancel="cancel"
      />
    </app-card>

    <el-card style="margin-top: 20px;">
      <ul class="comment_body">
        <comment-item
          v-for="comment in commentList"
          :key="comment.id"
          :comment="comment"
          @load-list="loadList"
          @show-pub="showPub"
          @setWeight="setWeight"
        >
          <template #recover>
            <pub-comment
              style="margin-top: 20px;"
              v-if="isRecover == comment.id"
              :parent-id="comment.id"
              :article-id="articleId"
              :to-user-name="comment.nickname"
              @load-list="loadList"
              @cancel="cancel"
            >
              <el-button
                type="info"
                style="float: right;"
                @click="cancel"
              >
                取消
              </el-button>
            </pub-comment>
          </template>
          <ul style="margin-left: 50px;">
            <comment-item
              v-for="item in comment.children"
              :key="item.id"
              :comment="item"
              @load-list="loadList"
              @show-pub="showPub"
              @setWeight="setWeight"
            >
              <template #recover>
                <pub-comment
                  style="margin-top: 20px;"
                  v-if="isRecover == item.id"
                  :parent-id="comment.id"
                  :article-id="articleId"
                  :to-user-name="item.nickname"
                  @load-list="loadList"
                  @cancel="cancel"
                >
                  <el-button
                    type="info"
                    style="float: right;"
                    @click="cancel"
                  >
                    取消
                  </el-button>
                </pub-comment>
              </template>
            </comment-item>
          </ul>
        </comment-item>
      </ul>
    </el-card>

    <el-pagination background layout="prev, pager, next" 
    style="margin-top: 20px;" 
    @current-change="currentChange" 
    @prev-click="currentChange" 
    @next-click="currentChange" 
    :page-size="param.page_size"
    :total="totalCount" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import PubComment from './PubComment.vue'
import CommentItem from './CommentItem.vue'
import {listComment, updateComment} from "@/api/comment"
import AppCard from '../AppCard/index.vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  articleId: {
    type: Number,
    default: 0
  }
})
const commentParam = ref({})
const param = reactive({
  keyword: '',
  page: 1,
  page_size: 10,
  order_by: "weight desc, id desc",
  article_id: 0,
})

const commentList = ref([])
const isRecover = ref('0')

const totalCount = ref(0)

onMounted(() => {
  loadList()
})

const loadList = async () => {
  param.article_id = props.articleId
  const { data } = await listComment(param)

  commentList.value = data.list
  totalCount.value = data.total
}

const cancel = () => {
  isRecover.value = '0'
}

const showPub = (id) => {
  // console.log(id)
  isRecover.value = id
}

function currentChange(curr) {
  param.page = curr
  loadList()
}

function setWeight(id, weight) {
  commentParam.value.id = id
  commentParam.value.weight = weight
  updateComment(commentParam.value).then(res => {
    if (res.code === 0) {
      ElMessage.success("置顶成功")
      loadList()
    }
  })
}

</script>

<style scoped>
/* :deep .el-form-item__label {
  margin: 0 !important;
}
:deep .content-space__item {
  padding: 0 !important;
} */
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
