export const tickerFunc =  (spriteMap,spriteBounds) => {
        //this is a for loop
        for (let i = 0; i < spriteMap.length; i++) {
            const sprite = spriteMap[i];
            sprite.direction += sprite.turningSpeed * 0.01;
            sprite.x += Math.sin(sprite.direction) * sprite.speed;
            sprite.y += Math.cos(sprite.direction) * sprite.speed;
            sprite.rotation = -sprite.direction - Math.PI / 2;

            if (sprite.x < spriteBounds.x) {
                sprite.x += spriteBounds.width;
            } 
            else if (sprite.x > spriteBounds.x + spriteBounds.width) {
                sprite.x -= spriteBounds.width;
            }


            if (sprite.y < spriteBounds.y) {
                sprite.y += spriteBounds.height;
            }
             else if (sprite.y > spriteBounds.y + spriteBounds.height) {
                sprite.y -= spriteBounds.height;
            }
        }

        return {
            "spriteMap": spriteMap,
            "spriteBounds":spriteBounds
        }
        





    }



    //clean code be like