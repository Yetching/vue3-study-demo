import { watch, toRaw } from "@vue/runtime-core";
import { readonly } from "@vue/reactivity";

/**
 * 
 * @param state 需要持久化的响应式对象
 * @param key 
 * @returns 持久化的store状态管理
 */

export function createPersistStorage<T>(state: any, key = 'default'): T {
  const STORAGE_KEY = '__APP_STORAGE__'

  //初始化
  Object.entries(getItem(key)).forEach(([key, value]) => {
    state[key] = value
  })

  function setItem(state: any) {
    const stateRow = getItem()
    stateRow[key] = state
    const stateStr = JSON.stringify(stateRow)
    localStorage.setItem(STORAGE_KEY, stateStr)
  }

  function getItem(key?: string) {
    const stateStr = localStorage.getItem(STORAGE_KEY) || '{}'
    const stateRow = JSON.parse(stateStr) || {}
    return key ? stateRow[key] || {} : stateRow
  }

  watch(state, () => {
    const stateRow = toRaw(state)
    setItem(stateRow)
  })

  return readonly(state)
}