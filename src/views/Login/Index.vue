<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-title">VITE VUE ADMIN</div>
      <Account />
      <div class="copy-right">fatekao@2024</div>
    </div>
  </div>
</template>

<script setup name="login">
const Account = defineAsyncComponent(() => import('./components/Account.vue'))
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/login_bg.jfif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .login-form {
    width: 480px;
    height: 540px;
    padding: 60px;
    margin-left: 180px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    box-sizing: border-box;
    border-radius: 8px;
    animation: fadeUp 0.6s ease;
    .login-title {
      font-size: 24px;
      line-height: 36px;
      margin-top: 30px;
      margin-bottom: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 24px;
        height: 24px;
        margin-right: 20px;
      }
    }
    .copy-right {
      text-align: center;
      font-size: 14px;
      opacity: 0.3;
      margin-top: 50px;
      line-height: 18px;
    }
  }
}
</style>
