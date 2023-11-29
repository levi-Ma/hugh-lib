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

    let dateInstance: Date;

    if (typeof date === 'number') {
      // 直接使用时间戳创建日期对象
      dateInstance = new Date(date);
    } else if (typeof date === 'string') {
      dateInstance = new Date(date);
      // 检查日期是否有效
      if (isNaN(dateInstance.getTime())) {
        throw new Error('Invalid date string format');
      }
    } else if (date instanceof Date) {
      dateInstance = date;
    } else {
      throw new Error('Invalid date parameter');
    }

    // 使用 padStart 方法来确保月份和日期的前导零
    const pad = (n: number) => n < 10 ? '0' + n : n.toString();

    const dateObj: IJson = {
      YYYY: dateInstance.getFullYear().toString(),
      M: (dateInstance.getMonth() + 1).toString(),
      D: dateInstance.getDate().toString(),
      H: dateInstance.getHours().toString(),
      m: dateInstance.getMinutes().toString(),
      s: dateInstance.getSeconds().toString(),
      MM: pad(dateInstance.getMonth() + 1),
      DD: pad(dateInstance.getDate()),
      HH: pad(dateInstance.getHours()),
      mm: pad(dateInstance.getMinutes()),
      ss: pad(dateInstance.getSeconds())
    };

    return formatString.replace(/(YYYY|MM?|DD?|HH?|mm?|ss?)/g, (key) => dateObj[key]);
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
    const nowTimeStamps: number = new Date().getTime();
    let oldTimeStamp: number;

    if (typeof date === 'number') {
      oldTimeStamp = date;
    } else {
      oldTimeStamp = new Date(date).getTime();
    }

    const diffTimeStamp = Math.abs(nowTimeStamps - oldTimeStamp);

    // 定义一些常量来改善可读性
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY; // 简化计算，假设每月30天
    const YEAR = 365 * DAY;
    const CENTURY = 100 * YEAR;

    // 计算时间差
    if (diffTimeStamp >= CENTURY) {
      return `${Math.floor(diffTimeStamp / CENTURY)}世纪${oldTimeStamp > nowTimeStamps ? '后' : '前'}`;
    }
    if (diffTimeStamp >= YEAR) {
      return `${Math.floor(diffTimeStamp / YEAR)}年${oldTimeStamp > nowTimeStamps ? '后' : '前'}`;
    }
    if (diffTimeStamp >= MONTH) {
      return `${Math.floor(diffTimeStamp / MONTH)}月${oldTimeStamp > nowTimeStamps ? '后' : '前'}`;
    }
    if (diffTimeStamp >= WEEK) {
      return `${Math.floor(diffTimeStamp / WEEK)}周${oldTimeStamp > nowTimeStamps ? '后' : '前'}`;
    }
    if (diffTimeStamp >= DAY) {
      return `${Math.floor(diffTimeStamp / DAY)}天${oldTimeStamp > nowTimeStamps ? '后' : '前'}`;
    }
    if (diffTimeStamp >= HOUR) {
      return `${Math.floor(diffTimeStamp / HOUR)}小时${oldTimeStamp > nowTimeStamps ? '后' : '前'}`;
    }
    if (diffTimeStamp >= MINUTE) {
      return `${Math.floor(diffTimeStamp / MINUTE)}分钟${oldTimeStamp > nowTimeStamps ? '后' : '前'}`;
    }
    if (diffTimeStamp >= SECOND) {
      return `${Math.floor(diffTimeStamp / SECOND)}秒${oldTimeStamp > nowTimeStamps ? '后' : '前'}`;
    }
    return '刚刚';
  }
}
