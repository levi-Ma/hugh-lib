interface HughMaDocument {
  /** 方法名 */
  name: string
  /** 所属包目录 */
  package?: string
  /** 所属方法路径 */
  function?: string
  /** 更新时间 */
  lastUpdated: number
  /** 方法分类 */
  category?: string
  /** 方法文档 */
  docs?: string
  /** 方法说明 */
  description?: string
  /** 是否弃用 */
  deprecated?: boolean
}

interface PackageIndexes {
  categories: string[]
  documents: HughMaDocument[]
}
