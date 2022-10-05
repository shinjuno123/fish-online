import paper from "paper";
import { Mob1 } from "./Mob";


// import * as tf from '@tensorflow/tfjs-core';
// // Register one of the TF.js backends.
// import '@tensorflow/tfjs-backend-webgl';
// // import '@tensorflow/tfjs-backend-wasm';

// simulate key board
// document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

// object's position depending on the relative position of fish
const userState = { isObstacle: false, velX: 0, velY: 0, speed: 5, friction: 0.98, keys: {} };



function startyMovementHandler (event) {


    event.preventDefault();

    if (event.type === "keydown") {
        userState.keys[event.key] = true;
    }

    if (event.type === "keyup") {
        userState.keys[event.key] = false;
    }
}

async function gameStart (video, myCharacter, mapSize, mobs, obstacles, responsePoints, attackers, hiders) {


    let isGameOver = false;
    let hideTime = 0;
    let prevTime = -10001;
    const worker = new Worker('worker.js');
    const tmpCanvas = document.createElement("canvas");
    let receievedKeyPoints;
    tmpCanvas.width = 320;
    tmpCanvas.height = 240;



    window.requestAnimationFrame((time) => {
        update(time, mobs);
    });

    async function videoUpdate () {
        const ctx = tmpCanvas.getContext('2d');
        ctx.drawImage(video.current, 0, 0);
        const contents = {
            image: ctx.getImageData(0, 0, 320, 240),
        };


        worker.postMessage(contents);

    }

    // mobs
    function update (time, mobs) {


        if (prevTime + 10000 < time) {
            prevTime = time;
            console.log("created", mobs.length);

            const mobsPoints = responsePoints.mobsResponsePoints;
            const randomPlace = Math.floor(Math.random() * mobsPoints.length);
            const mob = new Mob1({ x: mobsPoints[randomPlace][0], y: mobsPoints[randomPlace][1] }, true, 70);
            mobs.push(mob);
        }


        videoUpdate();

        worker.onmessage = (event)=>{
            receievedKeyPoints = event.data[0]
        }

        console.log(receievedKeyPoints);


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



        // when contacting to obstacles, user's fish stops moving toward obstacles
        obstacles = obstacles.map(function (obstacle) {
            for (let pathItem of myCharacter.group.getItems()) {
                const point = obstacle.group.getItem().getIntersections(pathItem)[0];
                if (point) {
                    if (point.point.x - nextPosition.x > 0) {
                        nextPosition.x = nextPosition.x - 2;
                        userState.velX -= 2;
                        isXChanged = true;
                    }
                    if (point.point.x - nextPosition.x < 0) {
                        nextPosition.x = nextPosition.x + 2;
                        userState.velX += 2;
                        isXChanged = true;
                    }

                    if (point.point.y - nextPosition.y > 0) {
                        nextPosition.y = nextPosition.y - 2;
                        userState.velY -= 2;
                        isYChanged = true;
                    }

                    if (point.point.y - nextPosition.y < 0) {
                        nextPosition.y = nextPosition.y + 2;
                        userState.velY += 2;
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
                    if (myCharacter.size <= 70) {
                        myCharacter.size += mob.size * 0.05;
                    } else if (70 < myCharacter.size && myCharacter.size <= 100) {
                        myCharacter.size += mob.size * 0.03;
                    } else if (100 < myCharacter.size && myCharacter.size <= 130) {
                        myCharacter.size += mob.size * 0.02;
                    } else if (130 < myCharacter.size && myCharacter.size <= 170) {
                        myCharacter.size += mob.size * 0.015;
                    } else if (170 < myCharacter.size && myCharacter.size) {
                        myCharacter.size += mob.size * 0.005;
                    }
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


        // when meeding hiders, for example seaweed where can hide fishes including your fish
        hiders = hiders.map(function (hider) {
            // console.log(myCharacter.group);
            if (hider.group.bounds.contains(myCharacter.group.bounds)) {
                hideTime = time + 0.001;
            }

            for (let mob of mobs) {
                if (hider.group.bounds.contains(mob.group.bounds)) {
                    mob.hideTime = time + 0.001;
                }
            }

            return hider;
        });

        // if user fish just hid
        if (hideTime < time) {
            myCharacter.group.visible = true;
        } else {
            myCharacter.group.visible = false;
        }


        // if mob fish just hid
        mobs = mobs.map(function (mob) {
            if (mob.hideTime < time) {
                mob.group.visible = true;
            } else {
                mob.group.visible = false;
            }

            return mob;
        });


        // when user fish meets attacters like sea anemone, their size is decreased
        attackers.map(function (attacker) {
            if (attacker.group.contains(myCharacter.group.bounds) || attacker.group.intersects(myCharacter.group.bounds)) {
                myCharacter.size -= 0.1;
                userState.velX = userState.velX < userState.speed ? -userState.velX * 1.1 : -userState.velX * 0.9;
                userState.velY = userState.velY < userState.speed ? -userState.velY * 1.1 : -userState.velY * 0.9;
            }
        });


        // Check if it is game over or not
        if (isGameOver) {
            window.cancelAnimationFrame((time) => { update(time, mobs); });
        } else {
            window.requestAnimationFrame((time) => { update(time, mobs); });
        }


    }
}









export { startyMovementHandler, gameStart };