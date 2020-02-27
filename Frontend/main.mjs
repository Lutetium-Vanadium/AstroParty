import { randint, choice } from "./functions/random.mjs";
import { spawnSprite, spawnPlayer } from "./functions/spawn.mjs";
import { tickerFunc } from "./functions/addTicker.mjs";
import keyboard from "./functions/keyboard.mjs";

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  autoResize: true,
  transparent: true
});
document.body.appendChild(app.view);

app.renderer.view.style.postion = "absolute";
app.renderer.view.style.display = "block";

document.getElementById("bg").src = `./backgrounds/${randint(3)}.jpg`;

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
  .add("ship/blue", "assets/ship_blue.png")
  .add("ship/green", "assets/ship_green.png")
  .add("ship/purple", "assets/ship_purple.png")
  .add("ship/red", "assets/ship_red.png")
  .add("asteroid", "assets/asteroid.png")
  .add("banana", "assets/bananas.svg")
  .add("comet", "assets/comet.png")
  .load((loader, resources) => {
    const asteroids = spawnSprite(app, resources.asteroid.texture, {
      totalSprites: 15,
      isMoving: true,
      isTint: true
    });
    const comets = spawnSprite(app, resources.comet.texture, {
      totalSprites: 15,
      isMoving: true,
      isTint: true
    });

    // Make a player sprite (with a random colour for now)
    const player = spawnPlayer(app, resources[choice(shipCols)].texture);

    const playerKeyboard = keyboard("ArrowLeft", "ArrowRight");

    playerKeyboard.press = key => {
      switch (key) {
        case "ArrowLeft":
          player.direction += 0.06;
          break;
        case "ArrowRight":
          player.direction -= 0.06;
          break;
        default:
          console.error(key, "not found.");
          break;
      }
    };

    app.ticker.add(() => tickerFunc([player], bounds));
  });

loader.onProgress.add((loader, resource) =>
  console.log("Progress", { progress: loader.progress, loader, resource })
);
loader.onComplete.add((loader, resources) =>
  console.log("Complete", { progress: loader.progress, loader, resources })
);
