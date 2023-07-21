import { State } from "../models/State";
import { Child, VNode } from "../models/VNode";
import { isString } from "./diff";
export interface Patches {
  [key: string]: any[];
}
// 对有 key 的节点进行处理
export const listDiff = (oldList: Child[], newList: Child[]) => {
  // console.log(oldList, newList);
  let oldKeys = getKeys(oldList);
  let newKeys = getKeys(newList);
  let changes = [];
  let list: (string | number | null)[] = [];
  // console.log(oldKeys, newKeys);

  oldKeys.forEach((key) => {
    const index = newKeys.indexOf(key);
    if (index !== -1) {
      list.push(key);
    } else {
      list.push(null);
    }
  });

  let length = list.length;
  for (let i = length - 1; i >= 0; i--) {
    if (!list[i]) {
      list.splice(i, 1);
      changes.push({
        type: State.Remove,
        index: i,
      });
    }
  }

  newList.forEach((item, i) => {
    const key = newKeys[i];
    const index = list.indexOf(key);
    if (index === -1 || key === null) {
      changes.push({
        type: State.Insert,
        node: item,
        index: i,
      });
      list.splice(i, 0, key);
    } else {
      if (index !== i) {
        changes.push({
          type: State.Move,
          from: index,
          to: i,
        });
        move(list, index, i);
      }
    }
  });
  return { changes, list, oldKeys, newKeys };
};

// 声明一个常量函数
const move = (
  arr: (string | number | null)[],
  old_index: number,
  new_index: number
) => {
  [arr[old_index], arr[new_index]] = [arr[new_index], arr[old_index]];
};

const getKeys = (list: Child[]) => {
  let i = 0;
  const keys: (number | string | null)[] = [];
  list.forEach((item) => {
    let key: number | string | null = null;
    if (isString(item)) {
      key = item;
      // console.log(1);
    } else if (item instanceof VNode) {
      key = item.props.key ?? i++;
    }
    keys.push(key);
  });

  return keys;
};
