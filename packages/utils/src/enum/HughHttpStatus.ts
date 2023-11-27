/**
 * # Http状态码枚举
 * @category Enum
 * @class HughHttpStatus
 * @author HughMa
 */
export enum HughHttpStatus {
  /**
   * ## 请求正常
   */
  OK = 200,

  /**
   * ## 请求参数不正确
   */
  BAD_REQUEST = 400,

  /**
   * ## 鉴权失败
   */
  UNAUTHORIZED = 401,

  /**
   * ## 请求未授权
   */
  FORBIDDEN = 403,

  /**
   * ## 请求地址不存在
   */
  NOT_FOUND = 404,

  /**
   * ## 不允许的方法
   */
  METHOD_NOT_ALLOWED = 405,

  /**
   * ## 服务器内部异常
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * ## 服务器授权异常
   */
  SERVICE_UNAVAILABLE = 501,
}

