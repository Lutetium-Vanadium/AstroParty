import Player from "../helpers/Player";
import { randint } from "../functions/random";
import Entity from "../helpers/Entity";

const PLAYER_SPEED = 3;

/**
 * spawnSprite()
 *
 * @param app PIXI.app
 * @param texture The texture for the file
 * @param options Specific Options
 */
export const spawnSprite = (
  app,
  texture,
  { totalSprites = 1, isMoving = false, isTint = false }
) => {
  // let dict = {};
  // let posSprite = []
  // let tint = null;
  // let direction = null;
  // let turningSpeed = null;
  // let speed = null;

  // for(let i = 0; i<number; i++){
  //    posSprite.push([Math.random() * screenX, Math.radnom()*screenY]);
  // }

  // if(isTint){
  //    tint = Math.random() * 0xFFFFFF;
  // }

  // if(isMoving){
  //     direction = Math.random() * Math.PI * 2;
  //     turningSpeed = Math.random() - 0.8;
  //     speed = 2 + Math.random() * 2;
  // }

  const spriteMap = [];

  for (let i = 0; i < totalSprites; i++) {
    const pos = [randint(app.screen.width), randint(app.screen.height)];
    const velMag = 2 + Math.random() * 2;
    const angle = Math.random() * Math.PI * 2;
    const omega = (Math.random() - 0.8) * 0.01;

    const sprite = new Entity(texture, pos, velMag, angle, omega);

    sprite.sprite.tint = Math.random() * 0xffffff;

    spriteMap.push(sprite);

    app.stage.addChild(sprite.sprite);
  }

  console.log({ spriteMap, app });
  return spriteMap;
};

export const spawnPlayer = (app, texture) => {
  // const player = new PIXI.Sprite(texture);

  const pos = [randint(app.screen.width), randint(app.screen.height)];
  const angle = Math.random() * Math.PI * 2;
  const omega = 0.005;

  const player = new Player(texture, pos, PLAYER_SPEED, angle, omega);
  app.stage.addChild(player.sprite);

  return player;
};
