import { Child, VNode } from "../models/VNode";
import { isString } from "./diff";

// 对有 key 的节点进行处理
const listDiff = (
  oldList: Child[],
  newList: Child[],
  index: number,
  patches: object
) => {
  let oldKeys = getKeys(oldList);
  let newKeys = getKeys(newList);
  let change = [];
  let list = [];
  oldKeys.forEach((item) => {
    const index = newKeys.indexOf(item);
    if (index) {
      list.push(null);
    } else {
      list.push(item);
    }
  });
};

const getKeys = (list: Child[]) => {
  const keys: (number | string)[] = [];
  list.forEach((item) => {
    let key!: number | string;
    if (isString(item)) {
      key = item;
    } else if (item instanceof VNode) {
      key = item.key!;
    }
    keys.push(key);
  });
  return keys;
};
