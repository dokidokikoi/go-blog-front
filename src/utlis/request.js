import axios from 'axios'
import { getItem } from './localStorage'
import { ElMessage } from 'element-plus'

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

// 请求拦截器
request.interceptors.request.use(function (config) {
    // 统一设置用户身份 token
    const token = getItem("token")
    // const user = store.state.user
    // if (config && config.headers) {
    //     if (user && user.token) {
    //         config.headers.Authorization = user.token
    //     }
    // }
    config.headers.Authorization = token
    return config
    }, function (error) {
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
    // 统一处理接口响应数据，比如 token 过期无效、服务端异常等
    if (response.status !== 200) {
      console.log(response.status)
      ElMessage.error(response.data.msg)
      return Promise.reject(response)
    }
    // 请求正常，返回数据
    const status = response.data.code
    if (status === 0) {
      return response
    }
  
    // 其它错误情况
    ElMessage.error(response.data.message || '请求失败，请稍后重试')
    // 手动返回一个 Promise 异常
    return Promise.reject(response.data)
  }, function (error) {
    return Promise.reject(error)
  })

export default (config) => {
    return request(config).then(res => {
        return res.data
    })
}