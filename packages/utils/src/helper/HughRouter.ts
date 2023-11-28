
/**
 * # 路由助手
 * @category Helper
 * @class HughRouter
 * @author HughMa
 */
import { HughConfig } from "../config"
import type { IJson } from '../interface/IJson';

export class HughRouter {
  /**
   * ## 打开子页面
   * @param {string} url - 页面
   * @param {IJson} [param] - [可选]JSON参数
   */
  static go(url: string, param?: IJson) {
    if (param) {
      const keys = Object.keys(param);
      url += keys.length
        ? '?' + keys.map(key => `${key}=${param[key]}`).join('&')
        : '';
    }

    uni.navigateTo({
      url: `/${HughConfig.routerRoot}/${url}`
    });
  }

  /**
   * ## 重定向页面
   * @param {string} url - 页面
   */
  static replace(url: string) {
    uni.redirectTo({
      url: `/${HughConfig.routerRoot}/${url}`
    });
  }

  /**
   * ## 跳转tabBar页面
   * @param {string} url - 页面
   */
  static switchTab(url: string) {
    uni.switchTab({
      url: `/${HughConfig.routerRoot}/${url}`
    });
  }

  /**
   * ## 返回上一页
   */
  static back() {
    uni.navigateBack();
  }
}
