import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const userId = ref('')
  const userName = ref('')

  const isLogin = computed(() => userId.value !== '')

  const setSession = ({ id, name }) => {
    userId.value = id
    userName.value = name
  }

  const clearSession = () => {
    userId.value = ''
    userName.value = ''
  }
  return {
    userId,
    userName,
    isLogin,
    setSession,
    clearSession,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSessionStore, import.meta.hot))
