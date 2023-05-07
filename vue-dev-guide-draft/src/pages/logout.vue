<script setup>
const router = useRouter()
const sessionStore = useSessionStore()

sessionStore.clearSession()
router.push('/server_login')
</script>

<template>
  <div />
</template>

<style lang="scss" scoped>

</style>
