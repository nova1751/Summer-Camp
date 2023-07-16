<template>
  <div>我是导航主页</div>
  <nav>
    <ul>
      <li><router-link to="/fixedbar">吸顶导航</router-link></li>
      <li><router-link to="/scrollsnap">仿写css效果</router-link></li>
      <li><router-link to="/lazyload">图片懒加载</router-link></li>
      <li><router-link to="/infinitescroll">无限滚动</router-link></li>
      <!-- <li><router-link to="/virtual-list">虚拟列表</router-link></li> -->
    </ul>
  </nav>
</template>
<style scoped lang="scss">
nav {
  > ul {
    li {
      margin: 20px;
    }
  }
}
</style>
