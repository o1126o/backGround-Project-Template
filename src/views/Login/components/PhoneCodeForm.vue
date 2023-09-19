<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { PhoneCodeRuleForm } from '../types/login-type'
import { phoneCodeFormRules } from '../rules'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<PhoneCodeRuleForm>({
  username: '',
  smscode: '',
  imgcode: '',
  saveUserName: false
})

import { useGetImgCode } from '../composable/index'
const { imgCodeSrc, getImgCode } = useGetImgCode()
import { useGetPhoneCode, useHandleSaveUser } from '../composable/phone-code'
const { smsCodeBtnText, getSmsCode, disabled } = useGetPhoneCode(ruleForm)
const { getLocalUser, saveLocalUser } = useHandleSaveUser(ruleForm)

/* 登录提交 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      saveLocalUser()
    } else {
      console.log('error submit!', fields)
    }
  })
}

onMounted(() => {
  getLocalUser()
})
</script>

<template>
  <div class="phone-code-page">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="phoneCodeFormRules"
      class="demo-ruleForm"
      status-icon
    >
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="UserFilled" />
      </el-form-item>
      <!-- 短信验证码 -->
      <el-form-item prop="smscode">
        <div class="login-line">
          <div class="flex-left">
            <el-input
              v-model="ruleForm.smscode"
              placeholder="请输入短信验证码"
              prefix-icon="Picture"
            />
          </div>
          <div class="flex-right">
            <el-button type="primary" :disabled="disabled" @click="getSmsCode">{{
              smsCodeBtnText
            }}</el-button>
          </div>
        </div>
      </el-form-item>
      <!-- 图片验证码 -->
      <el-form-item prop="imgcode">
        <div class="login-line">
          <div class="flex-left">
            <el-input
              v-model="ruleForm.imgcode"
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
        <el-checkbox v-model="ruleForm.saveUserName">记住用户名</el-checkbox>
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
    }
  }

  :deep(.el-button),
  :deep(img) {
    width: 100px;
  }

  &:deep(.el-button) {
    font-size: 12px;
  }
}

.login-btn {
  width: 100%;
  background-color: #ff1100;
}
</style>
