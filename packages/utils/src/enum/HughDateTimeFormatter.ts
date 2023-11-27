/**
 * # 标准时间格式化枚举
 * @category Util
 * @class HughDateTimeFormatter
 * @author HughMa
 */
export enum HughDateTimeFormatter {
  /**
   * ## 标准时间格式
   * e.g. 1970-01-01 00:00:00
   */
  YYYY_MM_DD_HH_MM_SS = 'yyyy-MM-dd HH:mm:ss',

  /**
   * ## 毫秒时间戳
   * e.g. 15061231312312
   */
  TIMESTAMP = 'x',

  /**
   * ## 月-日 时:分
   * e.g. 01-01 00:00
   */
  MM_DD_HH_mm = 'MM-dd HH:mm',
  
  /**
   * ## 年-月-日
   * e.g. 1970-01-01
   */
  YYYY_MM_DD = 'YYYY-MM-DD',

  /**
   * ## 时:分:秒
   * e.g. 00:00:00
   */
  HH_mm_ss = 'HH:mm:ss',
}