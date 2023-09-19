import { ref } from 'vue'
import type { PhoneCodeRuleForm } from '../types/login-type'
import utils from '@/utils/utils'

// 获取短信验证码及倒计时
export function useGetPhoneCode(ruleForm: PhoneCodeRuleForm) {
  let timer: number
  const currentTime = ref(0)
  const smsCodeBtnText = ref('获取验证码')
  const disabled = ref(false)
  const getSmsCode = () => {
    // TODO 调用获取短信验证码接口

    if (!ruleForm.username) {
      utils.showError('请输入手机号')
      return
    }
    disabled.value = true
    clearInterval(timer)
    currentTime.value = 60
    smsCodeBtnText.value = currentTime.value + '秒后重新获取'
    timer = setInterval(() => {
      currentTime.value--
      smsCodeBtnText.value = currentTime.value + '秒后重新获取'
      if (currentTime.value <= 0) {
        disabled.value = false
        smsCodeBtnText.value = '获取验证码'
        clearInterval(timer)
        timer = 0
      }
    }, 1000)
  }
  return { smsCodeBtnText, getSmsCode, disabled }
}

// 存储用户名功能
export function useHandleSaveUser(ruleForm: PhoneCodeRuleForm) {
  const saveLocalUser = () => {
    if (ruleForm.saveUserName) {
      // 将用户名存储到本地
      utils.saveData('phone', ruleForm.username)
      // 将保存状态存储到本地
      utils.saveData('savePhone', ruleForm.saveUserName)
    } else {
      utils.removeData('phone')
      utils.removeData('savePhone')
    }
  }

  const getLocalUser = () => {
    ruleForm.saveUserName = utils.getData('savePhone')
    if (ruleForm.saveUserName) {
      ruleForm.username = utils.getData('phone')
    }
  }

  return { getLocalUser, saveLocalUser }
}
