# Vanilla JS Components

In the past, I've written about [frustrations with React](https://devtails.xyz/@adam/am-i-overreacting-or-is-react-over-reacting) which primarily stem from the internal "rendering" process that React uses.  While having state changes automatically trigger re-rendering is great in many cases, I've started to wonder whether the performance cost it adds is worth it.  This post is an early exploration around some alternative ways of writing client side JavaScript components.  This is by no means a final iteration, but writing it up should help me assess where it falls short.

## Hello World

Before adding any additional layers, we'll create the simplest Hello World application using DOM functions that are availabile in JavaScript

![](/assets/hello-world-1.png)

```js
// index.js
const div = document.createElement('div');
div.innerText = "Hello World";
document.body.appendChild(div);
```

```html
<!-- index.html -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM</title>
    <script src="/index.js" defer></script>
</head>
<body>
    
</body>
</html>
```

## Creating Div Helper Function

This is feeling pretty verbose compared to the `<div>Hello World</div>` that achieves the same thing in either HTML or JSX.  I may explore a JSX version in the future, but for now we can simplify by adding a new `Div` function.

![](/assets/hello-world-2.png)

```js
// index.js
function Div(props) {
  const el = document.createElement("div");

  el.innerText = props.innerText;

  return el;
}

const body = document.body;

body.appendChild(
  Div({
    innerText: "Hello",
  })
);

body.appendChild(
  Div({
    innerText: "World",
  })
);
```

## Adding Styles

Several years ago there were heated arguments about keeping HTML, CSS, and JS separate from each other.  Nowadays, combining all of these in to your "JavaScript" (if you can even call it that at this point) has become fairly standard.  After managing 3 separate files for every component in AngularJS for many years, I have found slightly more happiness keeping styles in the same file as the component itself. 

![](/assets/hello-world-3.png)

```js
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

body.appendChild(
  Div({
    innerText: "Hello",
    styles: {
      fontSize: "36px",
      color: "red",
    },
  })
);

body.appendChild(
  Div({
    innerText: "World",
    styles: {
      fontSize: "24px",
      color: "rgb(0, 255, 0)",
    },
  })
);
```

## Interactivity & Managing State

Interactivity is the real reason for this exploration.  The code above is very clearly more verbose than the html it boils down to.  One key frustration with React is that during the first render, none of your elements actually exist yet.  This leads to the existence of things like `useEffect` and `useRef`.  Something a seasoned React-ist doesn't blink an eye at, but try explaining to someone that hasn't yet used React and you'll find it can easily take a month before a new person actually understands what these are doing.  During that time, you need to constantly monitor and re-iterate how it works to ensure they aren't used incorrectly.

```js
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
  innerText: "0"
});

function setCount(newCount) {
  count = newCount;
  countDiv.innerText = String(newCount);
}

body.append(countDiv);

body.addEventListener("click", () => {
  setCount(count + 1);
});
```

## Refactoring

Until this point, I've left everything in the `index.js` file to keep things all in one place.  In reality, this quickly gets out of hand even with just a few components.  In this section I'll separate the components out into their own files to demonstrate how an application following these applications might look.

```js

```