// index.js
import { Counter } from "./Counter.js";
import { Hello } from "./Hello.js";
import { World } from "./World.js";

const body = document.body;

body.append(Hello());
body.append(World());
body.append(Counter());

