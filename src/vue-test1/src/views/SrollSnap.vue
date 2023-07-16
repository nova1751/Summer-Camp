<script setup lang="ts">
function debounce(fn: Function, delay: number = 100) {
  // 定义一个定时器变量，初始值为null
  let timer: number | null = null
  // 返回一个新的函数
  return function (this: any, ...args: any) {
    // 获取函数的上下文，使用any类型
    let context = this
    // 如果已经存在定时器，就清除它
    if (timer) {
      clearTimeout(timer)
    }
    // 重新设置定时器，延迟执行回调函数
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
const scrollSnapAlign = debounce((e: MouseEvent, option: number) => {
  const div = e.target as HTMLDivElement
  const scrollPos = div.scrollTop
  const items: NodeListOf<HTMLDivElement> = document.querySelectorAll('.box')

  let closestItem: HTMLDivElement | null = null
  let closestDistance = Infinity

  items.forEach((item: HTMLDivElement) => {
    const distance = Math.abs(item.offsetTop - scrollPos)
    if (distance < closestDistance) {
      closestItem = item
      closestDistance = distance
    }
  })
  if (Math.abs(items[1].offsetTop - scrollPos) < div.scrollHeight) {
    switch (option) {
      case 0:
        div.scrollTo({
          top: items[1].offsetTop,
          behavior: 'smooth'
        })
        break
      case 1:
        div.scrollTo({
          top: items[1].offsetTop - div.offsetHeight + items[1].offsetHeight,
          behavior: 'smooth'
        })
        break

      case 2:
        div.scrollTo({
          top: items[1].offsetTop - div.offsetHeight / 2 + items[1].offsetHeight / 2,
          behavior: 'smooth'
        })
        break

      default:
        div.scrollTo({
          top: closestItem!.offsetTop,
          behavior: 'smooth'
        })
    }
  } else {
    div.scrollTo({
      top: closestItem!.offsetTop,
      behavior: 'smooth'
    })
  }
})
const scrollSnapAlign1 = debounce((e: MouseEvent, option: number) => {
  const div = e.target as HTMLDivElement
  const scrollPos = div.scrollTop
  const items = div.childNodes
  let closestItem: HTMLDivElement | null = null
  let closestDistance = Infinity

  items.forEach((item: any) => {
    const distance = Math.abs(item.offsetTop - scrollPos)
    if (distance < closestDistance) {
      closestItem = item
      closestDistance = distance
    }
  })
  console.log(div.scrollTop, div.scrollHeight - 400)

  if (option == 1) {
    if (div.scrollTop > 100 && div.scrollTop < 200) {
      div.scrollTo({
        top: div.scrollHeight - 10,
        behavior: 'smooth'
      })
    } else if (
      div.scrollHeight - 400 - div.scrollTop < 200 &&
      div.scrollHeight - 400 - div.scrollTop > 100
    ) {
      div.scrollTo({
        top: 10,
        behavior: 'smooth'
      })
      console.log('test')
    } else {
      div.scrollTo({
        top: closestItem!.offsetTop,
        behavior: 'smooth'
      })
    }
  } else {
    div.scrollTo({
      top: closestItem!.offsetTop,
      behavior: 'smooth'
    })
  }
})
</script>

<template>
  <div class="container" @scroll="scrollSnapAlign($event, 0)">
    <div class="box box1"></div>
    <div class="box box2"></div>
    <div class="box box3"></div>
  </div>
  <div class="container" @scroll="scrollSnapAlign($event, 1)">
    <div class="box box1"></div>
    <div class="box box2"></div>
    <div class="box box3"></div>
  </div>
  <div class="container" @scroll="scrollSnapAlign($event, 2)">
    <div class="box box1"></div>
    <div class="box box2"></div>
    <div class="box box3"></div>
  </div>
  <!-- <hr /> -->
  <div class="container" @scroll="scrollSnapAlign1($event, 0)">
    <div class="box box1"></div>
    <div class="box box2"></div>
    <div class="box box3"></div>
  </div>
  <div class="container" @scroll="scrollSnapAlign1($event, 1)">
    <div class="box box1"></div>
    <div class="box box2"></div>
    <div class="box box3"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 400px;
  height: 400px;
  overflow: auto;
  display: inline-block;
  // margin: 0 20px;
  // margin: 20px;
  .box {
    height: 300px;
    width: 100%;
    flex-shrink: 0;

    &.box1 {
      background-color: red;
    }
    &.box2 {
      background-color: green;
      height: 200px;
    }
    &.box3 {
      background-color: blue;
    }
  }
  &:nth-child(n + 4) {
    height: 400px;
    width: 400px;
    .box {
      height: 400px;
      width: 100%;
      flex-shrink: 0;
      &.box1 {
        background-color: red;
      }
      &.box2 {
        background-color: green;
      }
      &.box3 {
        background-color: blue;
      }
    }
  }
}
</style>
