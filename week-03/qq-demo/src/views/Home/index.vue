<script setup lang="ts">
import type { Action } from 'element-plus'
const a = ref(0)
const b = reactive({
  a: 1
})
const test = () => {
  ElMessage({
    message: 'test',
    type: 'success'
  })
}
const open = () => {
  ElMessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`
      })
    }
  })
}
const router = useRouter()
const open1 = () => {
  ElNotification({
    title: 'Title',
    message: h('i', { style: 'color: teal' }, 'This is a reminder')
  })
}

const open2 = () => {
  ElNotification({
    title: 'Prompt',
    message: 'This is a message that does not automatically close',
    duration: 0
  })
}
</script>

<template>
  <h1 @click="test">我是主页</h1>
  <h1 @click="open">我是主页</h1>
  <el-button plain @click="open1"> Closes automatically </el-button>
  <el-button plain @click="open2"> Won't close automatically </el-button>
  <IEpMinus />
  <IEpPlus />
  <i-ep-plus />
</template>
