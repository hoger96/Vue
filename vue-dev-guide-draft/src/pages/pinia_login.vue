<script setup>
import axios from 'axios'

const userId = ref('')
const userPw = ref('')
const router = useRouter()
const sessionStore = useSessionStore()

const login = () => {
  // 1. id와 pw값을 가지고, API를 조회해서 문제없이 pass할 경우 계속 진행
  // 2. login API가 패스 될 경우, session에 정보를 저장
  // 3. session 정보를 저장하고, router를 통해 이동
  sessionStore.setSession({
    userId: userId.value,
    userName: '김영현',
  })

  router.push('/pinia_todo')
}
</script>

<template>
  <div class="login-main-wrap">
    <h1 class="font-mono text-4xl pt-5">
      Login
    </h1>
    <div class="login-wrap">
      <el-input ref="idInputRef" v-model="userId" class="mb-2" placeholder="ID" @keyup.enter="login" />
      <el-input v-model="userPw" placeholder="PW" type="password" @keyup.enter="login" />
      <button class="icon-btn mt-10 !outline-none" @click="login">
        <div i="carbon-location-person" :style="{ width: `${40}px`, height: `${40}px` }" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .login-main-wrap{
        width:550px;
        background-color: rgb(246 237 228);
        margin:0px auto;
        justify-content: center;
        padding:10px;
        color:#606266;
    }
    .login-wrap{
      width:300px;
      height:220px;
      padding:5px;
      margin:25px auto;
      padding-top: 30px;
      padding-bottom: 20px;
    }
</style>
