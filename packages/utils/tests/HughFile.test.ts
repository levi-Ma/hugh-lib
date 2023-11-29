import { describe, expect, it } from 'vitest'
import { HughConfig, HughFile } from '../src'

HughConfig.staticUrl = 'https://example.com/static/'

describe('hughFile', () => {
  it('字节转换为文件大小单位', () => {
    expect(HughFile.getFileSizeFriendly(1073741824, 0)).toBe('1GB')
  })

  it('获取静态文件的URL', () => {
    const url = 'image.jpg'
    const expectedUrl = 'https://example.com/static/image.jpg'
    const result = HughFile.getStaticFileUrl(url)
    expect(result).toBe(expectedUrl)
  })

  it('获取静态文件的URL - 不包含http或https', () => {
    const url = 'image.jpg'
    const expectedUrl = 'https://example.com/static/image.jpg'
    const result = HughFile.getStaticFileUrl(url)
    expect(result).toBe(expectedUrl)
  })

  it('获取静态文件的URL - URL为空', () => {
    const url = ''
    const expectedUrl = ''
    const result = HughFile.getStaticFileUrl(url)
    expect(result).toBe(expectedUrl)
  })
})
