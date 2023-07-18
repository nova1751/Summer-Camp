import { createElement, insertDOM, render } from "./element";
let virtualDom = createElement("ul", { class: "list" }, [
  createElement("li", { class: "item" }, ["Test1"]),
  createElement("li", { class: "item" }, ["Test2"]),
  createElement("li", { class: "item" }, ["Test3"]),
]);
const el = render(virtualDom);
const app = document.querySelector<HTMLDivElement>("#app")!;
insertDOM(el, app);
