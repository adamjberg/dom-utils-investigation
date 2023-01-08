// Counter.js
import { Div } from "./Dom.js";

export function Counter() {
  const el = Div({
    innerText: "0",
  });

  let count = 0;
  function setCount(newCount) {
    count = newCount;
    el.innerText = String(newCount);
  }

  el.addEventListener("click", () => {
    setCount(count + 1);
  });

  return el;
}
