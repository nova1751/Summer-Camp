<script setup lang="ts">
import useScroll from '@/utils/useScroll'
const { y } = useScroll(window)
</script>

<template>
  <div class="container">
    <div class="topbar"></div>
    <div class="fixbar" :class="{ show: y > 98 }"></div>
  </div>
  <div class="panel">{{ y }}</div>
  <ul>
    <li class="item" key="1">
      <div class="test">asdasdasdasdasdassdasdasda</div>
    </li>
    <li class="item" key="2">
      test1
      <div class="test">asdasdasdasdasdassdasdasda</div>
    </li>
    <li class="item" key="3">test2</li>
    <li class="item" key="4">test3</li>
    <li class="item" key="5">test4</li>
    <li class="item" key="6">test5</li>
    <li class="item" key="7">test6</li>
    <li class="item" key="8">
      test7
      <div class="test">asdasdasdasdasdassdasdasda</div>
    </li>
    <li class="item" key="9">test8</li>
    <li class="item" key="10">test9</li>
    <li class="item" key="11">
      test10
      <div class="test">asdasdasdasdasdassdasdasda</div>
    </li>
    <li class="item" key="12">test11</li>
    <li class="item" key="13">test12</li>
    <li class="item" key="14">test13</li>
    <li class="item" key="15">test14</li>
    <li class="item" key="16">test15</li>
    <li class="item" key="17">test16</li>
    <li class="item" key="18">test17</li>
    <li class="item" key="19">
      test18
      <div class="test">asdasdasdasdasdassdasdasda</div>
    </li>
    <li class="item" key="20">test19</li>
    <li class="item" key="21">test20</li>
    <li class="item" key="22">test21</li>
    <li class="item" key="23">test12</li>
    <li class="item" key="24">test123</li>
    <li class="item" key="25">test1444</li>
    <li class="item" key="26">test1444</li>
    <li class="item" key="27">test1444</li>
    <li class="item" key="28">test14221</li>
    <li class="item" key="29">test14442</li>
    <li class="item" key="30">test1231</li>
  </ul>
</template>

<style scoped lang="scss">
.container {
  height: 3000px;
  .topbar {
    background-color: skyblue;
    height: 200px;
  }
  .fixbar {
    width: 100%;
    height: 100px;
    background-color: skyblue;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    opacity: 0;
    &.show {
      transition: 0.3s;
      transform: none;
      opacity: 1;
    }
  }
}
.panel {
  position: fixed;
  top: 0;
  width: 0;
}
</style>
