import request from "../utlis/request"

export const policy = () => request({
    method: 'POST',
    url: '/upload'
})