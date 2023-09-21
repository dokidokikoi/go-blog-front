import request from "../utlis/request"

export const listList = (params) => request({
    method: 'GET',
    url: '/list',
    params
})

export const getList = (id) => request({
    method: 'GET',
    url: '/list/'+id,
})

export const updateList = (data) => request({
    method: 'PATCH',
    url: '/list',
    data
})

export const deleteList = (ids) => request({
    method: 'DELETE',
    url: '/list',
    data: {ids: ids}
})

export const createList = (data) => request({
    method: 'POST',
    url: '/list',
    data
})