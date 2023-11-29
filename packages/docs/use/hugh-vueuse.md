# 使用

### @hugh-ma/vueuse
`@hugh-ma/vueuse` 导出了两个方法，引入后直接使用即可

### Usage Functions
> 微信小程序检查版本更新方法: useCheckUpdate
~~~vue
<!-- App.vue -->
<script setup lang="ts">
import { useCheckUpdate } from '@hugh-ma/vueuse'

const { checkUpdate } = useCheckUpdate()

onShow(() => {
  // 在 onShow 方法中调用 checkUpdate 微信小程序检查版本更新方法
  console.log('App Show')
  checkUpdate()
})
</script>
~~~

> 封装 uniStorage 的缓存方法: useUniStorage

通过 `useUniStorage` 方法设置的 `key` 和 `value` 会以键值对的方式存储到 `Storage`

`value` 可以是任何值
~~~typescript
// store.ts
import { useUniStorage } from '@hugh-ma/vueuse'

export const useCounterStore = defineStore('counter', () => {
  const count = useUniStorage('count', 0);

  function increment() {
    count.value++;
  }

  return {
    count,
    increment
  };
});
~~~

~~~ vue
<!-- index.vue -->
<script setup lang="ts">
import { useUniStorage } from '@hugh-ma/vueuse'

const number = useUniStorage('count', 0)
</script>

<template>
  <view class="container">
    <view>{{ number }}</view>
  </view>
</template>
~~~

### Type Declarations
~~~typescript
/**
 * 微信小程序检查版本更新
 */
declare function useCheckUpdate(): {
    checkUpdate: () => void;
};

/**
 * useUniStorage
 * @description: 一个封装 uniStorage 的缓存方法
 * @param key - [string] 缓存对象的 key
 * @param initialValue - any 缓存对象的初始值
 */
declare function useUniStorage(key: string, initialValue: any): any;

export { useCheckUpdate, useUniStorage };
~~~