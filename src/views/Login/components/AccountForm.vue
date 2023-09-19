<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { AccountCodeRuleForm } from '../types/login-type'
import { accountCodeFormRules } from '../rules'

const ruleFormRef = ref<FormInstance>()
const accountForm = reactive<AccountCodeRuleForm>({
  username: '',
  password: '',
  imgcode: '',
  saveUserName: false,
  saveUserPass: false
})

import { useGetImgCode } from '../composable/index'
const { imgCodeSrc, getImgCode } = useGetImgCode()
import { useHandleSaveUserOrPass } from '../composable/account-code'
const { saveLocalUserOrPass, getLocalUserOrPass } = useHandleSaveUserOrPass(accountForm)

// 登录提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      saveLocalUserOrPass()
    } else {
      console.log('error submit!', fields)
    }
  })
}

onMounted(() => {
  getLocalUserOrPass()
})
</script>

<template>
  <div class="q-code-page">
    <el-form
      ref="ruleFormRef"
      :model="accountForm"
      :rules="accountCodeFormRules"
      class="demo-ruleForm"
      status-icon
    >
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          v-model="accountForm.username"
          placeholder="请输入用户名"
          prefix-icon="UserFilled"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="accountForm.password"
          placeholder="请输入短信验证码"
          prefix-icon="Lock"
        />
      </el-form-item>
      <!-- 图片验证码 -->
      <el-form-item prop="imgcode">
        <div class="login-line">
          <div class="flex-left">
            <el-input
              v-model="accountForm.imgcode"
              placeholder="请输入图片验证码"
              prefix-icon="PictureRounded"
            />
          </div>
          <div class="flex-right">
            <img :src="imgCodeSrc" alt="" @click="getImgCode" />
          </div>
        </div>
      </el-form-item>
      <!-- 是否记住用户名 -->
      <el-form-item>
        <div class="flex">
          <el-checkbox v-model="accountForm.saveUserName">记住用户名</el-checkbox>
        </div>
        <div class="flex">
          <el-checkbox v-model="accountForm.saveUserPass">记住密码</el-checkbox>
        </div>
        <div class="flex">
          <router-link to="/ResetPwd">忘记密码?</router-link>
        </div>
      </el-form-item>
      <!-- 登录 -->
      <el-form-item>
        <el-button class="login-btn" round type="danger" @click="submitForm(ruleFormRef)"
          >登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login-line {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .flex-left {
    width: 240px;
  }

  .flex-right {
    width: 100px;
    margin-left: 10px;

    img {
      height: 35px;
      cursor: pointer;
      width: 100%;
    }
  }
}

.login-btn {
  width: 100%;
  background-color: #ff1100;
}

.flex {
  margin-right: 30px;
}
</style>
