// index.js
function setStyles(el, styles) {
  if (!styles) {
    return;
  }

  for (const key of Object.keys(styles)) {
    el.style[key] = styles[key];
  }
}

function Div(props) {
  const el = document.createElement("div");

  el.innerText = props.innerText;

  setStyles(el, props.styles);

  return el;
}

const body = document.body;

const hello = Div({
  innerText: "Hello",
  styles: {
    fontSize: "36px",
    color: "red",
  },
});

body.append(hello);

const world = Div({
  innerText: "World",
  styles: {
    fontSize: "24px",
    color: "rgb(0, 255, 0)",
  },
});

body.append(world);

let count = 0;

const countDiv = Div({
  innerText: "0",
});

function setCount(newCount) {
  count = newCount;
  countDiv.innerText = String(newCount);
}

body.append(countDiv);

body.addEventListener("click", () => {
  setCount(count + 1);
});
