export const tickerFunc = (spriteMap, spriteBounds) => {

  for (const sprite of spriteMap) {
    sprite.tick(spriteBounds);

    // sprite.direction += sprite.turningSpeed;
    // sprite.turningSpeed = limit(sprite.turningSpeed - sprite.omega, -0.1, 0.1);
    // sprite.x += Math.sin(sprite.direction) * sprite.speed;
    // sprite.y += Math.cos(sprite.direction) * sprite.speed;
    // sprite.rotation = -sprite.direction - Math.PI / 2;
  }
};

//clean code be like

// const limit = (value, min, max) => {
//   return Math.max(min, Math.min(value, max));
// };
