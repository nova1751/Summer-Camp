import { VNode, Child, Props } from "./VNode";

const createElement = (
  tagName: string,
  props: Props,
  children: Child[]
): VNode => {
  return new VNode(tagName, props, children);
};

// ⽤于解析jsx字符串的函数
// function parser(element: string, propNameV: string) {
//   // ⽤正则表达式匹配标签名，属性和内容
//   const tagRegex = /<(\w+)(.*?)>/;
//   const propRegex = /(\w+)=(['"{])(.*?)(['"}])/g;
//   const contentRegex = />(.*?)</;

//   // 获取标签名，属性和内容
//   const tagMatch = element.match(tagRegex)!;
//   console.log(tagMatch);

//   const tagName = tagMatch[1];
//   const propString = tagMatch[2];
//   const contentMatch = element.match(contentRegex)!;
//   const content = contentMatch[1];
//   //   console.log(propString, propRegex.exec(propString));

//   // 创建一个空对象存储属性
//   const props: Props = {};

//   // 遍历属性字符串，获取属性名和值
//   let propMatch;
//   while ((propMatch = propRegex.exec(propString)) !== null) {
//     const propName = propMatch[1];
//     const propValue = propMatch[3];
//     // 如果属性值是一个变量，就从当前作⽤域中获取它的值
//     console.log(propMatch);

//     if (propMatch[2] === "{" && propMatch[4] === "}") {
//       props[propName] = propNameV;
//     } else {
//       // 否则就直接赋值
//       props[propName] = propValue;
//     }
//   }

//   // 返回构造的VDOM对象
//   return createElement(tagName, props, [content]);
// }
function parser(element: string): VNode | null {
  const regex = /<(\w+)\s*([^>]*)>(.*?)<\/\1>/s;
  const match = element.match(regex);
  console.log(match);

  if (match) {
    const [, tagName, attributes, innerHTML] = match;
    const props: { [key: string]: any } = {};
    const propsRegex = /\s*([\w-]+)="([^"]*)"/g;

    let propMatch;
    while ((propMatch = propsRegex.exec(attributes))) {
      const [, propName, propValue] = propMatch;
      props[propName] = propValue;
    }

    const children: Child[] = [];

    if (innerHTML) {
      // Recursively parse nested elements
      const nestedElements = parser(innerHTML);
      console.log(innerHTML, nestedElements);

      if (Array.isArray(nestedElements)) {
        children.push(...nestedElements);
      } else {
        children.push(nestedElements as VNode);
      }
    }

    return createElement(tagName, props, children);
  }

  return null;
}
export const test = () => {
  //   const propName = "title";
  //   const title = "<h1 className={propName}>Hello, world!</h1>";
  //   const vdom = parser(title, propName);
  //   const vNode = createElement("h1", { className: "title" }, ["Hello, world!"]);
  //   console.log(
  //     vdom,
  //     JSON.stringify(vdom),
  //     JSON.stringify(vdom) == JSON.stringify(vNode)
  //   );
  const propName = "title";
  const title = "<h1 className={propName}>Hello, world!</h1>";
  const paragraph = "<p>This is a paragraph.</p>";
  const nestedElement = `<div>${title}${paragraph}</div>`;
  const vdom = parser(nestedElement);

  //   console.log(vdom);
};
