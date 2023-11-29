# Utils

工具集

## Installation

::: code-group

```sh [npm]
$ npm i @hugh-ma/utils
$ npm i axios@0.27.2 # 使用 HughHttp 方法需要安装axios 0.27.2 版本
```

```sh [pnpm]
$ pnpm add @hugh-ma/utils
$ pnpm add axios@0.27.2 # 使用 HughHttp 方法需要安装axios 0.27.2 版本
```

```sh [yarn]
$ yarn add @hugh-ma/utils
$ yarn add axios@0.27.2 # 使用 HughHttp 方法需要安装axios 0.27.2 版本
```
:::

## Menu Tree

```bash
@hugh-ma/utils
├─ config # 配置文件 可覆盖
├─ enum # 枚举
│    ├─ HughCode # Http返回状态码枚举
│    ├─ HughColor # 标准颜色值枚举
│    ├─ HughDateTimeFormatter # 标准时间格式化枚举
│    ├─ HughHttpStatus # Http状态码枚举
│    ├─ HughInputType # 允许输入的数据类型枚举
│    └─ HughSortType # 排序方式枚举
├─ feedback # 交互反馈
│    ├─ HughAlert # HughAlert 交互反馈 - 模态弹窗(消息)
│    ├─ HughLoading # HughLoading 交互反馈 - 加载
│    └─ HughMessage # HughMessage 交互反馈 - 消息提示框
├─ helper # 方法类
│    ├─ HughDateTime # 时间日期工具类
│    ├─ HughFile # 文件助手类
│    ├─ HughHttp # 请求类
│    ├─ HughRouter # 路由助手
│    └─ HughValidator # 表单验证工具
└─ interface # 类型定义
     └─ IJson # 标准JSON接口
```