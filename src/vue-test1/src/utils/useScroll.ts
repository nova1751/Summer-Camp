import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

// 定义接口规范数据的返回类型
interface ScrollPosition {
  x: Ref<number>
  y: Ref<number>
}
// 定义接受对象的联合类型
type target = HTMLElement | Window

const useScroll = (el: target) => {
  // 获取 x , y 坐标
  const position: ScrollPosition = { x: ref(0), y: ref(0) }
  const handleScroll = () => {
    position.x.value = window.scrollX
    position.y.value = window.scrollY
  }
  onMounted(() => {
    el.addEventListener('scroll', handleScroll)
  })
  onUnmounted(() => {
    el.removeEventListener('scroll', handleScroll)
  })
  return position
}

export default useScroll
