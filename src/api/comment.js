import request from "../utlis/request"

export const listComment = (params) => request({
    method: 'GET',
    url: '/comments',
    params
})

export const getComment = (id) => request({
    method: 'GET',
    url: '/comments/'+id,
})

export const updateComment = (data) => request({
    method: 'PATCH',
    url: '/comments',
    data
})

export const deleteComment = (ids) => request({
    method: 'DELETE',
    url: '/comments',
    data: {ids: ids}
})

export const createComment = (data) => request({
    method: 'POST',
    url: '/comments',
    data
})
