import paper from "paper";

const userState = { velX: 0, velY: 0, speed: 4, friction: 0.98, keys: {} };

function startyMovementHandler (event) {


    event.preventDefault();



    if (event.type === "keydown") {
        userState.keys[event.key] = true;
    }

    if (event.type === "keyup") {
        userState.keys[event.key] = false;
    }



}


function update (myCharacter, mapSize, mobs) {

    if (userState.keys["ArrowUp"]) {
        if (userState.velY > -userState.speed) {
            userState.velY--;
        }
    }
    if (userState.keys["ArrowDown"]) {
        if (userState.velY < userState.speed) {
            userState.velY++;
        }
    }
    if (userState.keys["ArrowRight"]) {
        myCharacter.setReverse(true);
        if (userState.velX < userState.speed) {
            userState.velX++;
        }
    }
    if (userState.keys["ArrowLeft"]) {
        myCharacter.setReverse(false);
        if (userState.velX > -userState.speed) {
            userState.velX--;
        }
    }
    const nextPosition = myCharacter.getPosition();

    userState.velY *= userState.friction;
    nextPosition.y += userState.velY;

    userState.velX *= userState.friction;
    nextPosition.x += userState.velX;


    // map boundary
    let isWall = { x: false, y: false };

    if (nextPosition.x > mapSize[0] - myCharacter.getSize().width / 2) {
        nextPosition.x = mapSize[0] - myCharacter.getSize().width / 2;
        isWall.x = true;
    } else if (nextPosition.x <= myCharacter.getSize().width / 2) {
        nextPosition.x = myCharacter.getSize().width / 2;
        isWall.x = true;
    }

    if (nextPosition.y > mapSize[1] / 2 - myCharacter.getSize().height / 2) {
        nextPosition.y = mapSize[1] / 2 - myCharacter.getSize().height / 2;
        isWall.y = true;
    } else if (nextPosition.y <= -mapSize[1] / 2 + myCharacter.getSize().height / 2) {
        nextPosition.y = -mapSize[1] / 2 + myCharacter.getSize().height / 2;
        isWall.y = true;
    }

    // Stop moving camera in case of meeting boundary
    if (isWall.x === true && isWall.y === true) {
        paper.view.translate([0, 0]);
    } else if (isWall.x === false && isWall.y === true) {
        paper.view.translate([-userState.velX, 0]);
    } else if (isWall.x === true && isWall.y === false) {
        paper.view.translate([0, -userState.velY]);
    } else {
        paper.view.translate([-userState.velX, -userState.velY]);
    }

    mobs = mobs.filter(function (mob) {
        const isIntersects = myCharacter.starty.intersects(mob.mob1);
        if (isIntersects) {
            if (mob.size < myCharacter.size) {
                console.log("You can eat!");
                myCharacter.size += (myCharacter.size - mob.size) * 0.5;
                mob.mob1.remove();


                return;
            }
        } else {
            return mob;
        }

    });

    console.log(myCharacter.size);




    requestAnimationFrame(() => update(myCharacter, mapSize, mobs));



}



export { startyMovementHandler, update };