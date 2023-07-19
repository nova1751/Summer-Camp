import { VNode } from "./models/VNode";
import { test } from "./models/jsx";
import { diff } from "./utils/diff";
import patch from "./utils/patch";
let virtualDom = new VNode("ul", { class: "list" }, [
  new VNode("li", { class: "item" }, ["Test1"]),
  new VNode("li", { class: "item" }, ["Test2"]),
  new VNode("li", { class: "item" }, ["Test3"]),
]);
let virtualDom0 = new VNode("ul", { class: "list" }, [
  new VNode("li", { class: "item" }, ["Test22"]),
  new VNode("li", { class: "item" }, ["Test11"]),
  new VNode("li", { class: "item" }, ["Test33"]),
  new VNode("div", { class: "test" }, [
    "test",
    new VNode("li", { class: "item" }, ["Test1"]),
    new VNode("li", { class: "item" }, ["Test2"]),
    new VNode("li", { class: "item" }, ["Test3"]),
  ]),
]);
const app = document.querySelector<HTMLDivElement>("#app")!;
const patches = diff(virtualDom, virtualDom0);
setTimeout(() => {
  patch(app, patches);
}, 1000);
virtualDom.insert(app);
test();
