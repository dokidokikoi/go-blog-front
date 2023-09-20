import request from "../utlis/request"

export const listArticle = (data) => request({
    method: 'POST',
    url: '/articles/list',
    data
})

export const getArticle = (id) => request({
    method: 'GET',
    url: '/articles/'+id,
})

export const updateArticle = (data) => request({
    method: 'PATCH',
    url: '/articles',
    data
})

export const deleteArticle = (ids) => request({
    method: 'DELETE',
    url: '/articles',
    data: {ids: ids}
})

export const createArticle = (data) => request({
    method: 'POST',
    url: '/articles',
    data
})