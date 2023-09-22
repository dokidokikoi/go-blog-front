import request from "../utlis/request"

// const listUser = (params) => request({
//     method: 'GET',
//     url: '/users',
//     params
// })

export const getUser = (id) => request({
    method: 'GET',
    url: '/users/'+id,
})

export const updateUser = (data) => request({
    method: 'PATCH',
    url: '/users',
    data
})

export const login = (data) => request({
    method: 'POST',
    url: '/users/login',
    data
})

export const register = (data) => request({
    method: 'POST',
    url: '/users/register',
    data
})

export const getCaptcha = () => request({
    method: "POST",
    url: "/users/captcha"
})

export const logout = () => request({
    method: 'POST',
    url: '/users/logout',
})

// const createUser = (ids) => request({
//     method: 'POST',
//     url: '/users',
//     data
// })