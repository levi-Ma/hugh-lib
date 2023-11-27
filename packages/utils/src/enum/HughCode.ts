/**
 * # Http返回状态码枚举
 * @category Enum
 * @class HughCode
 * @author HughMa
 */
export enum HughCode {
  /**
   * ## 成功
   */
  SUCCESS = 200,

  /**
   * ## 未登录
   */
  UNAUTHORIZED = 401,

  /**
   * ## 未授权
   * @description 一般是指没有权限访问
   */
  FORBIDDEN = 403,

  /**
   * ## 未找到
   * @description 一般是指请求的资源不存在
   */
  NOT_FOUND = 404,

  /**
   * ## 服务器错误
   */
  ERROR = 500,
}