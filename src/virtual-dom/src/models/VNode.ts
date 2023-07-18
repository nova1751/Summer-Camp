// 定义子元素联合类型
export type Child = VNode | string;
// 添加索引签名，避免 for in 使用字符串访问属性的时候报错
export interface Props {
  [key: string]: string;
}
// 虚拟 DOM 元素的类，用来创建和描述 VDOM
export class VNode {
  tagName: string;
  props: Props;
  children: Child[];
  key?: number;
  // 构造函数
  constructor(tagName: string, props: Props, children: Child[], key?: number) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
    this.key = key;
  }
  // 渲染函数
  render(): HTMLElement {
    let el = document.createElement(this.tagName);
    for (let attr in this.props) {
      el.setAttribute("attr", this.props[attr]);
    }
    this.children.forEach((child) => {
      const node =
        child instanceof VNode
          ? child.render()
          : document.createTextNode(child);
      el.appendChild(node);
    });
    return el;
  }
  // 插入函数
  insert(target: HTMLElement) {
    const el = this.render();
    target.appendChild(el);
  }
}

// export { VNode };
// // 创建 VDOM 节点
// const createElement = (tagName: string, props: Props, children: Child[]) =>
//   new VNode(tagName, props, children);

// // 渲染函数
// const render = (vNode: VNode): HTMLElement => {
//   let el = document.createElement(vNode.tagName);
//   for (let attr in vNode.props) {
//     el.setAttribute("attr", vNode.props[attr]);
//   }
//   vNode.children.forEach((child) => {
//     const node =
//       child instanceof VNode ? render(child) : document.createTextNode(child);
//     el.appendChild(node);
//   });
//   return el;
// };

// // 插入虚拟 DOM 元素
// const insertDOM = (el: HTMLElement, target: HTMLElement) => {
//   target.appendChild(el);
// };
// 导出元素
