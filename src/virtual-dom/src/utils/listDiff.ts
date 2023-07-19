import { State } from "../models/State";
import { Child, VNode } from "../models/VNode";
import { isString } from "./diff";
export interface Patches {
  [key: string]: any[];
}
// 对有 key 的节点进行处理
export const listDiff = (oldList: Child[], newList: Child[]) => {
  console.log(oldList, newList);
  let oldKeys = getKeys(oldList);
  let newKeys = getKeys(newList);
  let changes = [];
  let list: (string | number | null)[] = [];
  oldKeys.forEach((key) => {
    const index = newKeys.indexOf(key);
    if (index) {
      list.push(null);
    } else {
      list.push(key);
    }
  });
  let length = list.length;
  for (let i = length - 1; i >= 0; i--) {
    if (!list[i]) {
      list.pop();
      changes.push({
        type: State.Remove,
        index: i,
      });
    }
  }
  newList.forEach((item, i) => {
    const key = newKeys[i];
    const index = list.indexOf(key);
    // console.log(index, list);
    // console.log(index, key, list, newKeys);

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
    // console.log(index, i);
  });
  return { changes, list, oldKeys, newKeys };
};

// 声明一个常量函数
const move = (
  arr: (string | number | null)[],
  old_index: number,
  new_index: number
) => {
  // 取绝对值，从数组的末尾开始计算负数索引
  old_index = Math.abs(old_index);
  new_index = Math.abs(new_index);
  // 取余数，将超出范围的索引映射到数组的长度内
  old_index = old_index % arr.length;
  new_index = new_index % arr.length;
  // 使用 splice方法移动元素，并返回修改后的数组
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};
let i = 0;
const getKeys = (list: Child[]) => {
  // console.log("test");

  const keys: (number | string | null)[] = [];
  list.forEach((item) => {
    let key: number | string | null = null;
    if (isString(item)) {
      key = item;
      console.log(1);
    } else if (item instanceof VNode) {
      key = item.key ?? i++;
    }
    keys.push(key);
  });
  return keys;
};
