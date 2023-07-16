import useIntersectionObserver from '@/utils/useIntersectionObserver'
import { watch, type App, type Plugin } from 'vue'
export const lazyPlugin: Plugin = {
  install(app: App) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        const stop = useIntersectionObserver(el, (isIntersecting) => {
          if (isIntersecting) {
            // console.log('test')
            el.src = binding.value
            stop()
          }
        })
      }
    })
  }
}

export const InfinitePlugin: Plugin = {
  install(app: App) {
    app.directive('infinite-scroll', {
      mounted(el: HTMLDivElement, binding) {
        // console.log(binding.value, el.scrollHeight - el.scrollTop)
        el.addEventListener('scroll', () => {
          // console.log(el.scrollHeight - el.scrollTop)
          if (el.scrollHeight - el.scrollTop < 1000) {
            binding.value()
          }
        })
      }
    })
  }
}
