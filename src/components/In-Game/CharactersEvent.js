import paper from "paper";
import { Mob1 } from "./Mob";
// object's position depending on the relative position of fish

const userState = { isObstacle: false, velX: 0, velY: 0, speed: 4, friction: 0.98, keys: {} };


let isGameOver = false;
let time = 0;

function startyMovementHandler (event) {


    event.preventDefault();

    if (event.type === "keydown") {
        userState.keys[event.key] = true;
    }

    if (event.type === "keyup") {
        userState.keys[event.key] = false;
    }
}

function update (myCharacter, mapSize, mobs, obstacles, responsePoints) {
    // simulate key board
    // document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));


    if (time % 1200 === 0) {
        const mobsPoints = responsePoints.mobsResponsePoints;
        const randomPlace = Math.floor(Math.random() * mobsPoints.length);
        const mob = new Mob1({ x: mobsPoints[randomPlace][0], y: mobsPoints[randomPlace][1] }, true, 70);
        mobs.push(mob);
        time = 1;
    }



    time += 1;

    // Recognize key board input
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


    // move as pressing keyboard arrow buttons
    userState.velY *= userState.friction;
    nextPosition.y += userState.velY;

    userState.velX *= userState.friction;
    nextPosition.x += userState.velX;



    let isXChanged = false;
    let isYChanged = false;


    // when contacting to obstacles, user's stops moving toward obstacles
    obstacles = obstacles.map(function (obstacle) {
        for (let pathItem of myCharacter.group.getItems()) {
            const point = obstacle.group.getItem().getIntersections(pathItem)[0];
            if (point) {
                if (point.point.x - nextPosition.x > 0) {
                    nextPosition.x = nextPosition.x - 1;
                    userState.velX -= 1;
                    isXChanged = true;
                }
                if (point.point.x - nextPosition.x < 0) {
                    nextPosition.x = nextPosition.x + 1;
                    userState.velX += 1;
                    isXChanged = true;
                }

                if (point.point.y - nextPosition.y > 0) {
                    nextPosition.y = nextPosition.y - 1;
                    userState.velY -= 1;
                    isYChanged = true;
                }

                if (point.point.y - nextPosition.y < 0) {
                    nextPosition.y = nextPosition.y + 1;
                    userState.velY += 1;
                    isYChanged = true;
                }
            }

        }
        return obstacle;

    });






    // Recognize map boundary and check if it is wall 
    const isWall = { x: false, y: false };

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

    if (isXChanged) {
        userState.velX = 0;
    }
    if (isYChanged) {
        userState.velY = 0;
    }



    // If mob is bigger than user's then game over
    // If not user's can eat mob and grow bigger
    mobs = mobs.filter(function (mob) {
        const isIntersects = myCharacter.group.intersects(mob.group);
        if (isIntersects) {
            if (mob.size <= myCharacter.size) {
                console.log("You can eat!");
                myCharacter.size += mob.size * 0.05;
                mob.group.remove();
                return;
            } else {
                mob.size += myCharacter.size * 0.05;
                myCharacter.group.remove();
                isGameOver = true;
                return mob;
            }
        } else {
            return mob;
        }

    });





    // Check if it is game over or not
    if (isGameOver) {
        cancelAnimationFrame(handleEvent);
    } else {
        requestAnimationFrame(handleEvent);
    }



    // Event Handler to use in requestAnimationFrame
    function handleEvent () {
        return update(myCharacter, mapSize, mobs, obstacles, responsePoints);
    }

}




export { startyMovementHandler, update };