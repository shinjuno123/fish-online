import paper from "paper";

const userState = { velX: 0, velY: 0, speed: 4, friction: 0.98, keys: {} };


let isGameOver = false;

function startyMovementHandler (event) {


    event.preventDefault();

    console.log(event.key);
    if (event.type === "keydown") {
        userState.keys[event.key] = true;
    }

    if (event.type === "keyup") {
        userState.keys[event.key] = false;
    }



}


function update (myCharacter, mapSize, mobs) {
    // simulate key board
    // document.body.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowUp'}));
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
        const isIntersects = myCharacter.group.intersects(mob.group);
        if (isIntersects) {
            if (mob.size <= myCharacter.size) {
                console.log("You can eat!");
                myCharacter.size += mob.size * 0.01;
                mob.group.remove();
                return;
            } else {
                mob.size += myCharacter.size * 0.01;
                myCharacter.group.remove();
                isGameOver = true;
                return mob;
            }
        } else {
            return mob;
        }

    });

    const keyBoardEvent = document.createEvent('KeyboardEvent');
    const initMethod = typeof KeyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

    // keyBoardEvent[initMethod](
    //     'keydown', // event type: keydown, keyup, keypress
    //     true, // bubbles
    //     true, // cancelable
    //     window, // view: should be window
    //     false, // ctrlKey
    //     false, // altKey
    //     false, // shiftKey
    //     false, // metaKey
    //     40, // keyCode: unsigned long - the virtual key code, else 0
    //     0, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
    // )

    

    window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowUp'}));
    window.dispatchEvent(new KeyboardEvent('keyup',{key:'ArrowUp'}));


    if (isGameOver) {
        cancelAnimationFrame(handleEvent);
    } else {
        requestAnimationFrame(handleEvent);
    }


    function handleEvent () {
        return update(myCharacter, mapSize, mobs);
    }

}




export { startyMovementHandler, update };