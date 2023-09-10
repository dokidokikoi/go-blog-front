<template>
  <page-container>
    <app-card>
      <template #header>
        发表评论
      </template>
      <pub-comment
        :article-id="props.articleId"
        :load-list="loadList"
        :cancel="cancel"
      />
    </app-card>

    <el-card style="margin-top: 20px;">
      <ul class="comment_body">
        <comment-item
          v-for="comment in commentList"
          :key="comment.id"
          :comment="comment"
          :load-list="loadList"
          @show-pub="showPub"
        >
          <template #recover>
            <pub-comment
              style="margin-top: 20px;"
              v-if="isRecover == comment.id"
              :parent-id="comment.id"
              :article-id="articleId"
              :to-user-name="comment.author.nickname"
              :to-use-id="comment.author.id"
              :load-list="loadList"
              :cancel="cancel"
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
              :load-list="loadList"
              @show-pub="showPub"
            >
              <template #recover>
                <pub-comment
                  style="margin-top: 20px;"
                  v-if="isRecover == item.id"
                  :parent-id="comment.id"
                  :article-id="articleId"
                  :to-user-name="item.author.nickname"
                  :to-use-id="item.author.id"
                  :load-list="loadList"
                  :cancel="cancel"
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

      <app-pagination
        v-model:page="param.page"
        v-model:limit="param.limit"
        :list-count="listCount"
        :load-list="loadList"
      />
    </el-card>
  </page-container>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import PubComment from './PubComment.vue'
import CommentItem from './CommentItem.vue'

const props = defineProps({
  articleId: {
    type: String,
    default: ''
  }
})

const param = reactive({
  key: '',
  page: 1,
  limit: 5
})

const commentList = ref([])
const isRecover = ref('0')

const listCount = ref(0)

onMounted(() => {
  loadList()
})

const loadList = async () => {
  // const { data } = await commentApi.getCommentList(props.articleId ? props.articleId : '0', param)

  // commentList.value = data.list
  // listCount.value = data.totalCount
}

const cancel = () => {
  isRecover.value = '0'
}

const showPub = (id) => {
  isRecover.value = id
}

</script>

<style scoped>
::v-deep .el-form-item__label {
  margin: 0 !important;
}
::v-deep .content-space__item {
  padding: 0 !important;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
