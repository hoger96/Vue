<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

const idInput = ref('')
const idInputRef = ref('')
const pwdInput = ref('')
const router = useRouter()
const users = ref([])

const loginCheck = async () => {
  const res = await axios.get('api/v1/users')
  users.value = res.data

  const memberLogin = users.value.filter(user => (user.userId === idInput.value && user.userPwd === pwdInput.value))
  if (memberLogin.length === 0) {
    confirm('아이디와 비밀번호를 확인하세요')
    idInput.value = ''
    pwdInput.value = ''
    idInputRef.value.focus()

    return
  }
  router.push({ name: 'todo', params: { userId: idInput.value } })
}

const doLogin = async () => {
  if (!idInput.value)
    confirm('아이디를 입력하세요')

  else if (!pwdInput.value)
    confirm('비밀번호를 입력하세요')

  else
    loginCheck()
}
</script>

<template>
  <div class="login-main-wrap">
    <h1 class="font-mono text-4xl pt-5">
      Login
    </h1>
    <div class="login-wrap">
      <el-input ref="idInputRef" v-model="idInput" class="mb-2" placeholder="ID" @keyup.enter="doLogin" />
      <el-input v-model="pwdInput" placeholder="PW" type="password" @keyup.enter="doLogin" />
      <button class="icon-btn mt-10 !outline-none" @click="doLogin">
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
