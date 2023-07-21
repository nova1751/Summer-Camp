import { State } from "../models/State";
import { Patches } from "./listDiff";
import { isString } from "./diff";
import { Props, VNode } from "../models/VNode";
let index = 0;
const patch = (node: Element, patches: Patches) => {
  let changes = patches[index];
  let childNodes = node?.childNodes;
  if (changes?.length && patches[index]) {
    changeDom(node as Element, changes);
  }
  // 这里的深度遍历和 diff 中是一样的
  if (!childNodes) index += 1;
  // console.log(node, index, patches);
  let last: Element | null = null;
  if (childNodes?.length) {
    childNodes.forEach((item) => {
      index = index + 1;
      last = item as Element;
      patch(item as Element, patches);
    });
  }
};
export default patch;
const changeDom = (node: Element, changes: any[]) => {
  changes.forEach((change) => {
    let { type } = change;
    switch (type) {
      case State.ChangeText:
        console.log("ChangeText");
        node.textContent = change.content;
        break;
      case State.ChangeProps:
        console.log("ChangeProps");

        let { props } = change;
        props.forEach((item: Props) => {
          console.log(item.prop, item.value, item);

          if (item.value) {
            node.setAttribute(item.prop, item.value);
          } else {
            node.removeAttribute(item.prop);
          }
        });
        break;
      case State.Remove:
        console.log("Remove");
        // console.log(node.childNodes[change.index], node);
        node.childNodes[change.index]?.remove();
        break;
      case State.Insert:
        console.log("Insert");
        let dom;
        if (isString(change.node)) {
          dom = document.createTextNode(change.node);
        } else if (change.node instanceof VNode) {
          dom = change.node.render();
        }
        // console.log(node, dom, node.childNodes[change.index], change.index);
        node.insertBefore(dom, node.childNodes[change.index]);
        break;
      case State.Replace:
        console.log("Replace");

        node.parentNode?.replaceChild(change.node.render(), node);
        break;
      case State.Move:
        console.log("Move");
        setTimeout(() => {
          let fromNode = node.childNodes[change.from];
          let toNode = node.childNodes[change.to];
          let cloneFromNode = fromNode?.cloneNode(true);
          let cloneToNode = toNode?.cloneNode(true);
          node.replaceChild(cloneFromNode, toNode);
          node.replaceChild(cloneToNode, fromNode);
        });
        // setTimeout(() => {
        //   let fromNode = node.childNodes[change.from];
        //   let toNode = node.childNodes[change.to];
        //   let anchor = fromNode.nextSibling;
        //   node.insertBefore(fromNode, toNode);
        //   if (anchor) {
        //     node.insertBefore(toNode, anchor);
        //   } else {
        //     node.appendChild(toNode);
        //   }
        // });
        break;
      default:
        break;
    }
  });
};
