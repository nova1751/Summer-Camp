import { VNode } from "./models/VNode";
let virtualDom = new VNode("ul", { class: "list" }, [
  new VNode("li", { class: "item" }, ["Test1"]),
  new VNode("li", { class: "item" }, ["Test2"]),
  new VNode("li", { class: "item" }, ["Test3"]),
]);
const app = document.querySelector<HTMLDivElement>("#app")!;
virtualDom.insert(app);
