import { VNode } from "./models/VNode";
import { parser, test } from "./models/jsx";
import { diff } from "./utils/diff";
import patch from "./utils/patch";
// let virtualDom = new VNode("ul", { class: "list" }, [
//   new VNode("li", { class: "item" }, ["Test1"], 1),
//   new VNode("li", { class: "item" }, ["Test2"], 2),
//   new VNode("li", { class: "item" }, ["Test3"], 3),
// ]);
// let virtualDom0 = new VNode("ul", { class: "list" }, [
//   new VNode("li", { class: "item" }, ["Test33"], 3),
//   new VNode("li", { class: "item" }, ["Test2"], 2),
//   new VNode("li", { class: "item" }, ["Test1"], 1),
// ]);
const variables = {
  propName: "title",
  app: "app111",
  ccc: "11233ss",
};
const virtualDom = parser(
  `
<ul>
  <li class="item" key="1">
    <div class="test">asdasdasdasdasdassdasdasda</div>
  </li>
  <li class="item" key="2">
    test1
    <div class="test">asdasdasdasdasdassdasdasda</div>
  </li>
  <li class="item" key="3">test2</li>
  <li class="item" key="4">test3</li>
  <li class="item" key="5">test4</li>
  <li class="item" key="6">test5</li>
  <li class="item" key="7">test6</li>
  <li class="item" key="8">
    test7
    <div class="test">asdasdasdasdasdassdasdasda</div>
  </li>
  <li class="item" key="9">test8</li>
  <li class="item" key="10">test9</li>
  <li class="item" key="11">
    test10
    <div class="test">asdasdasdasdasdassdasdasda</div>
  </li>
  <li class="item" key="12">test11</li>
  <li class="item" key="13">test12</li>
  <li class="item" key="14">test13</li>
  <li class="item" key="15">test14</li>
  <li class="item" key="16">test15</li>
  <li class="item" key="17">test16</li>
  <li class="item" key="18">test17</li>
  <li class="item" key="19">
    test18
    <div class="test">asdasdasdasdasdassdasdasda</div>
  </li>
  <li class="item" key="20">test19</li>
  <li class="item" key="21">test20</li>
  <li class="item" key="22">test21</li>
  <li class="item" key="23">test12</li>
  <li class="item" key="24">test123</li>
  <li class="item" key="25">test1444</li>
  <li class="item" key="26">test1444</li>
  <li class="item" key="27">test1444</li>
  <li class="item" key="28">test14221</li>
  <li class="item" key="29">test14442</li>
  <li class="item" key="30">test1231</li>
</ul>
`,
  variables
);
const virtualDom0 = parser(
  `
<ul>
  <li class="item" key="1">
    <div class="test">asdasdasdasdasdassdasdasda</div>
  </li>
  <li class="item" key="2">
    test1
    <div class="test">asdasdasdasdasdassdasdasda</div>
  </li>
  <li class="item" key="3">test2</li>
  <div class="item" key="4">test3</div>
  <li class="item" key="8">
    test7
    <div class="test">asdasdasdasdasdassdasdasda</div>
  </li>
  <li class="item" key="5">test4</li>
  <li class="item4" key="6">test5</li>
  <li class="item3" key="7">test6</li>
  <li class="item" key="9">test8</li>
  <li class="item2" key="10">test9</li>
  <li class="item" key="11">
    test10
    <div class="test1">asdasdasdasdasdassdasdasda</div>
  </li>
  <li class="item" key="12">test11</li>
  <li class="item" key="13">test12</li>
  <li class="item" key="14">test13</li>
  <li class="item" key="19">
    test18
    <div class="test1">asdasdasdasdasdassdasdasda</div>
  </li>
  <li class="item1" key="15">test14</li>
  <li class="item" key="16">test15</li>
  <li class="item" key="17">test16</li>
  <li class="item" key="18">test17</li>
  <li class="item" key="20">test19</li>
  <li class="item" key="25">test1444</li>
  <li class="item" key="26">test1444</li>
  <li class="item" key="27">test1444</li>
  <li class="item" key="28">test14221</li>
  <li class="item" key="29">test14442</li>
  <li class="item" key="21">test20</li>
  <li class="item" key="22">test21</li>
  <li class="item" key="23">test12</li>
  <li class="item" key="24">test123</li>
  <li class="item" key="30">test1231</li>
</ul>
`,
  variables
);
const app = document.querySelector<HTMLDivElement>("#app")!;
const patches = diff(virtualDom, virtualDom0);

setTimeout(() => {
  patch(app.childNodes[0] as Element, patches);
}, 1000);
virtualDom.insert(app);
