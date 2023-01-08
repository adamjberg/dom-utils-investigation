// Hello.js
import { Div } from "./Dom.js";

export function Hello() {
  return Div({
    innerText: "Hello",
    styles: {
      fontSize: "36px",
      color: "red",
    },
  });
}
