import request from "../utlis/request"

export const listLink = (params) => request({
    method: 'GET',
    url: '/links',
    params
})

export const getLink = (id) => request({
    method: 'GET',
    url: '/links/'+id,
})

export const updateLink = (data) => request({
    method: 'PATCH',
    url: '/links',
    data
})

export const deleteLink = (ids) => request({
    method: 'DELETE',
    url: '/links',
    data: {ids: ids}
})

export const createLink = (data) => request({
    method: 'POST',
    url: '/links',
    data
})
