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
   * @param str 要判断的字符串
   * @returns 如果是邮箱则返回 true，否则返回 false
   */
  static isEmail(str: string): boolean {
    return /^[a-zA-Z0-9]+(\.([a-zA-Z0-9]+)){0,}@[a-zA-Z0-9]+(\.([a-zA-Z0-9]+)){1,}$/.test(str);
  }

  /**
   * ## 验证是否手机号码 （最宽松，只要是1开头即可，建议手机号接受短信选择）
   * @param str 要判断的字符串
   * @returns 如果是电话号码则返回 true，否则返回 false
   */
  static isMobilePhone(str: string): boolean {
    return /^(\+(\d{1,4})){0,1}1[3-9](\d{9})$/.test(str);
    // return /^(?:(?:\+|00)86)?1\d{10}$/.test(str);
  }

  /**
   * ## 验证是否手机号码 （宽松，只要是13,14,15,16,17,18,19开头即可）
   * @param str 要判断的字符串
   * @returns 如果是电话号码则返回 true，否则返回 false
   */
  static isMobilePhoneLoose(str: string): boolean {
    // return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(str)
    return /^1[3-9]\d{9}$/.test(str)
  }

  /**
   * ## 验证是否手机号码 （严谨，2023.4月手机号段）
   * @param str 要判断的字符串
   * @returns 如果是电话号码则返回 true，否则返回 false
   */
  static isMobilePhoneRigorous(str: string): boolean {
    // [130, 131, 132, 133, 135, 136, 137, 138, 139]
    // [145, 147, 148, 149]
    // [150, 151, 152, 153, 155, 156, 157, 158, 159]
    // [166, 167]
    // [171, 172, 173, 175, 176, 177, 178]
    // [180, 181, 182, 183, 184, 185, 186, 187, 188, 189]
    // [190, 191, 192, 193, 195, 196, 197, 198, 199]
    // 特殊号段：[1340-1348, 1440]
    // 1349为卫星通讯号段
    if (str.slice(0, 4) === '1440') {
      return /^(?:(?:\+|00)86)?1(?:(?:44[0]))\d{7}$/.test(str)
    }

    if (str.slice(0, 2) === '14') {
      return /^(?:(?:\+|00)86)?1(?:(?:4[5-79]))\d{8}$/.test(str)
    }

    // return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[0-35-9]))\d{8}$/.test(str)
    return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[0-35-9]))\d{8}$/.test(str)
  }
  
  /**
   * ## 判断字符串是否为电话号码。
   * 
   * @param str 要判断的字符串
   * @returns 如果是电话号码则返回 true，否则返回 false
   * @example 
   * // e.g. 0936-4211235, 89076543, 010-12345678-1234
   * HughValidator.isTelPhone('0936-4211235'); // return true
   */
  static isTelPhone(str: string): boolean {
    return /^(((0\d{2,3})-){0,1}((\d{7,8})|(400\d{7})|(800\d{7}))(-(\d{1,4})){0,1})$/.test(str);
  }

  /**
   * ## 判断字符串是否为中文。
   * 
   * @param str 要判断的字符串
   * @returns 如果字符串全部由中文字符组成，则返回 true；否则返回 false。
   */
  static isChinese(str: string): boolean {
    return new RegExp(String.raw`^[${HughInputType.CHINESE}]+$`).test(str);
  }

  /**
   * ## 判断字符串是否只包含字母。
   * 
   * @param str 要检查的字符串
   * @returns 如果字符串只包含字母，则返回 true；否则返回 false
   */
  static isOnlyLetter(str: string): boolean {
    return new RegExp(String.raw`^[${HughInputType.LETTER}]+$`).test(str);
  }

  /**
   * ## 判断字符串是否只包含数字和字母。
   * 
   * @param str 要检查的字符串
   * @returns 如果字符串只包含数字和字母，则返回 true；否则返回 false。
   */
  static isOnlyNumberAndLetter(str: string): boolean {
    return new RegExp(String.raw`^[${HughInputType.LETTER + HughInputType.NUMBER}]+$`).test(str);
  }
  
  /**
   * ## 判断一个字符串是否是数字 正负整数小数和0
   * 
   * @param str 要判断的字符串
   * @returns 如果字符串是数字，则返回true；否则返回false
   */
  static isNumber(str: string): boolean {
    return /^(-){0,1}[0-9]+((.)[0-9]+){0,1}$/.test(str);
  }

  /**
   * ## 字符串是否是整数
   * 
   * @param str 要判断的字符串
   * @returns 如果字符串是整数，则返回true；否则返回false
   */
  static isInteger(str: string): boolean {
    return /^(-){0,1}[0-9]+$/.test(str);
  }
  
  /**
   * ## 字符串是否是自然整数小数
   * 
   * @param str 要判断的字符串
   * @returns 如果是自然数则返回true，否则返回false
   */
  static isNaturalNumber(str: string): boolean {
    return /^[0-9]+((.)[0-9]+){0,1}$/.test(str);
  }

  /**
   * ## 判断一个字符串是否为自然数。
   * 
   * @param str 要判断的字符串
   * @returns 如果字符串是自然数，则返回true；否则返回false。
   */
  static isNaturalInteger(str: string): boolean {
    return /^[0-9]+$/.test(str);
  }
  
  /**
   * ## 简单身份证校验
   * 
   * @param str 要验证的字符串
   * @returns 如果是简单的中国身份证号码，则返回true；否则返回false。
   */
  static isSimpleChineseIdCard(str: string):boolean {
    return /^[0-9]{17}[\dXx]$/.test(str)
  }
  
  /**
   * ## 字符串是否是合法身份证
   * 
   * @param str 要验证的身份证号码
   * @returns 如果是有效的身份证号码，则返回 true；否则返回 false
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
   * ## 判断给定的字符串是否为手机号码或固定电话号码。
   * 
   * @param phoneNumber 要验证的电话号码
   * @returns 如果是手机号码或固定电话号码，则返回true；否则返回false。
   */
  static isTelPhoneOrMobilePhone(phoneNumber: string): boolean {
    return this.isMobilePhone(phoneNumber) || this.isTelPhone(phoneNumber);
  }

  /**
   * ## 验证给定字符串是否符合指定的正则表达式。
   * 
   * @param str 要验证的字符串
   * @param reg 用于验证的正则表达式
   * @returns 如果字符串符合正则表达式，则返回true；否则返回false
   */
  static validate(str: string, reg: RegExp): boolean {
    try {
      return reg.test(str)
    } catch (e) {
      return false;
    }
  }
}
