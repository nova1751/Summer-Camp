// 输入框清除按钮的逻辑
const clearBtn = document.querySelector("#clear") as HTMLSpanElement;
const input = document.querySelector("#search") as HTMLInputElement;

input.addEventListener("input", (e) => {
  const value = (e.target as HTMLInputElement)?.value;

  clearBtn.style.display = value ? "block" : "none";
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  clearBtn.style.display = "none";
  input.focus();
});

// reszie 聊天列表的逻辑
const resize1 = document.querySelector("#resize1") as HTMLDivElement;
const chatList = document.querySelector(".chat-list") as HTMLDivElement;
// 获取body标签用来改变鼠标样式
const body = document.querySelector("body") as HTMLBodyElement;

// 记录鼠标初始坐标与元素初始宽度
let startX = 0;
let startWidth = 0;

// 鼠标移动事件的处理函数
const mouseMove = (e: MouseEvent) => {
  e.preventDefault();
  let moveX = e.clientX - startX;

  // 修改左侧元素的宽度
  chatList.style.width = startWidth + moveX + "px";
};
// 定义一个防抖函数，接受一个函数和一个延迟时间作为参数
// function debounce(fn: Function, delay: number = 100) {
//   // 定义一个定时器变量，初始值为null
//   let timer: number | null = null;
//   // 返回一个新的函数
//   return function (this: any) {
//     // 获取函数的参数，使用any类型
//     let args: any = arguments;
//     // 获取函数的上下文，使用any类型
//     let context = this;
//     // 如果已经存在定时器，就清除它
//     if (timer) {
//       clearTimeout(timer);
//     }
//     // 重新设置定时器，延迟执行回调函数
//     timer = setTimeout(function () {
//       fn.apply(context, args);
//     }, delay);
//   };
// }
// const move = debounce(mouseMove, 300);
const mouseUp = (e: MouseEvent) => {
  e.preventDefault();
  body.style.cursor = "auto";
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);
};

resize1.addEventListener("mousedown", (e: MouseEvent) => {
  body.style.cursor = "ew-resize";
  e.preventDefault();
  startX = e.clientX;
  startWidth = chatList.offsetWidth;
  // 给文档添加事件
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
});

const resizeY = document.querySelector(".resize") as HTMLDivElement;
const edit = document.querySelector(".edit") as HTMLDivElement;

// 记录鼠标初始坐标与元素初始宽度
let startY = 0;
let startHeight = 0;

// 鼠标移动事件的处理函数
const mouseMoveY = (e: MouseEvent) => {
  e.preventDefault();
  let moveY = e.clientY - startY;

  // 修改左侧元素的宽度
  edit.style.height = startHeight - moveY + "px";
};

const mouseUpY = (e: MouseEvent) => {
  e.preventDefault();
  body.style.cursor = "auto";
  document.removeEventListener("mousemove", mouseMoveY);
  document.removeEventListener("mouseup", mouseUpY);
};

resizeY.addEventListener("mousedown", (e: MouseEvent) => {
  body.style.cursor = "ns-resize";
  e.preventDefault();
  startY = e.clientY;
  startHeight = edit.offsetHeight;
  // 给文档添加事件
  document.addEventListener("mousemove", mouseMoveY);
  document.addEventListener("mouseup", mouseUpY);
});
