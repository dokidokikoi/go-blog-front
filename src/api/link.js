import request from "../utlis/request"

const listLink = (params) => request({
    method: 'GET',
    url: '/links',
    params
})

const getLink = (id) => request({
    method: 'GET',
    url: '/links/'+id,
})

const updateLink = (data) => request({
    method: 'PATCH',
    url: '/links',
    data
})

const deleteLink = (ids) => request({
    method: 'DELETE',
    url: '/links',
    data: {ids: ids}
})

const createLink = (ids) => request({
    method: 'POST',
    url: '/links',
    data
})

export default {
    listLink,
    getLink,
    updateLink,
    deleteLink,
    createLink
}