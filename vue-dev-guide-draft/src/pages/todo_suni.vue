<script setup>
import axios from 'axios'

const todoApiUrl = 'api/v1/todos'
const todos = ref([])
const inputTodoRef = ref(null)
const inputTodo = ref(null)
const inputTodoValid = ref(false)
const allCheckedTodo = ref(false)
const modifiedAlertOpener = ref(false)
const modifiedTargetRef = ref(null)
const modifiedTargetId = ref(null)
const deletedTargetId = ref(null)
const checkedDeletedTarget = ref(null)

const inquiryTodo = async () => {
  inputTodoRef.value.focus()
  inputTodoValid.value = false
  modifiedAlertOpener.value = false
  modifiedTargetId.value = null
  deletedTargetId.value = null
  checkedDeletedTarget.value = null
  inputTodo.value = null
  try {
    const res = await axios.get(todoApiUrl)
    todos.value = res.data
  }
  catch (e) {
    console.error(e)
  }
}

const addTodo = async () => {
  if (modifiedTargetId.value && inputTodo.value) {
    modifyTodo()
    return
  }

  if (inputTodo.value) {
    const newTodo = {
      text: inputTodo.value,
      done: false,
    }

    await axios.post(todoApiUrl, newTodo)

    inputTodo.value = null
    inputTodoRef.value.focus()
    inquiryTodo()
    return
  }

  inputTodoValid.value = true
}

const readyModifyTodo = (id, text) => {
  inputTodoRef.value.focus()
  modifiedTargetId.value = id
  inputTodo.value = text
  todos.value = todos.value.filter(todo => todo.id === id)
}
async function modifyTodo() {
  if (!inputTodo.value) {
    inputTodoValid.value = true
    return
  }
  if (modifiedAlertOpener.value) {
    await axios.patch(`${todoApiUrl}/${modifiedTargetId.value}`, { text: inputTodo.value, done: false })
    modifiedAlertOpener.value = false
    modifiedTargetId.value = null
    inputTodo.value = null
    inquiryTodo()
    return
  }

  modifiedAlertOpener.value = true
}

const deleteTodo = async (id) => {
  if (deletedTargetId.value) {
    await axios.delete(`${todoApiUrl}/${id}`)
    deletedTargetId.value = null
    inquiryTodo()
    return
  }

  deletedTargetId.value = id
}

const deleteCheckedTodo = async () => {
  if (checkedDeletedTarget.value) {
    allCheckedTodo.value = false

    for (let i = 0; i < checkedDeletedTarget.value.length; i++)
      await axios.delete(`${todoApiUrl}/${checkedDeletedTarget.value[i].id}`)

    checkedDeletedTarget.value = null
    inquiryTodo()
    return
  }

  checkedDeletedTarget.value = todos.value.filter(todo => todo.done)
}
const allCheckTodo = async () => {
  for (let i = 0; i < todos.value.length; i++)
    await axios.patch(`${todoApiUrl}/${todos.value[i].id}`, { done: allCheckedTodo.value })

  inquiryTodo()
}
const checkTodo = async (id, done) => {
  await axios.patch(`${todoApiUrl}/${id}`, { done })
}

onMounted(() => {
  inquiryTodo()
  inputTodoRef.value.focus()
})
</script>

<template>
  <div class="w-3/12 mx-auto">
    <alert-modal v-if="inputTodoValid">
      <template #default>
        할 일을 작성해야 등록할 수 있습니다.
      </template>
      <template #btnArea>
        <el-button type="primary" @click="inquiryTodo">
          confirm
        </el-button>
      </template>
    </alert-modal>
    <alert-modal v-if="deletedTargetId">
      <template #default>
        해당 항목을 삭제하시겠습니까?
      </template>
      <template #btnArea>
        <el-button type="danger" @click="deleteTodo(deletedTargetId)">
          Delete
        </el-button>
        <el-button type="default" @click="inquiryTodo">
          Cancel
        </el-button>
      </template>
    </alert-modal>
    <alert-modal v-if="checkedDeletedTarget">
      <template #default>
        선택한 항목을 모두 삭제하시겠습니까?
      </template>
      <template #btnArea>
        <el-button type="danger" @click="deleteCheckedTodo">
          Delete
        </el-button>
        <el-button type="default" @click="inquiryTodo">
          Cancel
        </el-button>
      </template>
    </alert-modal>
    <alert-modal v-if="modifiedAlertOpener">
      <template #default>
        해당 항목을 수정하시겠습니까?
      </template>
      <template #btnArea>
        <el-button type="primary" @click="modifyTodo">
          Edit
        </el-button>
        <el-button type="default" @click="inquiryTodo">
          Cancel
        </el-button>
      </template>
    </alert-modal>
    <h1 class="text-3xl font-900 mb-5">
      TODOLIST
    </h1>
    <div class="flex gap-2 mb-5 px-2">
      <el-input ref="inputTodoRef" v-model="inputTodo" placeholder="할 일을 작성해주세요." @keyup.enter="addTodo" />
      <el-button v-if="modifiedTargetId" type="primary" @click="modifyTodo">
        Edit
      </el-button>
      <el-button v-else type="primary" @click="addTodo">
        Add
      </el-button>
    </div>
    <ul class="flex flex-col gap-2">
      <li v-if="todos.length === 0" class="border border-solid border-gray-300 rounded p-3 c-#aaa text-center text-sm">
        등록 된 항목이 없습니다.
      </li>
      <li v-else-if="modifiedTargetId" class="border border-solid border-gray-300 rounded p-3 c-#aaa text-center text-sm">
        해당 항목의 수정을 완료해주세요.
      </li>
      <li v-else class="flex justify-between items-center border border-solid border-gray-300 rounded p-2 text-center">
        <el-checkbox v-model="allCheckedTodo" label="전체 선택" size="small" class="w-full" @change="allCheckTodo" />
        <el-button type="danger" class="w-32" @click="deleteCheckedTodo">
          Delete ({{ todos.filter(todo => todo.done).length }})
        </el-button>
      </li>
      <li v-for="(todo) in todos" :key="`todo-${todo.id}`" class="flex border border-solid border-gray-300 rounded p-2">
        <div v-if="modifiedTargetId" class="px-2">
          <input type="text" :value="todo.text" readonly="readonly" class="outline-none text-sm c-#606266">
        </div>
        <div v-else class="flex flex-1 gap-2">
          <el-checkbox v-model="todo.done" :label="todo.text" size="small" class="w-full" @change="checkTodo(todo.id, todo.done)" />
          <button class="icon-btn m-0 !outline-none c-#409eff" @click="readyModifyTodo(todo.id, todo.text)">
            <div i="carbon-settings" />
          </button>
          <button class="icon-btn m-0 !outline-none c-#f56c6c" @click="deleteTodo(todo.id)">
            <div i="carbon-trash-can" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

</style>
