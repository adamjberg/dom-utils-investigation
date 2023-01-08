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

![](/assets/hello-world-4.png)

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

Until this point, I've left everything in the `index.js` file to keep things all in one place.  In reality, this quickly gets out of hand even with just a few components.  In this section, I'll separate the components out into their own files to demonstrate how an application following these conventions might look.

```diff
<!-- index.html -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM</title>
-   <script src="/index.js" defer></script>
+   <script src="/index.js" defer type="module"></script>
</head>
<body>
    
</body>
</html>
```

```js
// index.js
import { Hello } from "./Hello.js";
import { World } from "./World.js";
import { Counter } from "./Counter.js";

const body = document.body;

body.append(Hello());
body.append(World());
body.append(Counter());

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
```

## Comparison to React

### React Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// App.js
import { Counter } from "./Counter";
import { Hello } from "./Hello";
import { World } from "./World";

function App() {
  return (
    <>
      <Hello />
      <World />
      <Counter />
    </>
  );
}

export default App;

// Hello.js
export function Hello() {
  return (
    <div
      style={{
        fontSize: 36,
        color: "red",
      }}
    >
      Hello
    </div>
  );
}

// World.js
export function World() {
  return (
    <div
      style={{
        fontSize: 24,
        color: "rgb(0, 255, 0)",
      }}
    >
      World
    </div>
  );
}

// Counter.js
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {count}
    </div>
  );
}
```

### Performance

It's almost silly to compare performance at this point, but doing so starts to give some idea of where gains can be made.

#### Initial JavaScript Load

![](/assets/performance-1.png)

One of the key differences is the size of the JavaScript bundle between the two.  My presented solutions bundles and minifies down to 539 Bytes whereas the React minified bundle comes to 143 kB.  For now, I' mostly ignoring network latency.  The screenshot above has different timings for fetching the index.html, but these numbers fluctuate so much that it's not worth comparing.

The primary performance difference boils down to evaluating the JavaScript code.  The initial code presented here takes 0.42 ms to evaluate, whereas React takes a whopping 15.66 ms just to evaluate.  This is then followed by a 5.62 ms function call that presumably is React's initialization.

Rounding these numbers a bit we get 0.5 ms vs. 20 ms or a 40 times speed up.

#### Updating State

0.32 ms and 97 micro seconds are two data points for the vanilla solution and 1.57 ms and 1.37 ms for the React solution.  

## Concluding Thoughts

It's obvious that these micro-benchmarks would reveal the results that they do.  I've been curious to know more precisely what the difference is and this investigation has helped me confirm.  

What is less clear to me is whether this approach breaks down when it comes to cross component communication. The concept of props is not really tested here and that is arguably one of the key things React is providing (the ability to re-render on props changing).  This will be my next exploration.

I'm also uncertain whether JSX would bring improvements or just be an additional compliation step that isn't really worth it.  I suspect most of what it provides could be achieved through better utility functions and conventions.  The additional benefit of this is that these approaches become more language agnostic as I would eventually like to look into porting this into Rust.