/**
 * # 请求类
 * @category Helper
 * @class HughHttp
 * @author HughMa
 */

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
// @ts-ignore
import buildURL from 'axios/lib/helpers/buildURL'
import { HughLoading } from '../feedback/HughLoading'
import { HughConfig } from '../config'

type ParamsSerializer = AxiosRequestConfig['paramsSerializer']

// 定义拦截器方法的类型
interface InterceptorMethods<T> {
  use(onFulfilled?: (value: T) => T | Promise<T>, onRejected?: (error: any) => any): void
}

// 扩展 AxiosResponse 类型
interface Response extends AxiosResponse {
  statusCode?: number
}

// 定义拦截器的类型
interface Interceptors {
  request: InterceptorMethods<AxiosRequestConfig>
  response: InterceptorMethods<Response>
}

/**
 * ## Http请求类
 */
export class HughHttp {
  /**
   * axios 实例
   */
  private axiosInstance: AxiosInstance

  /**
   * 拦截器
   */
  interceptors: Interceptors

  /**
   * Loading
   */
  private loading = ''

  /**
   * # 是否显示加载中状态
   * @param loading 加载文字
   */
  setLoading(loading: string): this {
    this.loading = loading
    return this
  }

  private getFullURL(
    baseURL: string,
    url: string,
    params: Record<string, any>,
    paramsSerializer?: ParamsSerializer,
  ) {
    if (url.startsWith('http'))
      return buildURL(url, params, paramsSerializer)

    baseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`
    url = url.startsWith('/') ? url.slice(1) : url
    return buildURL(`${baseURL}${url}`, params, paramsSerializer)
  }

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: HughConfig.apiRoot,
      adapter: (config: AxiosRequestConfig) => {
        const { url, method, data, params, headers, baseURL, paramsSerializer } = config
        return new Promise((resolve, reject) => {
          if (this.loading) {
            HughLoading.show(this.loading)
          }

          uni.request({
            method: method!.toUpperCase() as 'GET' | 'POST',
            url: this.getFullURL(baseURL || '', url!, params, paramsSerializer),
            header: headers,
            data,
            dataType: 'json',
            responseType: config.responseType,
            success: (res) => {
              const response = res as unknown as Response
              resolve(response)
            },
            fail: (err) => {
              reject(err)
            },
            complete: () => {
              if (this.loading)
                HughLoading.hide()
            },
          })
        })
      },
    })

    // 设置拦截器
    this.interceptors = {
      request: {
        use: (onFulfilled, onRejected) => {
          this.axiosInstance.interceptors.request.use(onFulfilled, onRejected)
        },
      },
      response: {
        use: (onFulfilled, onRejected) => {
          this.axiosInstance.interceptors.response.use(onFulfilled, onRejected)
        },
      },
    }
  }

  /**
   * get请求
   * @param {string} url - 用于请求的服务器 URL
   * @param {AxiosRequestConfig} config - 请求配置
   * @returns {Promise<T>} A promise that resolves with the response data
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get(url, config)
  }

  /**
   * post请求
   * @param {string} url - 用于请求的服务器 URL
   * @param {R} data - 作为请求主体被发送的数据
   * @param {AxiosRequestConfig} config - 请求配置
   * @returns {Promise<T>} A promise that resolves with the response data
   */
  post<T = any, R = any>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post(url, data, config)
  }

  /**
   * 将文件上传到指定的URL。
   * @param {string} url - 将文件上传到的URL。
   * @param {string} path - 要上传的文件的路径。
   * @param {'image' | 'video' | 'audio'} type - 文件的类型。 默认为"image"。
   * @return {Promise<T>} A promise that resolves with the uploaded data.
   */
  upload<T = any>(url: string, path: string, type?: 'image' | 'video' | 'audio'): Promise<T> {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url,
        fileType: type || 'image',
        filePath: path,
        name: 'file',
        success: ({ data }) => {
          resolve(data as unknown as T)
        },
        fail: (error) => {
          reject(error)
        },
      })
    })
  }

  /**
   * 七牛云上传
   * @param {string} url - 将文件上传到的URL。
   * @param {string} path - 要上传的文件的路径。
   * @param {string} key - 唯一的文件名
   * @param {string} token - 七牛云上传的token
   * @return {Promise<T>} A promise that resolves with the uploaded data.
   */
  qiniu<T = any>(url: string, path: string, key: string, token: string): Promise<T> {
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url,
        filePath: path,
        name: 'file',
        formData: {
          key,
          token,
        },
        success: ({ data }) => {
          resolve(data as unknown as T)
        },
        fail: (error) => {
          reject(error)
        },
      })
    })
  }
}
