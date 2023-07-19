import { State } from "../models/State";
import { Patches } from "./listDiff";
import { isString } from "./diff";
import { VNode } from "../models/VNode";
let index = 0;
const patch = (node: Element, patchs: Patches) => {
  let changes = patchs[index];
  let childNodes = node.childNodes;

  // 这里的深度遍历和 diff 中是一样的
  if (!childNodes) index += 1;
  if (changes && changes.length && patchs[index]) {
    changeDom(node as Element, changes);
  }
  let last: Element | null = null;
  if (childNodes && childNodes.length) {
    childNodes.forEach((item) => {
      index =
        last && last.children ? index + last.children.length + 1 : index + 1;
      patch(item as Element, patchs);
      last = item as Element;
    });
  }
};
export default patch;
const changeDom = (node: Element, changes: any[]) => {
  changes.forEach((change) => {
    let { type } = change;
    switch (type) {
      case State.ChangeText:
        node.textContent = change.textContent;
        break;
      case State.ChangeProps:
        let { props } = change;
        props.forEach((item: any) => {
          if (item.value) {
            node.setAttribute(item.prop, item.value);
          } else {
            node.removeAttribute(item.prop);
          }
        });
        break;
      case State.Remove:
        node.childNodes[change.index]?.remove();
        break;
      case State.Insert:
        let dom;
        if (isString(change.node)) {
          dom = document.createTextNode(change.node);
        } else if (change.node instanceof VNode) {
          dom = change.node.render();
        }
        node.insertBefore(dom, node.childNodes[change.index]);
        break;
      case State.Replace:
        node.parentNode?.replaceChild(change.node.render(), node);
        break;
      case State.Move:
        let fromNode = node.childNodes[change.from];
        let toNode = node.childNodes[change.to];

        let cloneFromNode = fromNode?.cloneNode(true);
        let cloneToNode = toNode?.cloneNode(true);
        node.replaceChild(cloneFromNode, toNode);
        node.replaceChild(cloneToNode, fromNode);
        break;
      default:
        break;
    }
  });
};
