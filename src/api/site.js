import request from "../utlis/request"

export const listSite = (params) => request({
    method: 'GET',
    url: '/sites',
    params
})

export const getSite = (id) => request({
    method: 'GET',
    url: '/sites/'+id,
})

export const updateSite = (data) => request({
    method: 'PATCH',
    url: '/sites',
    data
})

export const deleteSite = (ids) => request({
    method: 'DELETE',
    url: '/sites',
    data: {ids: ids}
})

export const createSite = (data) => request({
    method: 'POST',
    url: '/sites',
    data
})
