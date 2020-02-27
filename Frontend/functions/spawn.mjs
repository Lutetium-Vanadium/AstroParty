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
    const sprite = new PIXI.Sprite(texture);

    sprite.scale.set(0.4 + (Math.random() / 10) * 0.1);

    sprite.x = Math.random() * app.screen.width;
    sprite.y = Math.random() * app.screen.height;

    sprite.tint = Math.random() * 0xffffff;

    sprite.direction = Math.random() * Math.PI * 2;

    sprite.turningSpeed = Math.random() - 0.8;

    sprite.speed = 2 + Math.random() * 2;

    spriteMap.push(sprite);

    app.stage.addChild(sprite);
  }

  const padding = 100;
  const spriteBounds = new PIXI.Rectangle(
    -padding,
    -padding,
    app.screen.width + padding * 2,
    app.screen.height + padding * 2
  );

  return {
    spriteMap,
    spriteBounds
  };
};

//returns spriteMap and sprteBounds
