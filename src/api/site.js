import request from "../utlis/request"

const listSite = (params) => request({
    method: 'GET',
    url: '/sites',
    params
})

const getSite = (id) => request({
    method: 'GET',
    url: '/sites/'+id,
})

const updateSite = (data) => request({
    method: 'PATCH',
    url: '/sites',
    data
})

const deleteSite = (ids) => request({
    method: 'DELETE',
    url: '/sites',
    data: {ids: ids}
})

const createSite = (ids) => request({
    method: 'POST',
    url: '/sites',
    data
})

export default {
    listSite,
    getSite,
    updateSite,
    deleteSite,
    createSite
}