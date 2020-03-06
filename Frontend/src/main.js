import * as PIXI from "pixi.js";

import { randint, choice } from "./functions/random";
import { spawnSprite, spawnPlayer } from "./functions/spawn";
import { tickerFunc } from "./functions/addTicker";
import keyboard from "./functions/keyboard";

import img0 from "./backgrounds/0.jpg";
import img1 from "./backgrounds/1.jpg";
import img2 from "./backgrounds/2.jpg";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  autoResize: true,
  transparent: true
});
document.body.appendChild(app.view);

app.renderer.view.style.postion = "absolute";
app.renderer.view.style.display = "block";

const images = [img0, img1, img2];

document.getElementById("bg").src = choice(images);

const loader = new PIXI.Loader();

const shipCols = ["ship/blue", "ship/green", "ship/purple", "ship/red"];

const padding = 0;
const bounds = new PIXI.Rectangle(
  -padding,
  -padding,
  app.screen.width + padding * 2,
  app.screen.height + padding * 2
);

loader
  .add("ship/blue", require("./assets/ship_blue.png"))
  .add("ship/green", require("./assets/ship_green.png"))
  .add("ship/purple", require("./assets/ship_purple.png"))
  .add("ship/red", require("./assets/ship_red.png"))
  .add("asteroid", require("./assets/asteroid.png"))
  .add("banana", require("./assets/bananas.svg"))
  .add("comet", require("./assets/comet.png"))
  .load((loader, resources) => {
    // const asteroids = spawnSprite(app, resources.asteroid.texture, {
    //   totalSprites: 15,
    //   isMoving: true,
    //   isTint: true
    // });
    // const comets = spawnSprite(app, resources.comet.texture, {
    //   totalSprites: 15,
    //   isMoving: true,
    //   isTint: true
    // });

    // Make a player sprite (with a random colour for now)
    const player = spawnPlayer(app, resources[choice(shipCols)].texture);

    const playerKeyboard = keyboard("ArrowLeft", "ArrowRight");

    playerKeyboard.press = key => {
      switch (key) {
        case "ArrowLeft":
          player.omega -= 0.05;
          break;
        case "ArrowRight":
          player.omega += 0.05;
          break;
        default:
          console.error(key, "not found.");
          break;
      }
    };

    playerKeyboard.release = () => {
      player.omega = 0;
    };

    app.ticker.maxFPS = 60;
    app.ticker.add(() => {
      tickerFunc([player], bounds);
    });
  });

loader.onProgress.add((loader, resource) =>
  console.log("Progress", { progress: loader.progress, loader, resource })
);
loader.onComplete.add((loader, resources) =>
  console.log("Complete", { progress: loader.progress, loader, resources })
);
