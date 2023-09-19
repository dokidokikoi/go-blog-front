import request from "../utlis/request"

const listList = (params) => request({
    method: 'GET',
    url: '/list',
    params
})

const getList = (id) => request({
    method: 'GET',
    url: '/list/'+id,
})

const updateList = (data) => request({
    method: 'PATCH',
    url: '/list',
    data
})

const deleteList = (ids) => request({
    method: 'DELETE',
    url: '/list',
    data: {ids: ids}
})

const createList = (ids) => request({
    method: 'POST',
    url: '/list',
    data
})

export default {
    listList,
    getList,
    updateList,
    deleteList,
    createList
}