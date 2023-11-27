/**
 * # 表单验证工具
 * @category Helper
 * @class HughValidator
 * @author HughMa
 */

import { HughInputType } from '../enum/HughInputType';

export class HughValidator {
  /**
   * ## 默认的进制
   */
  private static readonly DEFAULT_RADIX = 10;

  /**
   * ## 验证是否邮箱
   * @param {string} str - 邮箱
   * @returns {boolean} 是否是邮箱
   */
  static isEmail(str: string): boolean {
    return /^[a-zA-Z0-9]+(\.([a-zA-Z0-9]+)){0,}@[a-zA-Z0-9]+(\.([a-zA-Z0-9]+)){1,}$/.test(str);
  }

  /**
   * ## 验证是否手机号里
   * @param {string} str - 号码
   * @returns {boolean} - 是否是手机号
   */
  static isMobilePhone(str: string): boolean {
    return /^(\+(\d{1,4})){0,1}1[3-9](\d{9})$/.test(str);
  }

  /**
   * ## 验证是否座机号
   * @param {string} str - 号码
   * @returns {boolean} - 是否是座机号
   */
  static isTelPhone(str: string): boolean {
    return /^(((0\d{2,3})-){0,1}((\d{7,8})|(400\d{7})|(800\d{7}))(-(\d{1,4})){0,1})$/.test(str);
  }

  /**
   * ## 是否是纯汉字
   * @param {string} str - 字符串
   * @returns {boolean} - 是否是纯汉字
   */
  static isChinese(str: string): boolean {
    return new RegExp(String.raw`^[${HughInputType.CHINESE}]+$`).test(str);
  }

  /**
   * ## 字符串是否只包含了字母
   * @param {string} str - 字符串
   * @returns {boolean} - 是否只包含了字母
   */
  static isOnlyLetter(str: string): boolean {
    return new RegExp(String.raw`^[${HughInputType.LETTER}]+$`).test(str);
  }

  /**
   * ## 字符串是否只包含了数字
   * @param {string} str - 字符串
   * @returns {boolean} - 是否只包含了数字
   */
  static isOnlyNumberAndLetter(str: string): boolean {
    return new RegExp(String.raw`^[${HughInputType.LETTER + HughInputType.NUMBER}]+$`).test(str);
  }

  /**
   * ## 字符串是否是数字 正负整数小数和0
   * @param {string} str - 字符串
   * @returns {boolean} - 是否是数字
   */
  static isNumber(str: string): boolean {
    return /^(-){0,1}[0-9]+((.)[0-9]+){0,1}$/.test(str);
  }

  /**
   * ## 字符串是否是整数
   * @param {string} str - 字符串
   * @returns {boolean} - 是否是整数
   */
  static isInteger(str: string): boolean {
    return /^(-){0,1}[0-9]+$/.test(str);
  }

  /**
   * ## 字符串是否是自然整数小数
   * @param {string} str - 字符串
   * @returns {boolean} - 是否是自然整数小数
   */
  static isNaturalNumber(str: string): boolean {
    return /^[0-9]+((.)[0-9]+){0,1}$/.test(str);
  }

  /**
   * ## 字符串是否是自然整数数
   * @param {string} str - 字符串
   * @returns {boolean} - 是否是自然整数数
   */
  static isNaturalInteger(str: string): boolean {
    return /^[0-9]+$/.test(str);
  }

  /**
  * ## 简单身份证校验
  * @param {string} str 字符串
  */
  static isSimpleChineseIdCard(str: string):boolean {
    return /^[0-9]{17}[\dXx]$/.test(str)
  }

  /**
   * ## 字符串是否是合法身份证
   * @param {string} str - 字符串
   * @returns {boolean} - 是否是合法身份证
   */
  static isChineseIdCard(str: string): boolean {
    if (str.length !== 18 && str.length !== 15) {
      return false;
    }

    if (str.length === 18) {
      const year = parseInt(str.substring(6), this.DEFAULT_RADIX);
      if (year > new Date().getFullYear() || year < 1900) {
        return false;
      }
      const month = parseInt(str.substring(10, 12), this.DEFAULT_RADIX);
      if (month > 12 || month < 1) {
        return false;
      }
      const day = parseInt(str.substring(12, 14), this.DEFAULT_RADIX);
      if (day > 31 || month < 1) {
        return false;
      }
      const arr: Array<Array<number | 'X'>> = [
        [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      ];
      let sum = 0;
      for (let i = 0; i < 17; i += 1) {
        sum += parseInt(str[i], this.DEFAULT_RADIX) * (arr[0][i] as number);
      }
      if (arr[1][sum % 11] == str[17]) {
        return true;
      }
    }

    if (str.length === 15) {
      const reg =
        /^[1-9]\d{5}((\d{2}(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[13456789]|1[012])(0[1-9]|[12][0-9]|30))|(02(0[1-9]|1[0-9]|2[0-8]))))|(((0[48]|[2468][048]|[13579][26])|(00))0229))\d{2}[0-9Xx]$/;
      if (reg.test(str)) {
        return true;
      }
    }
    return false;
  }

  /**
   * ## 验证是否手机号或座机号
   * @param {string} phoneNumber - 号码
   * @returns {boolean} 是否是手机号或座机号
   */
  static isTelPhoneOrMobilePhone(phoneNumber: string): boolean {
    return this.isMobilePhone(phoneNumber) || this.isTelPhone(phoneNumber);
  }

  /**
   * ## 是否满足如下的规则
   * @param {string} str - 被验证字符串
   * @param {HughInputType} list - 验证器
   * @returns {boolean} - 是否满足
   */
  static validate(str: string, ...list: HughInputType[]): boolean {
    let regString = '';
    for (let i = 0; i < list.length; i += 1) {
      regString += list[i];
    }
    try {
      return new RegExp(String.raw`^[${regString}]+$`).test(str);
    } catch (e) {
      return false;
    }
  }
}