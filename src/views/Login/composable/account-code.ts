import type { AccountCodeRuleForm } from '../types/login-type'
import utils from '@/utils/utils'

// 存储 用户名 密码 功能
export function useHandleSaveUserOrPass(accountForm: AccountCodeRuleForm) {
  const saveLocalUserOrPass = () => {
    if (accountForm.saveUserName) {
      // 将用户名存储到本地
      utils.saveData('username', accountForm.username)
      // 将保存状态存储到本地
      utils.saveData('saveUsername', accountForm.saveUserName)
    } else {
      utils.removeData('username')
      utils.removeData('saveUsername')
    }

    if (accountForm.saveUserPass) {
      // 将用户名存储到本地
      utils.saveData('password', accountForm.password)
      // 将保存状态存储到本地
      utils.saveData('saveUserPass', accountForm.saveUserPass)
    } else {
      utils.removeData('password')
      utils.removeData('saveUserPass')
    }
  }

  const getLocalUserOrPass = () => {
    accountForm.saveUserName = utils.getData('saveUsername')
    if (accountForm.saveUserName) {
      accountForm.username = utils.getData('username')
    }
    accountForm.saveUserPass = utils.getData('saveUserPass')
    if (accountForm.saveUserPass) {
      accountForm.password = utils.getData('password')
    }
  }

  return { saveLocalUserOrPass, getLocalUserOrPass }
}
