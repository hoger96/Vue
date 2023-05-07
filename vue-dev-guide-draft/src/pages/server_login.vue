<script setup>
import axios from 'axios'

const userId = ref('')
const idInputRef = ref('')
const userPw = ref('')
const router = useRouter()
const users = ref([])
const sessionStore = useSessionStore()

const loginCheck = async () => {
  const userInfo = {
    id: userId.value,
    pwd: userPw.value,
  }

  try {
    const res = await axios.post('/api/v1/users/', userInfo)
    if (res.data.success) {
      sessionStore.setSession({
        id: res.data.userid,
        name: res.data.username,
      })
      router.push('/server_todo')
    }
    else {
      confirm('아이디와 비밀번호가 일치하지 않습니다')
    }
  }
  catch (err) {
    console.error(err)
  }
}

const login = async () => {
  if (!userId.value)
    confirm('아이디를 입력하세요')
  else if (!userPw.value)
    confirm('비밀번호를 입력하세요')
  else loginCheck()
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
