<script setup>
const props = defineProps({
  text: String,
  id: Number,
})
const emit = defineEmits(['updateTodo', 'cancelUpdateTodo'])
const updateTargetText = ref('')
const targetToUpdate = ref(props.text)

const inputfocus = () => {
  updateTargetText.value.focus()
}
onMounted(() => {
  inputfocus()
})

const updateTodo = (todo) => {
  emit('updateTodo', {
    text: targetToUpdate.value,
    id: props.id,
  })
}

const cancelUpdateTodo = () => {
  emit('cancelUpdateTodo')
}
</script>

<template>
  <div class="w-37 m-0 flex">
    <el-input
      ref="updateTargetText" v-model="targetToUpdate" class="mt-1 ml-2" @keyup.enter="updateTodo"
    />
    <button class=" mx-2 !outline-none absolute right-7 mt-3" @click="updateTodo">
      <div i="carbon-checkmark" />
    </button>
    <button class="icon-btn mx-2 !outline-none absolute right-0 mt-3" @click="cancelUpdateTodo">
      <div i="carbon-close" />
    </button>
  </div>
</template>

<style lang="scss" scoped>

</style>
