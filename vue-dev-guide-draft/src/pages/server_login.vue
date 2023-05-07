<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

const idInput = ref('')
const idInputRef = ref('')
const pwdInput = ref('')
const router = useRouter()
const users = ref([])

const doLogin = async () => {
  const frm = new FormData()
  frm.append('id', idInput.value)
  frm.append('pwd', pwdInput.value)

  try {
    const res = await axios.post('/api/v1/users/', frm)
    router.push('/server_todo')
  }

  catch (err) {
    console.error(err)
  }
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
