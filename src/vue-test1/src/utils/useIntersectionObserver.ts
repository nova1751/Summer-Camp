import { ref } from 'vue'
const useIntersectionObserver = (
  target: HTMLElement,
  callback: (isIntersecting: boolean) => void
): (() => void) => {
  const observer = ref<IntersectionObserver | null>(null)

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    // console.log('test')
    const isIntersecting = entries[0].isIntersecting
    callback(isIntersecting)
  }

  const observeElement = () => {
    if (target && observer.value) {
      observer.value.observe(target)
    }
  }

  const unobserveElement = () => {
    if (target && observer.value) {
      observer.value.unobserve(target)
    }
  }

  const createObserver = () => {
    if (target) {
      observer.value = new IntersectionObserver(handleIntersect, {
        // 配置对象，指定根元素为视口，阈值为0.1
        root: null,
        threshold: 0.1
      })
      observeElement()
    }
  }

  createObserver()

  return unobserveElement
}

export default useIntersectionObserver
