import type { App } from 'vue'

import { createRouter, createWebHistory } from "vue-router";
import { basicRoutes } from './basic';

//白名单
const WHITE_NAME_LIST = ['Login', 'Redirect']

//异步加载权限路由
const getAsyncRoutes = () => {
  const modules = import.meta.globEager('./modules/**/*.ts')

  const routeModuleList: any[] = []

  Object.keys(modules).forEach(key => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList)
  })

  return routeModuleList
}

//创建router
const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes as any,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

//重置router
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route
    if(name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

//加载router
export function setupRouter(app: App) {
  app.use(router)
}

export default router