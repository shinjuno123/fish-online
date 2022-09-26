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


function update (myCharacter, mapSize, starty2) {
    requestAnimationFrame(() => update(myCharacter, mapSize, starty2));

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
        paper.view.scrollBy([0, 0]);
    } else if (isWall.x === false && isWall.y === true) {
        paper.view.scrollBy([userState.velX, 0]);
    } else if (isWall.x === true && isWall.y === false) {
        paper.view.scrollBy([0, userState.velY]);
    } else {
        paper.view.scrollBy([userState.velX, userState.velY]);
    }

    console.log(myCharacter.starty.intersects(starty2.starty));





}



export { startyMovementHandler, update };