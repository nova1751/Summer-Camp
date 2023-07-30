## Week One 总结

### 学习笔记

#### QQ Demo

1. 关于仿照`QQ`聊天栏和聊天输入框的`Rezie`解决方案。

> 参考设计：`telegram`网页端布局设计。
> 设计一个宽度或者高度很小的`div`盒子，通过监听这个盒子的`mousedown`事件，动态地添加和移除`mousemove`和`mouseup`事件来改变目标盒子的高度或者宽度。

**核心代码**

```ts
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
```

> TIP:
> 注意这里获取`offsetWidth`指的是元素的实际宽度而不是样式的宽度，由于`Resize`的界限是通过`min-width`和`min-height`决定的，直接获取样式属性会产生错误。

2. 处理`flex`布局中的溢出问题。

   > 对于类似`QQ`这种不需要页面整体滚动的`Web`应用，需要在元素内部添加滚动条，优化整体页面的效果。比较理想的方案是`flex`布局，该布局的伸缩性可以是匹配大部分不同比例的屏幕。然而这种布局却又一些小坑，特别是在复杂嵌套的`flex`布局中，会出现一些莫名其妙溢出，却又没有办法处理的现象。

   - 由于`flex-item`的`min-width`由容器内容决定，如果`flex-item`的内容过长，会导致`flex-item`的长度被强制撑开，导致一些滚动条的效果与文字省略的效果无法实现。

     **解决方案**：设置该`flex-item`属性`overflow:hidden`或者`min-width:0`，来使该容器宽度固定达到应有的显示效果。

   - 第一种方法对于一些嵌套层级比较深的容器不太适合解决问题，应为由于父元素高度的继承问题，使用第一种方法固定子元素高度意味着你需要从外到里一步步调试，判断是那个`flex-item`内容溢出，然后对这个`flex-item`设置对应的属性。比较遗憾的是这种方法十分费时间，并且过程与效果通常让人疑惑。

     **解决方案**：分析上述问题的实质在于`flex-item`的容器被内容撑开，导致宽度不受限制，所以对于复杂的嵌套，我们可以直接利用 css 中的计算方法`calc`，设置其宽度或高度为`calc(100vh - 100px)`来达到高度自适应。

3. 文本省略显示。
   > 此种效果实现起来比较简单，主要与上一种处理溢出配合使用。
   ```css
   /* 在父元素宽度确定的情况下，直接三件套 */
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
   ```
4. 模态框的书写。

   > 模态框的实现思路比较简单，即将一个面积覆盖整个页面的定位为`fixed`的`cover`元素，设置`width: 100%;height: 100%`铺满视口，通过控制`display`属性实现模态框的开与关，但模态框的动画效果是一个比较有意思的地方，由于控制原生`css`动画效果只能用于数值类型而不能用于`display`属性，如果想要实现类似的动画效果在模态框消失的时候还是得设置定时器在动画结束的时候设置`display: none;`。

   **示例代码**

   ```ts
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
   ```

   > TIP: `Element.classList.toggle()`对于动态添加与删除一个类名是一个很有用的方法。
   >
   > ```ts
   > // 这里是来切换侧边栏的显示的，与模态框无关
   > const openSide = () => {
   >   aside.classList.toggle("show");
   > };
   > ```

5. `transform`属性实现容器的渐入与渐出

   > 通过动态控制`2D`位移以及过渡，实现类似`QQ`的效果。

   ```scss
   // 父元素
   position: relative;
   overflow: hidden;

   // 子元素
   position: absolute
   right :0
   height: 100%
   transform: translateX(100%)
   ```

6. 纯`css`实现一个漂亮的开关按钮。

   > 这是一个很有意思的东西，通过`checked`伪类来实现开关状态的切换，采用 `2d` 位移与过渡实现类似的效果，并使用`label`标签与`input`关联。采用`:before`伪类实现元素内部按钮。

   详细代码可参考[简易 Demo](../src/temp/test7.html)

7. 关于`QQ demo`的一些值得拓展的地方。

   - `div`的`contenteditable`的属性

     > 这个属性非常有意思，默认浏览器的行为给这属性添加了很多非常强大的效果，对于**富文本编辑器而言**，对于自定义换行修改默认行为还有许多指的研究的地方，下面贴出部分修改光标的代码。

     ```ts
     editor.addEventListener("keydown", (e: KeyboardEvent) => {
       // e 是一个 KeyboardEvent 对象，包含了按键的信息
       // e.keyCode 是一个数字，表示按下的键的编码
       // e.ctrlKey, e.shiftKey, e.altKey 是布尔值，表示是否同时按下了 Ctrl, Shift, Alt 键
       if (e.key === "Enter") {
         // 13 是 Enter 键的编码
         if (e.ctrlKey) {
           e.preventDefault();
           // 如果同时按下了 Ctrl 键
           // 在光标处插入一个换行符
           let br = document.createElement("br");
           // br.innerHTML = `<br />`;
           let selection = window.getSelection();
           if (selection && selection.rangeCount > 0) {
             let range = selection.getRangeAt(0);
             range.deleteContents();
             if (!editor.innerHTML) {
               editor.appendChild(br.cloneNode(true));
             }
             range.insertNode(br);

             // 获取偏移量
             // let offset = range.startOffset;
             // // 插入新节点
             // editor.insertBefore(br, editor.childNodes[offset]);
             // const div = range.commonAncestorContainer.parentNode as HTMLDivElement;
             // div.insertAdjacentElement("afterend", br);
             // 将光标移动到换行符后面,设置 range 起点与终点的位置
             range.setStartAfter(br);
             console.log(range.collapsed);

             // range.setEndAfter(br);
             // range.collapse(true);
             // selection.removeAllRanges();
             // selection.addRange(range);
             editor.scrollTop = editor.scrollHeight;
           }

           // 阻止默认行为，即不在 div 外面插入一个换行符
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
           // console.log(div);
           msg.appendChild(div);
           editor.innerHTML = "";
           // 阻止默认行为，即不在 div 外面插入一个换行符
           e.preventDefault();
           msg.scrollTop = msg.scrollHeight;
         }
       }
     });
     ```

   - 关于富文本编辑器有关的安全隐患以及解决方案。

   > 动态渲染`html`是一种非常危险的行为，很容易导致`xss`攻击

   **解决方案：** 对每个字符采用字符编码的形式展示（PS：感谢学长的解答）。

   1. 右键菜单点击菜单外区域清除。
      1. 给`document`对象添加清除右键菜单的点击事件。
      2. 阻止右键菜单本身的冒泡，使得点击右键菜单的时候不会触发`document`的点击事件。
   2. `js`中创建的`dom`节点加入到`dom`后会保持相同的引用。
   3. 处理绝对定位的元素溢出，父元素设置`overflow`属性必须设置相对定位。

#### 吸顶交互

1. 导航栏吸顶交互
   > 实现这个效果比较简单，对于`window`对象就获取`scrollX scrollY`属性，
   > 对于`div`滚动对象则获取`scrollLeft scrollTop`属性，当滚动到对应的位置的时候，实现动态类名切换达到对应的目的。
2. 使⽤ js 实现 css 中`scroll-snap-align、scroll-snap-stop、scroll-snap-type`功能。

   > 使用`js`优化滚动效果在于，监听元素的`scroll`事件，并为其添加防抖函数，只有在滚动结束后才生效。关键在于计算滚动距离，确定最佳滚动位置。

   ```ts
   div.scrollTo({
     top: closestItem!.offsetTop,
     behavior: "smooth",
   });
   ```

#### 加载技术

- 图片懒加载
  实现图片懒加载的思路很简单，分三步走，

  1.  使用其他的属性储存图片的`src`属性。
  2.  监听图片是否进入视口。
  3.  进入视口则将图片的`src`属性给赋上。

  > 所用到的核心`Web API`：`IntersectionObserver`，通过监视图片是否进入视口，每次图片进入视口则触发回调函数，注意在图片懒加载的过程中，当图片进入视口后，需要套考虑停止对图片的监视以节约性能。

- 实现列表无限加载的思路很简单，分三步走

  1.  判断是否滚动到底部。
  2.  若滚动到底部则发送`ajax`请求，并将数据列表拼接。
  3.  重新渲染。

  > 这个业务需求的关键在于，如何判断列表滚动到了底部，可以考虑的方法为比较滚动条的`scrollHeight`和`scrollTop`,或者在列表的最底部设置一个元素，利用`IntersectionObserver`来监听元素是否进入视口，若进入则证明元素滚动到了最底部。

  - 虚拟列表

    - 首先，需要确定列表项的高度，如果是固定高度，那么可以直接计算出每个列表项的位置和偏移量；如果是不定高度或动态高度，那么需要动态测量每个列表项的高度，并缓存起来，以便后续使用。
    - 其次，需要创建一个容器元素，用于包裹所有的列表项，并设置其高度为所有列表项的总高度，以保持滚动条的正常显示和滚动效果。
    - 然后，需要监听容器元素的滚动事件，根据滚动位置和可视区域的高度，计算出当前需要渲染的列表项的范围和偏移量，并将其渲染到容器元素中。
    - 最后，需要对渲染的列表项进行优化，比如使用缓存、节流、防抖等技术来避免频繁的渲染和重绘，提高性能和稳定性。

#### 单页面应用

`SPA`的实现思路

> 访问页面时的应用初始化即为直接通过`url`访问的解决方案。
> `If the URL doesn't match any static assets, it should serve the same index.html page that your app lives in. Beautiful, again!` --- 摘自 `vue-router` 官方文档。

- `Hash`模式
  1.  定义路由，定义路由缓存对象。
  2.  定义路由内容访问函数，如已做路由缓存，则直接返回结果，否则模拟异步请求。
  3.  定义更新页面的函数。
  4.  监听`window`对象的`hashchange`事件，当`url`改变的时候，请求路由，更新页面。
  5.  注意在一开始的时候也需要执行一次函数。
- `History`模式
  > 前三步与`hash`模式基本相同，主要记录后面不一样的地方。
  1.  对于`History`模式需要监听的是`window`对象的`popstate`事件，此事件只能由浏览器记录的前进后退，和`a`标签的锚点触发，在这个时间上绑定更新页面的函数。
  2.  此外需要阻止超链接事件的点击的默认事件，阻止其跳转，并使用`pushState`或`replaceState`更新`url`记录，并更新页面内容。
  3.  在`chrome`加载页面`popstate`默认会触发一次。

### 基本总结

1. 书写一个仿照`QQ demo`是一个很有意思的事情，通过纯的`css`与`js`从零实现一些效果，对于我对`js`与`css`的理解加深有很大的帮助。
2. 通过实现一些工具库中的函数(~~造轮子~~)，是我对`Web`中一些常见的`API`有了更深的了解，提高了我的`js`基础能力。
3. 通过手写一个单页面应用并做路由缓存，对`SPA`的原理以及实现有了更深的了解。

### Optimize

> 总体来说，这周的必做任务个人感觉完成的比较完整（大概。。），学习到了许多东西，有两个地方还值得继续深入研究。

1. 虚拟列表的缓存实现，尝试实现不定长的虚拟列表。
2. 了解`ts`的分布式类型，以及一些类型的高级用法。
