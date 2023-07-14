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

const clearBtn2 = document.querySelector("#clear2") as HTMLSpanElement;
const input2 = document.querySelector("#search2") as HTMLInputElement;

input2.addEventListener("input", (e) => {
  const value = (e.target as HTMLInputElement)?.value;

  clearBtn2.style.display = value ? "block" : "none";
});

clearBtn2.addEventListener("click", () => {
  input2.value = "";
  clearBtn2.style.display = "none";
  input2.focus();
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

// 获取元素，并指定它的类型为 HTMLDivElement
const editor = document.getElementById("editor") as HTMLDivElement;
const msg = document.querySelector("#msg-list") as HTMLDivElement;
const sendMsg = document.querySelector("#sendMsg") as HTMLButtonElement;
const upload = document.querySelector("#upload") as HTMLInputElement;
const imgUp1 = document.querySelector("#imgUp") as HTMLDivElement;
// // 给元素添加一个 keydown 事件监听器，指定事件类型为 KeyboardEvent
editor.addEventListener("keydown", (e: KeyboardEvent) => {
  // e 是一个 KeyboardEvent 对象，包含了按键的信息
  // e.keyCode 是一个数字，表示按下的键的编码
  // e.ctrlKey, e.shiftKey, e.altKey 是布尔值，表示是否同时按下了 Ctrl, Shift, Alt 键
  if (e.key === "Enter") {
    // 13 是 Enter 键的编码
    if (e.ctrlKey) {
      // 如果同时按下了 Ctrl 键
      // 在光标处插入一个换行符
      let br = document.createElement("br");
      let selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let range = selection.getRangeAt(0);
        range.insertNode(br);
        // 将光标移动到换行符后面
        range.setStartAfter(br);
        range.setEndAfter(br);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      console.log("test1");

      // 阻止默认行为，即不在 div 外面插入一个换行符
      e.preventDefault();
    } else if (e.shiftKey || e.altKey) {
      // 如果同时按下了 Shift 或 Alt 键
      // 不执行任何操作
      e.preventDefault();
    } else {
      // 如果只按下了 Enter 键
      // 清空 div 内容
      let div = document.createElement("div");
      div.className = "msg-right";
      let template = `             
      <div class="bubble">
        <div class="text">${editor.innerHTML}</div>
      </div>
      <div class="avatar">
        <img src="./images/noa.png" alt="" srcset="" />
      </div>
   `;
      div.innerHTML = template;
      console.log(div);
      msg.appendChild(div);
      editor.innerHTML = "";
      // 阻止默认行为，即不在 div 外面插入一个换行符
      e.preventDefault();
      msg.scrollTop = msg.scrollHeight;
    }
  }
});
sendMsg.addEventListener("click", () => {
  let div = document.createElement("div");
  div.className = "msg-right";
  let template = `             
  <div class="bubble">
    <div class="text">${editor.innerHTML}</div>
  </div>
  <div class="avatar">
    <img src="./images/noa.png" alt="" srcset="" />
  </div>
`;
  div.innerHTML = template;
  msg.appendChild(div);
  editor.innerHTML = "";
  msg.scrollTop = msg.scrollHeight;
});
imgUp1.addEventListener("click", () => {
  upload.click();
});
upload.addEventListener("change", () => {
  const src = URL.createObjectURL(upload.files![0]);
  let div = document.createElement("div");
  div.className = "msg-right";
  let template = `             
  <div class="bubble">
    <div class="text"><img src="${src}" alt="" srcset="" /></div>
  </div>
  <div class="avatar">
    <img src="./images/noa.png" alt="" srcset="" />
  </div>
`;
  div.innerHTML = template;
  msg.appendChild(div);
  upload.value = "";
  setTimeout(() => (msg.scrollTop = msg.scrollHeight), 100);
});

const box = document.querySelector("#box") as HTMLDivElement;

const toggle = () => {
  const display = window.getComputedStyle(box).getPropertyValue("display");
  box.style.display = display == "none" ? "block" : "none";
};

const icon = document.querySelector("#icon") as HTMLElement;
const userList = document.querySelector("#userList") as HTMLDivElement;

icon.addEventListener("click", () => {
  const display = window.getComputedStyle(userList).getPropertyValue("display");
  userList.style.display = display == "none" ? "block" : "none";

  icon.style.transform =
    "rotate(-90deg)" == icon.style.transform ? "rotate(0)" : "rotate(-90deg)";
});
const modal = document.querySelector("#myModal") as HTMLDivElement;
const dialog = document.querySelector("#dialog") as HTMLDivElement;
const aside = document.querySelector("#aside") as HTMLDivElement;
const openModal = () => {
  modal.style.display = "flex";
  dialog.classList.add("show");
};
const closeModal = () => {
  dialog.classList.add("hide");
  setTimeout(() => {
    dialog.classList.remove("show", "hide");
    modal.style.display = "none";
  }, 300);
};
const openSide = () => {
  aside.classList.toggle("show");
};

const memberListNode = document.querySelector("#memberList") as HTMLDivElement;

const addMember = () => {
  const memberList = [
    {
      name: "233333",
      avatar: "./images/CHR_000001_00_l.png",
      privilege: 0,
    },
    {
      name: "呀哈哈",
      avatar: "./images/CHR_000002_00_l.png",
      privilege: 1,
    },
    {
      name: "空气动力学家",
      avatar: "./images/CHR_000003_00_l.png",
      privilege: 2,
    },
  ];
  memberList.forEach((item) => {
    const template = `             
    <div class="avatar"><img src="${item.avatar}" alt="" /></div>
    <div class="name">${item.name}</div>
    ${
      item.privilege == 2
        ? ""
        : `    <div class="status ${item.privilege == 1 ? "manager" : ""}">${
            item.privilege == 0 ? "群主" : "管理员"
          }</div>
 `
    }
`;
    const node = document.createElement("div");
    node.classList.add("member");
    node.innerHTML = template;
    // console.log(node);

    memberListNode.appendChild(node);
  });
  bindEvent();
};
const menu = document.querySelector("#menu") as HTMLDivElement;

const func = (e: MouseEvent) => {
  if (e.target !== menu) {
    menu.style.display = "none";
    document.removeEventListener("click", func);
    // console.log(2);
  }
};
const rightPanel = (e: MouseEvent) => {
  e.preventDefault();
  const xkey = 175 + e.clientX;
  const ykey = 465 + e.clientY;
  // console.log(menu.offsetWidth, e.clientX, menu.offsetHeight, e.clientY);

  // console.log(xkey, ykey, window.innerWidth, window.innerHeight);

  if (xkey > window.innerWidth) {
    menu.style.left = e.clientX - 175 + "px";
  } else {
    menu.style.left = e.clientX + "px";
  }
  if (ykey > window.innerHeight) {
    menu.style.top = e.clientY - 465 + "px";
  } else {
    menu.style.top = e.clientY + "px";
  }
  menu.style.display = "block";
  document.addEventListener("click", func);
  // console.log(1);
};
menu.addEventListener("click", (e) => {
  e.stopPropagation();
});

const bindEvent = () => {
  const memberItems = document.querySelectorAll(
    ".member"
  ) as NodeListOf<HTMLDivElement>;
  memberItems.forEach((item) => {
    item.addEventListener("contextmenu", rightPanel);
  });
};
