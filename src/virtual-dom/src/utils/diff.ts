import { VNode, Child, Props } from "../models/VNode";
import { State } from "../models/State";
// 定义主 diff 函数
const diff = (oldTree: VNode, newTree: VNode) => {
  const index = 0;
  const patches = {};
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
};

// 对两棵树进行深度有限遍历
const dfsWalk = (
  oldNode: VNode,
  newNode: VNode,
  index: number,
  patches: object
) => {
  let curPatch = [];
  if (!newNode) {
  } else if (isString(oldNode) && isString(newNode)) {
    curPatch.push({ type: State.TEXT, content: newNode });
  } else if (
    oldNode.tagName === newNode.tagName &&
    newNode.key == oldNode.key
  ) {
    let props = diffProps(oldNode.props, newNode.props);
    if (props.length) curPatch.push({ type: State.PROPS, props });
  } else {
    curPatch.push({ type: State.REPLACE, node: newNode });
  }
};
// 添加一个自定义的类型保护函数，判断对象是否是字符串
export const isString = (obj: any): obj is string => {
  return typeof obj === "string";
};
const diffProps = (oldProps: Props, newProps: Props) => {
  let patch = [];
  for (const key in oldProps) {
    // 防止遍历处继承的可枚举的属性
    if (oldProps.hasOwnProperty(key) && !newProps[key]) {
      patch.push({
        prop: key,
      });
    }
  }
  for (const key in newProps) {
    if (newProps.hasOwnProperty(key)) {
      if (!oldProps[key] || oldProps[key] !== newProps[key]) {
        patch.push({
          prop: key,
          value: newProps[key],
        });
      }
    }
  }
  return patch;
};
