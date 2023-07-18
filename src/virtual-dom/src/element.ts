// 定义子元素联合类型
type Child = VNode | string;
interface Props {
  [key: string]: string;
}
// 虚拟 DOM 元素的类，用来创建和描述 VDOM
class VNode {
  tagName: string;
  props: Props;
  children: Child[];
  constructor(tagName: string, props: Props, children: Child[]) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }
}
// 创建 VDOM 节点
const createElement = (tagName: string, props: Props, children: Child[]) =>
  new VNode(tagName, props, children);

// 渲染函数
const render = (vNode: VNode): HTMLElement => {
  let el = document.createElement(vNode.tagName);
  for (let attr in vNode.props) {
    el.setAttribute("attr", vNode.props[attr]);
  }
  vNode.children.forEach((child) => {
    const node =
      child instanceof VNode ? render(child) : document.createTextNode(child);
    el.appendChild(node);
  });
  return el;
};

// 插入虚拟 DOM 元素
const insertDOM = (el: HTMLElement, target: HTMLElement) => {
  target.appendChild(el);
};
// 导出元素
export { VNode, createElement, render, insertDOM };
