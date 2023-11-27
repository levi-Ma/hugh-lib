/**
 * # 时间日期工具类
 * @category Util
 * @class HughDateTime
 * @author HughMa
 */
import { HughConfig } from '../config';
import type { HughDateTimeFormatter } from '../enum/HughDateTimeFormatter';
import type { IJson } from '../interface/IJson';
export class HughDateTime {
  /**
   * ## 格式化到Unix秒时间戳（默认当前时间）
   * @param {Date|string} [date] - [可选], Data对象/时间字符串
   */
  static toUnixTime(date?: Date | string): number {
    if (date) {
      if (typeof date === 'string') {
        date = new Date(date);
      }
    } else {
      date = new Date();
    }
    return Math.floor(this.toUnixMilliTime(date) / 1000);
  }

  /**
   * ## 格式化到Unix毫秒时间戳（默认当前时间）
   * @param {Date|string} [date] - [可选], Data对象/时间字符串
   * @description
   *  1. 1秒 = 1000毫秒
   *  2. new Date().getTime() 和 new Date().valueOf() 都可以用来获取当前时间的时间戳
   *  3. 但是在IE8中，new Date().getTime() 返回的是一个字符串，而不是数值
   *  4. 所以为了得到时间戳，我们应该使用 new Date().valueOf() 方法
   */
  static toUnixMilliTime(date?: Date | string): number {
    if (!date) {
      date = new Date();
    }
    switch (typeof date) {
      case 'string':
        return new Date(date).valueOf();
      case 'object':
        if (date instanceof Date) {
          return date.valueOf();
        }
        break;
      default:
    }
    return 0;
  }

  /**
   * ## 从字符串或对象格式化时间
   * @param {Date|string|number} date - Date对象/字符串/时间戳
   * @param {string} [formatString] - [可选], 格式化模板字符串
   */
  static formatFromDate(date: Date | string | number, formatString?: string): string {
    if (!formatString) {
      formatString = HughConfig.dateTimeFormat;
    }

    if (typeof date === 'number') {
      date = date.toString()
    }

    switch (typeof date) {
      case 'string':
        date = new Date(date);
        break;
      case 'object':
        if (!(date instanceof Date)) {
          date = new Date();
        }
        break;
      default:
    }

    const dateObj: IJson = {
      YYYY: date.getFullYear(),
      M: date.getMonth() + 1,
      D: date.getDate(),
      H: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      MM: `${date.getMonth() + 101}`.substring(1),
      DD: `${date.getDate() + 100}`.substring(1),
      HH: `${date.getHours() + 100}`.substring(1),
      mm: `${date.getMinutes() + 100}`.substring(1),
      ss: `${date.getSeconds() + 100}`.substring(1)
    };

    return formatString.replace(/(YYYY|MM?|DD?|HH?|ss?|mm?)/g, (key) => dateObj[key].toString());
  }

  /**
   * ## 从秒时间戳格式化时间
   * @param {number} timestamp - 秒时间戳
   * @param {HughDateTimeFormatter|string} [formatString] - [可选], 格式化模板字符串
   * @returns {string} 格式化后的时间字符串
   */
  static formatFromSeconds(timestamp: number, formatString?: HughDateTimeFormatter | string): string {
    return this.formatFromDate(new Date(timestamp * 1000), formatString);
  }

  /**
   * ## 从Unix毫秒时间戳格式化时间
   * @param {number} timestamp - Unix毫秒时间戳
   * @param {HughDateTimeFormatter|string} [formatString] - [可选], 格式化模板字符串
   * @returns {string} 格式化后的时间字符串
   */
  static formatFromMilliSeconds(timestamp: number, formatString?: HughDateTimeFormatter | string): string {
    return this.formatFromDate(new Date(timestamp), formatString);
  }

  /**
   * # 格式化到友好字符串显示
   * @param {Date|string|number} date - Date对象/时间字符串/时间戳
   */
  static getFriendlyDateTime(date: Date | string | number): string {
    const nowTimeStamps: number = this.toUnixMilliTime(new Date());
    let oldTimeStamp = 0;
    if (typeof date === 'number') {
      oldTimeStamp = parseInt((date / 1000).toString(), 10);
    } else {
      oldTimeStamp = this.toUnixMilliTime(date);
    }
    const diffTimeStamp = Math.abs(nowTimeStamps - oldTimeStamp);
    if (oldTimeStamp > nowTimeStamps) {
      // after
      if (diffTimeStamp > 86400 * 36500) {
        return `${Math.floor(diffTimeStamp / 86400 / 100 / 31)}世纪后`;
      }
      if (diffTimeStamp > 86400 * 365) {
        return `${Math.floor(diffTimeStamp / 86400 / 365)}年后`;
      }
      if (diffTimeStamp > 86400 * 31) {
        return `${Math.floor(diffTimeStamp / 86400 / 31)}月后`;
      }
      if (diffTimeStamp > 86400 * 7) {
        return `${Math.floor(diffTimeStamp / 86400 / 7)}周后`;
      }
      if (diffTimeStamp > 86400) {
        return `${Math.floor(diffTimeStamp / 86400)}天后`;
      }
      if (diffTimeStamp > 3600) {
        return `${Math.floor(diffTimeStamp / 3600)}小时后`;
      }
      if (diffTimeStamp > 60) {
        return `${Math.floor(diffTimeStamp / 60)}分钟后`;
      }
      if (diffTimeStamp > 0) {
        return `${diffTimeStamp}秒后`;
      }
    } else {
      // before
      if (diffTimeStamp > 86400 * 36500) {
        return `${Math.floor(diffTimeStamp / 86400 / 100 / 365)}世纪前`;
      }
      if (diffTimeStamp > 86400 * 365) {
        return `${Math.floor(diffTimeStamp / 86400 / 365)}年前`;
      }
      if (diffTimeStamp > 86400 * 30) {
        return `${Math.floor(diffTimeStamp / 86400 / 30)}月前`;
      }
      if (diffTimeStamp > 86400 * 7) {
        return `${Math.floor(diffTimeStamp / 86400 / 7)}周前`;
      }
      if (diffTimeStamp > 86400) {
        return `${Math.floor(diffTimeStamp / 86400)}天前`;
      }
      if (diffTimeStamp > 3600) {
        return `${Math.floor(diffTimeStamp / 3600)}小时前`;
      }
      if (diffTimeStamp > 60) {
        return `${Math.floor(diffTimeStamp / 60)}分钟前`;
      }
      if (diffTimeStamp >= 0) {
        return '刚刚';
      }
    }
    return '未知时间';
  }
}
