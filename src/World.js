// World.js
import { Div } from "./Dom.js";

export function World() {
  return Div({
    innerText: "World",
    styles: {
      fontSize: "24px",
      color: "rgb(0, 255, 0)",
    },
  });
}
