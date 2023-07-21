import { VNode, Child, Props } from "../models/VNode";
import { State } from "../models/State";
import { Patches, listDiff } from "./listDiff";
// 定义主 diff 函数
export const diff = (oldTree: VNode, newTree: VNode) => {
  const index = 0;
  const patches = {};
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
};

// 对两棵树进行深度有限遍历
const dfsWalk = (
  oldNode: Child,
  newNode: Child,
  index: number,
  patches: Patches
) => {
  let curPatch = [];
  if (!newNode) {
  } else if (isString(oldNode) && isString(newNode)) {
    curPatch.push({ type: State.ChangeText, content: newNode });
  } else if (
    (oldNode as VNode).tagName === (newNode as VNode).tagName &&
    (newNode as VNode).props.key === (oldNode as VNode).props.key
  ) {
    let props = diffProps((oldNode as VNode).props, (newNode as VNode).props);
    if (props.length) curPatch.push({ type: State.ChangeProps, props });
    diffChildren(
      (oldNode as VNode).children,
      (newNode as VNode).children,
      index,
      patches
    );
  } else {
    curPatch.push({ type: State.Replace, node: newNode });
  }
  if (curPatch.length) {
    if (patches[index]) {
      patches[index] = patches[index].concat(curPatch);
    } else {
      patches[index] = curPatch;
    }
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
const diffChildren = (
  oldChildren: Child[],
  newChildren: Child[],
  index: number,
  patches: Patches
) => {
  let { changes, list, oldKeys } = listDiff(oldChildren, newChildren);
  if (changes.length) {
    if (patches[index]) {
      patches[index] = patches[index].concat(changes);
    } else {
      patches[index] = changes;
    }
  }
  // console.log(index, oldChildren);

  let last: Child | null = null;
  oldChildren.forEach((item, i) => {
    if (item instanceof VNode) {
      if (last instanceof VNode)
        index = last?.count() ? index + last.count() + 1 : index + 1;
      else index += 1;
      // console.log(index);

      let key = list.indexOf(oldKeys[i]);
      let node = newChildren[key];
      if (node) {
        // console.log(item, node, index, patches);

        dfsWalk(item, node, index, patches);
      }
    } else {
      index += 1;
    }
    last = item;
  });
};
