# 使用
> 使用 HughHttp 必须安装 axios@0.27.2

`HughHttp` 是 `@hugh-ma/utils` 中封装的一个 `axios` 请求方法，支持拦截器

### Usage Functions
+ 新建 `service` 文件夹，新建 `index.ts` 文件

  如果项目对接不同域名的接口，可以按域名或者自定义名称分别新建 `.ts` 文件，并在 `new HughHttp(url?)` 赋值域名

  ~~~typescript
  // service/index
  import { HughHttp } from '@hugh-ma/utils'

  const uniHttp = new HughHttp() // new HughHttp(url?) url = 域名

  // 添加请求拦截器
  uniHttp.interceptors.request.use((config) => {
    const { method, params } = config
    const headers: any = {}

    // 不缓存get请求
    if (method === 'get')
      headers['Cache-Control'] = 'no-cache'

    // delete请求参数放入body中
    if (method === 'delete') {
      headers['Content-type'] = 'application/json;'
      Object.assign(config, {
        data: params,
        params: {},
      })
    }

    return {
      ...config,
      headers,
    }
  }, (error) => {
    console.log('request', error)
    return Promise.reject(error)
  })

  // 添加响应拦截器
  uniHttp.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      console.log('response', error)
      return Promise.reject(error)
    },
  )
  
  export { uniHttp }  
  ~~~
+ 新建 `api` 文件夹，新建 `index.ts` 文件
  ~~~typescript
  import { uniHttp } from "@/service"

  class ApiHttp {
    // 默认请求
    test() {
      return uniHttp.get('test')
    }

    // 添加loading
    loading() {
      return uniHttp.setLoading('Loading文案').get('loading')
    }

    // 请求的接口需要授权/鉴权
    auth() {
      return uniHttp.setAuthorization().get('auth')
    }

    // 支持链式调用
    call() {
      return uniHttp.setLoading('Loading文案').setAuthorization().get('call')
    }
  }

  export default new ApiHttp()
  ~~~
+ 在页面中使用
  ~~~typescript
  import http from "@/api"

  function getTest() {
    http.test().then(res => {
      // ....
    })
  }
  ~~~
+ 类型填充

  先来看一下 `AxiosResponse` 和 `HughHttp` 中 `get` 方法的类型定义
  ~~~typescript
  /**
   * axios response
   */
  export interface AxiosResponse<T = any, D = any>  {
    data: T;
    status: number;
    statusText: string;
    headers: AxiosResponseHeaders;
    config: AxiosRequestConfig<D>;
    request?: any;
  }

  /**
   * get请求
   * @param {string} url - 用于请求的服务器 URL
   * @param {AxiosRequestConfig} config - 请求配置
   * @returns {Promise<T>} A promise that resolves with the response data
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  ~~~
  泛型 `T` 只针对于 `AxiosResponse` 中的 `data`，但服务器返回的数据不会直接在 `data` 中返回，所以需要扩展一下 `T` 类型，`HughHttp` 中 `get` 的 泛型 `T` 就是 `AxiosResponse` 中的泛型 `T`
  
  在 `src` 目录下新建 `types` 文件夹并新建 `common.d.ts`（存放公共类型）, `api.d.ts`（存放接口类型） 文件
  ~~~typescript
  // common.d.ts
  // 假设服务器返回的数据是 data = { code, result, msg }
  // 我们先按照这个对象规定类型的形状，其中 T 为泛型接口，为后期约束 result 的类型形状提供接口
  interface CommonResponse<T> {
    code: number;
    result: T;
    msg: string;
  }

  // api.d.ts
  // 先定义从test接口获取到的数据类型
  // 假设返回的数据是 { code: 200, result: { id: 1, name: 'demo', age: 18, sex: 1 }, msg: 'success' }
  // 规定类型形状
  interface ITest {
    id: number
    name: string
    age: number
    sex: number
  }
  ~~~
  在请求方法中使用
  ~~~ typescript
  // api/index.ts
  // 使用 CommonResponse 类型
  class ApiHttp {
    // 然后将 ITest 作为类型参数传入 CommonResponse 的泛型接口中
    interface() {
      return uniHttp.get<CommonResponse<ITest>>('test')
    }
  }
  ~~~
  在vue文件中使用，res
  ~~~ vue
  <script lang="ts" setup>
  import http from "@/api"

  const data = ref<ITest>()

  function getTest() {
    http.interface().then(res => {
      // res (parameter) res: CommonResponse<ITest>
      // res.code (property) CommonResponse<ITest>.code: number
      // res.result (property) CommonResponse<ITest>.result: ITest
      // res.result.id (property) ITest.id: number
      // res.result.name (property) ITest.name: string
      // res.result.age (property) ITest.age: number
      // res.result.sex (property) ITest.sex: number
      // res.msg (property) CommonResponse<ITest>.msg: string
      data.value = res.result;
    })
  }
  </script>

  <template>
    <view>
      <view>id: {{data?.id}}</view>
      <view>name: {{data?.name}}</view>
      <view>age: {{data?.age}}</view>
      <view>sex: {{data?.sex}}</view>
    </view>
  </template>
  ~~~
### Type Declarations
~~~typescript
/**
 * # 请求类
 * @category Helper
 * @class HughHttp
 * @author HughMa
 */

interface InterceptorMethods<T> {
  use(onFulfilled?: (value: T) => T | Promise<T>, onRejected?: (error: any) => any): void;
}
interface Response extends AxiosResponse {
  statusCode?: number;
}
interface Interceptors {
  request: InterceptorMethods<AxiosRequestConfig>;
  response: InterceptorMethods<Response>;
}
/**
 * ## Http请求类
 */
declare class HughHttp {
  /**
   * axios 实例
   */
  private axiosInstance;
  /**
   * 拦截器
   */
  interceptors: Interceptors;
  /**
   * 接口根地址
   */
  private baseURL;
  /**
   * 请求接口是否需要token
   */
  private authorization;
  /**
   * # 设置请求接口是否需要token
   */
  setAuthorization(): this;
  /**
   * Loading
   */
  private loading;
  /**
   * # 是否显示加载中状态
   * @param loading 加载文字
   */
  setLoading(loading: string): this;
  private getFullURL;
  /**
   * 创建一个新的 HughHttp 实例。
   * @param baseURL - 可选的基础 URL。
   */
  constructor(baseURL?: string);
  /**
   * get请求
   * @param {string} url - 用于请求的服务器 URL
   * @param {AxiosRequestConfig} config - 请求配置
   * @returns {Promise<T>} A promise that resolves with the response data
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  /**
   * post请求
   * @param {string} url - 用于请求的服务器 URL
   * @param {R} data - 作为请求主体被发送的数据
   * @param {AxiosRequestConfig} config - 请求配置
   * @returns {Promise<T>} A promise that resolves with the response data
   */
  post<T = any, R = any>(url: string, data?: R, config?: AxiosRequestConfig): Promise<T>;
  /**
   * 将文件上传到指定的URL。
   * @param {string} url - 将文件上传到的URL。
   * @param {string} path - 要上传的文件的路径。
   * @param {'image' | 'video' | 'audio'} type - 文件的类型。 默认为"image"。
   * @return {Promise<T>} A promise that resolves with the uploaded data.
   */
  upload<T = any>(url: string, path: string, type?: 'image' | 'video' | 'audio'): Promise<T>;
  /**
   * 七牛云上传
   * @param {string} url - 将文件上传到的URL。
   * @param {string} path - 要上传的文件的路径。
   * @param {string} key - 唯一的文件名
   * @param {string} token - 七牛云上传的token
   * @return {Promise<T>} A promise that resolves with the uploaded data.
   */
  qiniu<T = any>(url: string, path: string, key: string, token: string): Promise<T>;
}
~~~