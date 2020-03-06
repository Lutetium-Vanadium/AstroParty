export const tickerFunc = (spriteMap, spriteBounds, app) => {
  //this is a for loop
  for (const sprite of spriteMap) {
    if (sprite.isPlayer) {
      // console.log(sprite.turningSpeed);
    }

    sprite.direction += sprite.turningSpeed;
    sprite.turningSpeed = limit(sprite.turningSpeed - sprite.omega, -0.1, 0.1);
    sprite.x += Math.sin(sprite.direction) * sprite.speed;
    sprite.y += Math.cos(sprite.direction) * sprite.speed;
    sprite.rotation = -sprite.direction - Math.PI / 2;

    if (sprite.x < spriteBounds.x) {
      sprite.x += spriteBounds.width;
    } else if (sprite.x > spriteBounds.x + spriteBounds.width) {
      sprite.x -= spriteBounds.width;
    }

    if (sprite.y < spriteBounds.y) {
      sprite.y += spriteBounds.height;
    } else if (sprite.y > spriteBounds.y + spriteBounds.height) {
      sprite.y -= spriteBounds.height;
    }
  }
};

//clean code be like

const limit = (value, min, max) => {
  return Math.max(min, Math.min(value, max));
};
