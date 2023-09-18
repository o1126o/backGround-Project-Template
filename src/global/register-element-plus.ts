// element-plus
import { type App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入element-plus中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'

export default function (app: App) {
  app.use(ElementPlus, {
    locale: zhCn
  })
}
