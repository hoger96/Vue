<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'

const todoValue = ref('')
const todoInput = ref(null)
const todoList = ref([])
const objectUpdateTodo = ref('')
const updateTodoValue = ref('')
const modifyBtn = ref(true)
const route = useRoute()
const loginId = route.params.userId

const todoDoneCount = computed(() => {
  return todoList.value.filter(object => object.done).length
})

const showList = async () => {
  try {
    const response = await axios.get('/api/v1/todoList')
    todoList.value = response.data.filter(todo => todo.user === loginId)
  }
  catch (e) {
    logger.error(e)
  }
}
showList()

const addTodo = async () => {
  if (!todoValue.value)
    return
  const newTodo = {
    user: loginId,
    text: todoValue.value,
    done: false,
  }
  await axios.post('/api/v1/todoList', newTodo)
  todoValue.value = ''
  showList()
}

const deleteTodo = async (todo) => {
  await axios.delete(`/api/v1/todoList/${todo.id}`)
  showList()
}

const choiceUpdateTodo = (todo) => {
  objectUpdateTodo.value = todo.id
  updateTodoValue.value = todo.text
}

const updateTodo = async (todo) => {
  const newUpdateTodo = {
    text: updateTodoValue.value,
  }

  if (objectUpdateTodo.value === todo.id) {
    try {
      await axios.patch(`/api/v1/todoList/${todo.id}`, newUpdateTodo)
      objectUpdateTodo.value = ''
      showList()
    }
    catch (error) {
      console.error(error)
    }
  }
}

const checkingDoneOrNot = async (todo) => {
  const doneOrNot = !todo.done
  const newCheckDone = {
    done: doneOrNot,
  }

  try {
    const res = await axios.patch(`/api/v1/todoList/${todo.id}`, newCheckDone)
    showList()
  }
  catch (error) {
    console.error(error)
  }
}

const allDelete = async () => {
  const doneObject = todoList.value.filter(todo => todo.done)

  for (let i = 0; i < doneObject.length; i++)
    await axios.delete(`/api/v1/todoList/${doneObject[i].id}`)
  showList()
}
</script>

<template>
  <div class="main-wrap relative">
    <h1 class="font-mono text-4xl pt-5">
      To Do List
    </h1>
    <p class="text-xs absolute right-5 top-19">
      {{ route.params.userId }} 님
    </p>
    <div class="flex px-mx-auto">
      <div class="first-wrap">
        <div class="f-one">
          <div class="header font-mono">
            Canlender
          </div>
          <div class="calender-photo" />
        </div>
        <div class="f-two">
          <div class="header font-mono">
            Wise-Saying
          </div>
          <div class="wise-photo" />
        </div>
      </div>
      <div class="second-wrap relative">
        <div class="header flex font-mono justify-center justify-between">
          <p class="ml-18">
            Checklist
          </p>
          <button class="icon-btn mx-2 !outline-none " @click="allDelete(todo)">
            <div i="carbon-trash-can" />
          </button>
        </div>
        <div class="list-wrap font-mono text-left p-3 pr-1 pt-2">
          <div class="relative">
            <ul>
              <li v-for="todo in todoList" :key="`todo-userId-${todo.userId}`" class="flex">
                <el-checkbox v-model="todo.done" size="large" @click="checkingDoneOrNot(todo)" />
                <div v-if="objectUpdateTodo === todo.id" class="w-37 m-0">
                  <el-input v-model="updateTodoValue" class="mt-1 ml-2" @keyup.enter="updateTodo(todo)" />
                </div>
                <div v-else class="mt-2 ml-4">
                  <span>{{ todo.text }}</span>
                </div>
                <button v-if="objectUpdateTodo === todo.id" class="icon-btn mx-2 !outline-none absolute right-7 mt-3" @click="updateTodo(todo)">
                  <div i="carbon-checkmark" />
                </button>
                <button v-else class="icon-btn mx-2 !outline-none absolute right-7 mt-3" @click="choiceUpdateTodo(todo)">
                  <div i="carbon-edit" />
                </button>

                <button class="icon-btn mx-2 !outline-none absolute right-0 mt-3" @click="deleteTodo(todo)">
                  <div i="carbon-close" />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="absolute bottom-0 p-5 font-mono">
          <p>
            Finish  :::   {{ todoDoneCount }}
          </p>
          <div class="flex">
            <el-input ref="todoInput" v-model="todoValue" placeholder="Enter Todo" @keyup.enter="addTodo" />
            <button class="icon-btn mx-2 !outline-none " @click="addTodo">
              <div i="carbon-add" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="memo-wrap">
      <div class="header font-mono">
        Memo
      </div>
      <div class="line-one" />
      <div class="line-two" />
      <div class="line-one" />
      <div class="line-two" />
      <div class="line-one" />
      <div class="line-two" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .main-wrap{
        width:550px;
        background-color: rgb(246 237 228);
        margin:0px auto;
        justify-content: center;
        padding:10px;
        color:#606266;
    }
    .first-wrap{
        margin:auto;
    }
    .f-one{
        width:250px;
        height:225px;
        border:1px solid black;
        margin:auto;
        margin-top:25px;
        margin-bottom:15px;
        background-color: white;
    }
    .f-two{
        width:250px;
        height:225px;
        border:1px solid black;
        margin:auto;
        background-color: white;
    }
    .second-wrap{
        width:250px;
        height:465px;
        border:1px solid black;
        margin:auto;
        margin-top:25px;
        background-color: white;
    }
    .header{
        padding:5px;
        background-color: rgb(197 197 197);;
    }
    .memo-wrap{
        width:515px;
        height:200px;
        border:1px solid black;
        margin:15px auto;
        margin-bottom: 20px;
        background-color: white;
    }
    .calender-photo{
        width:220px;
        height:180px;
        background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgP9JYCMnG62wTl4ODM9QBuP3xt1xYqkArYg&usqp=CAU);
        background-position: center;
        background-size: cover;
        margin:5px auto;
    }
    .wise-photo{
        width:220px;
        height:180px;
        background-image: url(data:image/jpeg;base64,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);
        background-position: center;
        background-size: cover;
        margin:5px auto;
    }
    .line-one{
        width:490px;
        height:25px;
        margin:auto;
        border-bottom: 0.5px solid black;
    }
    .line-two{
        width:490px;
        height:25px;
        margin:auto;
        border-bottom: 0.5px solid #acacac;
    }
</style>
