import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export default (config) => {
return request(config).then(
    res => {
        return {
            msg: res.data.msg,
            data: res.data.data,
            code: res.data.code
        }
    }
)
}