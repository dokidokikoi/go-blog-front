import request from "../utlis/request"

export const listSeries = (params) => request({
    method: 'GET',
    url: '/series',
    params
})

export const getSeries = (id) => request({
    method: 'GET',
    url: '/series/'+id,
})

export const updateSeries = (data) => request({
    method: 'PATCH',
    url: '/series',
    data
})

export const deleteSeries = (ids) => request({
    method: 'DELETE',
    url: '/series',
    data: {ids: ids}
})

export const createSeries = (data) => request({
    method: 'POST',
    url: '/series',
    data
})
