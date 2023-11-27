/**
 * # 文件助手类
 * @category Helper
 * @class HughFile
 * @author HughMa
 */
import { HughConfig } from "../config"
export class HughFile {
  /**
   * ## 文件大小计算常量
   */
  static readonly FILE_SIZE_CALCULATION_CONSTANT = 1024

  /**
   * ## 文件大小单位
   */
  static readonly FILE_SIZE_UNIT = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  /**
   * ## 字节转换为文件大小单位
   * @param {number} size - 字节数
   * @param {number} fractionDigits - 小数位数
   */
  static getFileSizeFriendly(size: number, fractionDigits = 2): string {
    let res = ''
    for (let i = 0; i < this.FILE_SIZE_UNIT.length; i += 1) {
      if (size < this.FILE_SIZE_CALCULATION_CONSTANT ** (i + 1)) {
        res = `${(size / (this.FILE_SIZE_CALCULATION_CONSTANT ** i)).toFixed(fractionDigits)}${this.FILE_SIZE_UNIT[i]}`
        break
      }
      res = 'LARGE'
    }
    return res
  }

  /**
   * ## 获取静态文件的绝对地址
   * @param {string} url - 文件相对路径
   */
  static getStaticFileUrl(url: string): string {
    if (!url) {
      return ''
    }
    if (url.includes('https://') || url.includes('http://')) {
      return url
    }
    return HughConfig.staticUrl + url
  }
}