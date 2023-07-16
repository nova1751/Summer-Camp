<script setup lang="ts">
import { ref } from 'vue'

const imgUrlList = ref<string[]>([])
for (let i: number = 1; i < 22; i++) {
  let str = null
  if (i < 10) {
    str = 'http://127.0.0.1:5500/src/images/CHR_00000' + i + '_00_l.png'
  } else {
    str = 'http://127.0.0.1:5500/src/images/CHR_0000' + i + '_00_l.png'
  }
  imgUrlList.value.push(str)
}
</script>

<template>
  <div class="container">
    <template v-for="(img, index) in imgUrlList" :key="index">
      <img v-img-lazy="img" alt="" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  img {
    width: 400px;
    height: 400px;
    margin: 100px 0;
  }
}
</style>
