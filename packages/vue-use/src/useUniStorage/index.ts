import { shallowRef, unref, watch } from "vue";

/**
 * useUniStorage
 * @description: 一个封装 uniStorage 的缓存方法
 * @param key - [string] 缓存数组的key
 * @param initialValue - [any] 缓存数组的初始值
 */
export function useUniStorage(key: string, initialValue: any) {
  // 统一处理通过 try catch 捕获到的错误
  const onError = (e: any) => {
    console.error(e);
  };

  // 如果缓存中有 key 对应的值, 则将缓存中的值赋值给 data 否则将 initialValue 赋值给 data
  const data = !!read(key) ? shallowRef(read(key)) : shallowRef(initialValue);

  // unref 是一个方法, 用于解除 ref 对象的引用, 也就是说如果 initialValue 是一个 ref 对象, 则 unref(initialValue) 将返回 initialValue.value
  const rawInit = unref(initialValue);

  // 这段代码是将 data 的值写入到缓存中, 并且当 data 的值发生变化时, 也会将 data 的值写入到缓存中
  watch(data, (newVal) => {
    write(newVal);
  });

  // 目标: 将key对应的v写入到缓存中
  // 如果 v == null 清除缓存中 key 的值
  // 如果 v != null 将 key 到缓存中, 值为 转化为字符串的 v
  // 并调用 update方法 获取缓存中 key 对应的 v 赋值给 data
  function write(v: any) {
    try {
      if (v == null) uni.removeStorageSync(key);
      else {
        uni.removeStorage({
          key,
          success: function () {
            uni.setStorageSync(key, JSON.stringify(v));
          }
        });
      }
      update(v);
    } catch (e) {
      onError(e);
    }
  }

  // 目标: 获取 key 对应的 v, 使用 JSON.parse 将 v 转化为 js对象返回出去
  function read(event: string) {
    if (event !== key) return;
    try {
      if (event == null) {
        if (rawInit !== null) {
          write(rawInit);
        }
        return rawInit;
      } else if (typeof event !== 'string') {
        return event;
      } else {
        const storage = uni.getStorageSync(event);
        if (storage) return JSON.parse(uni.getStorageSync(event));
      }
    } catch (e) {
      onError(e);
    }
  }

  // 目标: 调用 read 方法将获取到的 v 返回给data
  function update(event: any) {
    if (event !== key) return;
    data.value = read(event);
  }

  return data;
}
