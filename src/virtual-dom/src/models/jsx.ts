import { VNode, Child, Props } from "./VNode";

const createElement = (
  tagName: string,
  props: Props,
  children: Child[]
): VNode => {
  return new VNode(tagName, props, children);
};

// ⽤于解析jsx字符串的函数
// ⽤于递归解析jsx字符串的函数
function parser(element: string, variables: Props): VNode {
  element = element
    .replace(/[\r\n\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  // ⽤正则表达式匹配标签名，属性和内容，贪婪匹配
  const tagRegex = /<(\w+)(.*?)>([\s\S]*)<\/\1>/;
  const propRegex = /(\w+)=(['"{])(.*?)(['"}])/g;

  // 获取标签名，属性和内容
  const tagMatch = element.match(tagRegex)!;
  // console.log(element, tagMatch);

  const tagName = tagMatch[1];
  const propString = tagMatch[2];
  let content = tagMatch[3].trim();

  // console.log(tagMatch);

  // 创建一个空对象存储属性
  const props: Props = {};

  // 遍历属性字符串，获取属性名和值
  let propMatch;
  while ((propMatch = propRegex.exec(propString)) !== null) {
    const propName = propMatch[1];
    const propValue = propMatch[3];
    // 如果属性值是一个变量，就从当前作⽤域中获取它的值
    if (propMatch[2] === "{" && propMatch[4] === "}") {
      props[propName] = variables[propValue];
    } else {
      // 否则就直接赋值
      props[propName] = propValue;
    }
  }
  // Recursively parse nested tags in the content
  const children: Child[] = [];
  // const contentRegex = /(<(\w+)(.*?)>([\s\S]*?)<\/\2>)|([^<>]+)/g;
  // const contentRegex = /(<(\w+)(.*?)>([\s\S]*?)<\/\2>)|([^<>]+)/g;
  // let contentMatch;
  // while ((contentMatch = contentRegex.exec(content)) !== null) {
  //   // console.log(contentMatch);

  //   const mixedMatch = contentMatch[0].trim();
  //   if (contentMatch[1]) {
  //     children.push(parser(mixedMatch, variables));
  //   }
  //   if (contentMatch[5]) {
  //     children.push(mixedMatch);
  //   }
  // }
  // 判断内容是否包含嵌套的标签
  console.log(content);

  if (/<\w+/.test(content)) {
    // 如果包含，就递归地解析每个子标签，并将其添加到子节点数组中
    let subElement = "";
    let level = 0;
    for (let i = 0; i < content.length; i++) {
      subElement += content[i];
      if (content[i + 1] === "<" && content[i + 2] !== "/") {
        if (level === 0) {
          // 添加非空判断
          if (subElement.trim()) {
            children.push(subElement.trim());
          }
          subElement = "";
        }
        level++;
      }
      if (content[i + 1] === "<" && content[i + 2] === "/") {
        level--;
      }
      if (level === 0 && content[i] === ">") {
        children.push(parser(subElement.trim(), variables));
        subElement = "";
      }
    }
  } else {
    // 如果不包含，就直接将内容添加到子节点数组中
    if (content.trim()) {
      children.push(content.trim());
    }
  }
  // 返回构造的VDOM对象
  return createElement(tagName, props, children);
}
export const test = () => {
  const variables = {
    propName: "title",
    app: "app111",
    ccc: "11233ss",
  };
  let title = `
  <h1 className={propName}>
    Hello, world!
    <div id={app}>
      test
      <p id="app">test</p>
      <div id={app}>
        test
        <p id="app">test</p>
      </div>
    </div>
    ss
    <div id={ccc}>
      test  
    </div>
    test
  </h1>`;

  const vdom = parser(title, variables);
  // console.log(title);

  const vNode = createElement("h1", { className: "title" }, ["Hello, world!"]);
  console.log(
    vdom,
    JSON.stringify(vdom),
    JSON.stringify(vdom) == JSON.stringify(vNode)
  );
};
