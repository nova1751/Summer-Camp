/**
 *
 * @param e mousedown事件对象
 * @param target 需要更改高度或者宽度的 dom 元素
 * @param option 更改width 或者 height 的选项
 */
const handleResize = (e: MouseEvent, target: HTMLDivElement, option: boolean) => {
  document.body.style.cursor = 'ew-resize'
  e.preventDefault()
  // 记录鼠标初始坐标与元素初始宽度
  let startX = e.clientX
  let startY = e.clientY
  let startWidth = target.offsetWidth
  let startHeight = target.offsetHeight
  const mouseMoveX = (e: MouseEvent) => {
    e.preventDefault()
    let moveX = e.clientX - startX
    target.style.width = startWidth + moveX + 'px'
  }

  const mouseMoveY = (e: MouseEvent) => {
    e.preventDefault()
    let moveY = e.clientY - startY
    target.style.height = startHeight - moveY + 'px'
  }

  const mouseUp = (e: MouseEvent) => {
    e.preventDefault()
    document.body.style.cursor = 'auto'
    if (option) {
      document.removeEventListener('mousemove', mouseMoveX)
    } else {
      document.removeEventListener('mousemove', mouseMoveY)
    }
    document.removeEventListener('mouseup', mouseUp)
  }
  // 给文档添加事件
  if (option) {
    document.addEventListener('mousemove', mouseMoveX)
  } else {
    document.addEventListener('mousemove', mouseMoveY)
  }
  document.addEventListener('mouseup', mouseUp)
}
export default handleResize
