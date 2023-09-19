import { type DefineComponent } from 'vue'
// 定义组件名称和组件类型的映射关系
export type ComponentMap = {
  name: string
  componentName: DefineComponent<{}, {}, any>
}

// phone登录表单数据类型
export interface PhoneCodeRuleForm {
  username: string
  smscode: string
  imgcode: string
  saveUserName: boolean
}

// 账号登录表单数据类型
export interface AccountCodeRuleForm {
  username: string
  password: string
  imgcode: string
  saveUserName: boolean
  saveUserPass: boolean
}
