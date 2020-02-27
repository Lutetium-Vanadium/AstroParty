import { randint } from "./functions/random.mjs";
import { spawnSprite} from "./functions/spawn.mjs";
import { tickerFunc } from "./functions/addTicker.mjs";

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

loader
  .add("ship/blue", "assets/ship_blue.png")
  .add("ship/green", "assets/ship_green.png")
  .add("ship/purple", "assets/ship_purple.png")
  .add("ship/red", "assets/ship_red.png")
  .add("asteroid","assets/asteroid.png")
  .add("banana","assets/bananas.svg")
  .add("comet","assets/comet.png")
  .load((loader, resources) => {
    console.log({ loader, resources });
  });

loader.onProgress.add((loader, resource) =>
  console.log("Progress", { progress: loader.progress, loader, resource })
);
loader.onComplete.add((loader, resources) =>
  console.log("Complete", { progress: loader.progress, loader, resources })
);


let dict = spawnSprite(app, "assets/asteroid.png", 15,1,1);
app.ticker.add(tickerFunc(dict["spriteMap"],dict["spriteBounds"]));
