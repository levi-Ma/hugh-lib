import { describe, expect, it } from 'vitest'
import { HughValidator } from '../src'

describe('hughValidator', () => {
  it('验证是否邮箱', () => {
    expect(HughValidator.isEmail('qq@qq.com')).toBe(true)
  })

  it('验证是否手机号码', () => {
    expect(HughValidator.isMobilePhone('13066661213')).toBe(true)
  })

  it('验证是否座机号', () => {
    expect(HughValidator.isTelPhone('0936-4211235')).toBe(true)
  })

  it('验证是否手机号码（宽松）', () => {
    expect(HughValidator.isMobilePhoneLoose('13066661213')).toBe(true)
  })

  it('验证是否手机号码（严谨）', () => {
    expect(HughValidator.isMobilePhoneRigorous('13066661213')).toBe(true)
  })

  it('验证是否是纯汉字', () => {
    expect(HughValidator.isChinese('中国')).toBe(true)
  })

  it('验证字符串是否只包含字母', () => {
    expect(HughValidator.isOnlyLetter('abcd')).toBe(true)
  })

  it('验证字符串是否只包含字母和数字', () => {
    expect(HughValidator.isOnlyNumberAndLetter('abcd1234')).toBe(true)
  })

  it('验证字符串是否是数字', () => {
    expect(HughValidator.isNumber('123.45')).toBe(true)
  })

  it('验证字符串是否是整数', () => {
    expect(HughValidator.isInteger('123')).toBe(true)
  })

  it('验证字符串是否是自然整数小数', () => {
    expect(HughValidator.isNaturalNumber('123.45')).toBe(true)
  })

  it('验证字符串是否是自然整数', () => {
    expect(HughValidator.isNaturalInteger('123')).toBe(true)
  })

  it('验证是否是简单身份证', () => {
    expect(HughValidator.isSimpleChineseIdCard('12345678901234567X')).toBe(true)
  })

  it('验证字符串是否是合法身份证', () => {
    expect(HughValidator.isChineseIdCard('123456789012345678')).toBe(false)
  })

  it('验证是否是手机号或座机号', () => {
    expect(HughValidator.isTelPhoneOrMobilePhone('13066661213')).toBe(true)
  })

  it('验证字符串是否满足指定规则', () => {
    expect(HughValidator.validate('G1868', /^[GCDZTSPKXLY1-9]\d{1,4}$/)).toBe(true)
  })
})
