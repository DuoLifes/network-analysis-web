import axios from 'axios'
import { ElMessage } from 'element-plus'

export class NetworkError extends Error {
    // eslint-disable-next-line default-param-last
    constructor(msg, response) {
        super()
        this.message = msg || '网络请求异常，请稍后重试!'
        this.response = response
    }

    name = 'NetworkError'

    response
}
const { VITE_APP_BASE_API, MODE, VITE_APP_SERVER_URL, VITE_APP_LOCAL } = import.meta.env

const baseURL = VITE_APP_LOCAL === MODE ? VITE_APP_BASE_API : VITE_APP_SERVER_URL

/**
 * 从Cookie中获取forgerydefense字段
 * @returns {string} forgerydefense值
 */
const getForgeryDefense = () => {
    let forgerydefense = "";
    // 显式检查 localStorage 是否存在
    if (window && window.localStorage) {
        // 使用可选链操作符来安全地访问 csrftoken
        const token = window.localStorage?.csrftoken;
        if (token) {
            // 去除字符串两边的引号
            forgerydefense = token.replace(/^"|"$/g, '');
        }
    }
    return forgerydefense
}

const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    // 超时时间
    timeout: 1000 * 60,
    withCredentials: true
})
instance.defaults.headers = { 'Content-Type': 'application/json; charset=utf-8' }

instance.interceptors.request.use(
    (config) => {
        // 获取forgerydefense值
        const forgerydefense = getForgeryDefense()
        // 添加到请求头
        config.headers['forgerydefense'] = forgerydefense
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/**
 * 响应拦截
 */
instance.interceptors.response.use(
    (response) => {
        return Promise.resolve(response.data)
    },
    (error) => {
        return Promise.reject(new NetworkError(error.response?.data, error.response))
    }
)

export default instance
