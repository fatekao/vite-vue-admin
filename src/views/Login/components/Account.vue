<template>
  <el-form ref="loginFormRef" :model="login.form" :rules="login.rules" status-icon size="large" class="login-content-form" @keyup.enter="submit">
    <el-form-item prop="userName">
      <el-input v-model="login.form.userName" placeholder="admin">
        <template #prefix>
          <ft-icon name="el-icon-User" size="20px"></ft-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="login.form.password" placeholder="123456" show-password>
        <template #prefix>
          <ft-icon name="el-icon-Unlock" size="20px"></ft-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-content-submit" round @click="submit" :loading="login.loading">
        <span>登 录</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { useUserStore } from '@/pinia'

const login = reactive({
  form: {
    userName: '',
    password: ''
  },
  rules: {
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  },
  loading: false
})
const loginFormRef = ref()

const router = useRouter()
const userStore = useUserStore()
const submit = () => {
  login.loading = true
  loginFormRef.value
    .validate()
    .then(() => {
      userStore
        .login(login.form)
        .then(res => {
          router.push({ path: '/welcome' })
        })
        .finally(() => {
          console.log(123)
          login.loading = false
        })
    })
    .catch(() => {
      login.loading = false
    })
}
</script>

<style scoped lang="scss">
.login-content-form {
  margin-top: 20px;
  :deep(.el-input) {
    --el-border-color: #8c8c8c;
    --el-input-hover-border-color: #8c8c8c;
    .el-input__wrapper {
      background-color: transparent;
    }
  }
  .login-content-submit {
    width: 100%;
    height: 60px;
    border-radius: 8px;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 35px;
    font-size: 22px;
    font-weight: bold;
  }
}
</style>
