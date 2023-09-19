import type { FormRules } from 'element-plus'
import { reactive } from 'vue'
export const phoneCodeFormRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  smscode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
  imgcode: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }]
})

export const accountCodeFormRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  imgcode: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }]
})
