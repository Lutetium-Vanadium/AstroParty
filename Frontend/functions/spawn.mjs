export const spawnSprite = (app,fileName,numberSprites, isMoving = 0, isTint = 0) =>
{

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

    const totalSprites = numberSprites;


    for (let i = 0; i < totalSprites; i++) {
        
        const sprite = PIXI.Sprite.from(fileName);

        sprite.scale.set(0.4 + Math.random()/10 * 0.1);

        sprite.x = Math.random() * app.screen.width;
        sprite.y = Math.random() * app.screen.height;

        sprite.tint = Math.random() * 0xFFFFFF;

        sprite.direction = Math.random() * Math.PI * 2;

        sprite.turningSpeed = Math.random() - 0.8;

        sprite.speed = 2 + Math.random() * 2;

        spriteMap.push(sprite);

        app.stage.addChild(sprite);
    }

    const spriteBoundsPadding = 100;
    const spriteBounds = new PIXI.Rectangle(-spriteBoundsPadding,
        -spriteBoundsPadding,
        app.screen.width + spriteBoundsPadding * 2,
        app.screen.height + spriteBoundsPadding * 2);

    return {
        "spriteMap" :spriteMap,
        "spriteBounds" : spriteBounds
    }

}

//returns spriteMap and sprteBounds