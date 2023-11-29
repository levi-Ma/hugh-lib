import { describe, expect, it } from 'vitest'
import { HughDateTime } from '../src'

describe('hughDateTime', () => {
  it('格式化到Unix秒时间戳（默认当前时间）', () => {
    expect(HughDateTime.toUnixTime('Tue Nov 28 2023 16:45:17 GMT+0800 (中国标准时间)')).toBe(1701161117)
  })

  it('格式化到Unix毫秒时间戳（默认当前时间）', () => {
    expect(HughDateTime.toUnixMilliTime('Tue Nov 28 2023 16:45:17 GMT+0800 (中国标准时间)')).toBe(1701161117000)
  })

  it('从字符串或对象格式化时间', () => {
    expect(HughDateTime.formatFromDate(1701161117000)).toBe('2023-11-28 16:45:17')
  })

  it('从秒时间戳格式化时间', () => {
    expect(HughDateTime.formatFromSeconds(1701161117)).toBe('2023-11-28 16:45:17')
  })

  it('从Unix毫秒时间戳格式化时间', () => {
    expect(HughDateTime.formatFromMilliSeconds(1701161117000)).toBe('2023-11-28 16:45:17')
  })

  it('格式化到友好字符串显示', () => {
    expect(HughDateTime.getFriendlyDateTime('')).toBe('刚刚')
  })
})
