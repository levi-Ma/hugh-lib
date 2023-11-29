# 使用

### @hugh-ma/utils
安装之后，需要在 `main.ts` 中设置一些必要的参数，`HughConfig` 中所有的属性都可以替换，按照项目来设置就可以

### Usage Functions
~~~typescript
// main.ts

// 引入插件
import { HughConfig } from '@hugh-ma/utils'
// 设置AccessToken对应的Key，默认是 Authorization
HughConfig.authorizationHeaderKey = 'token'
// 设置接口根路径
HughConfig.apiRoot = 'http://examples.com'
// 设置静态资源根目录 (如果后端返回的静态资源地址不是全地址的话就设置这个)
HughConfig.staticUrl = 'http://examples.com'
// 设置路由根地址，默认是 'views'
HughConfig.routerRoot = 'pages'
~~~

### Type Declarations
~~~typescript
/**
 * # hughConfig 配置文件
 * @category Config
 * @module hughConfig
 * @author HughMa
 */

declare class HughConfig {
  /**
   * ## 版本号
   */
  static readonly version: string;
  /**
   * ## AppKey
   * @description 用于处理一些唯一场景做项目区分 以及Oath2.0的AppKey
   */
  static appKey: string;
  /**
   * ## AppKey Header
   */
  static appKeyHeader: string;
  /**
   * ## 路由根地址
   * e.g. /pages/index/index => pages
   * e.g. /views/index/index => views
   */
  static routerRoot: string;
  /**
   * ## 静态资源根目录
   */
  static staticUrl: string;
  /**
   * ## 接口根路径
   */
  static apiRoot: string;
  /**
   * ## 默认的文件上传地址
   */
  static uploadUrl: string;
  /**
   * ## AccessToken对应的Key 默认为 Authorization
   */
  static authorizationHeaderKey: string;
  /**
   * ## Http返回状态码的字段
   */
  static httpCodeKey: string;
  /**
   * ## Http返回消息的字段
   */
  static httpMessageKey: string;
  /**
   * ## Http返回数据的字段
   */
  static httpDataKey: string;
  /**
   * ## Http返回成功状态码
   */
  static successCode: HughCode | number;
  /**
   * ## Http返回未登录状态码
   */
  static unauthorizedCode: HughCode | number;
  /**
   * ## 保存AccessToken
   */
  static saveAccessToken(accessToken: string): void;
  /**
   * ## 获取AccessToken
   */
  static getAccessToken(): string;
  /**
   * ## 清除AccessToken
   */
  static clearAccessToken(): void;
  /**
   * ## 权限列表
   */
  static permissions: string[];
  /**
   * ## 是否有权限
   * @param {string} permission - 权限名称
   */
  static hasPermission(permission: string): boolean;
  /**
   * ## 默认的格式化时间
   * @description 默认格式化时间为：yyyy-MM-dd HH:mm:ss
   */
  static dateTimeFormat: HughDateTimeFormatter;
}
~~~
