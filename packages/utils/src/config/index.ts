/**
 * # hughConfig 配置文件
 * @category Config
 * @module hughConfig
 * @author HughMa
 */
import { HughCode } from '../enum/HughCode';
import { HughDateTimeFormatter } from '../enum/HughDateTimeFormatter';

export class HughConfig {
  /**
   * ## 版本号
   */
  static readonly version: string = '0.0.1';

  /**
   * ## AppKey
   * @description 用于处理一些唯一场景做项目区分 以及Oath2.0的AppKey
   */
  static appKey: string = 'hugh';

  /**
   * ## AppKey Header
   */
  static appKeyHeader = 'appKey';

  /**
   * ## 路由根地址
   * e.g. /pages/index/index => pages
   * e.g. /views/index/index => views
   */
  static routerRoot = 'views'

  /**
   * ## 静态资源根目录
   * @description 以 '/' 结尾
   */
  static staticUrl = ''

  /**
   * ## 接口根路径
   * @description 以 '/' 结尾
   */
  static apiRoot = '';

  /**
   * ## 默认的文件上传地址
   */
  static uploadUrl = '';

  /**
   * ## AccessToken对应的Key
   */
  static authorizationHeaderKey = 'Authorization';

  /**
   * ## Http返回状态码的字段
   */
  static httpCodeKey = 'code';

  /**
   * ## Http返回消息的字段
   */
  static httpMessageKey = 'msg';

  /**
   * ## Http返回数据的字段
   */
  static httpDataKey = 'result';

  /**
   * ## Http返回成功状态码
   */
  static successCode: HughCode | number = HughCode.SUCCESS;

  /**
   * ## Http返回未登录状态码
   */
  static unauthorizedCode: HughCode | number = HughCode.UNAUTHORIZED;

  /**
   * ## 保存AccessToken
   */
  static saveAccessToken(accessToken: string): void {
    uni.setStorageSync(this.authorizationHeaderKey, accessToken);
  }

  /**
   * ## 获取AccessToken
   */
  static getAccessToken(): string {
    return uni.getStorageSync(this.authorizationHeaderKey) || '';
  }

  /**
   * ## 清除AccessToken
   */
  static clearAccessToken(): void {
    uni.removeStorageSync(this.authorizationHeaderKey);
  }

  /**
   * ## 权限列表
   */
  static permissions: string[] = [];

  /**
   * ## 是否有权限
   * @param {string} permission - 权限名称
   */
  static hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  /**
   * ## 默认的格式化时间
   * @description 默认格式化时间为：yyyy-MM-dd HH:mm:ss
   */
  static dateTimeFormat = HughDateTimeFormatter.YYYY_MM_DD_HH_MM_SS;
}
