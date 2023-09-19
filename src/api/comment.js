import request from "../utlis/request"

const listComment = (params) => request({
    method: 'GET',
    url: '/comments',
    params
})

const getComment = (id) => request({
    method: 'GET',
    url: '/comments/'+id,
})

const updateComment = (data) => request({
    method: 'PATCH',
    url: '/comments',
    data
})

const deleteComment = (ids) => request({
    method: 'DELETE',
    url: '/comments',
    data: {ids: ids}
})

const createComment = (ids) => request({
    method: 'POST',
    url: '/comments',
    data
})

export default {
    listComment,
    getComment,
    updateComment,
    deleteComment,
    createComment
}