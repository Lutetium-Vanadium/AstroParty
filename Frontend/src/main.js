import * as PIXI from "pixi.js";

import { randint, choice } from "./functions/random";
import { spawnSprite, spawnPlayer } from "./functions/spawn";
import { tickerFunc } from "./functions/addTicker";
import InputListener from "./functions/input";

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

const SPEED = 0.03;
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

    const playerInput = new InputListener("ArrowLeft", "ArrowRight");

    playerInput.trackKeydown(
      key => {
        switch (key) {
          case "ArrowLeft":
            player.down = -SPEED;
            break;
          case "ArrowRight":
            player.down = SPEED;
            break;
          default:
            console.error(key, "not found.");
            break;
        }
      },
      () => {
        player.down = 0;
      }
    );
    playerInput.trackTouch(
      touchEvt => {
        if (touchEvt.clientX < window.innerWidth / 2) {
          player.down = -SPEED;
        } else {
          player.down = SPEED;
        }
      },
      () => {
        player.down = 0;
      }
    );

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
