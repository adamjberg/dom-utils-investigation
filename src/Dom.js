// Dom.js
export function setStyles(el, styles) {
  if (!styles) {
    return;
  }

  for (const key of Object.keys(styles)) {
    el.style[key] = styles[key];
  }
}

export function Div(props) {
  const el = document.createElement("div");

  el.innerText = props.innerText;

  setStyles(el, props.styles);

  return el;
}
