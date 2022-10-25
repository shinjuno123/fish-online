import { Mob1 } from "./Mob";
import paper from "paper";
import { paths } from "./MobPaths";
import { moveMobInBezierCurve, getMovementAngle } from "./MobPaths";
import controlMobSize from "./ControlMobSize";


// object's position depending on the relative position of fish
const userState = { isObstacle: false, velX: 0, velY: 0, speed: 7, friction: 0.98, keys: {} };
const limitedTime = 200;
const screenSize = { width: window.innerWidth, height: window.innerHeight };

function startyMovementHandler(event) {

    event.preventDefault();


    if (event.type === "keydown") {
        userState.keys[event.key] = true;
    }

    if (event.type === "keyup") {
        userState.keys[event.key] = false;

    }

    return;
}




function getMatrix(x1, y1, x2, y2) {
    return { tx: x1 - x2, ty: y1 - y2 };
}


function createTimer() {
    const timer = new paper.PointText([(window.screen.availWidth - window.innerWidth) / 2 + 20, (window.screen.availHeight - window.innerHeight) / 2 + 80]);
    timer.fontSize = 80;
    timer.fillColor = "white";
    timer.fontFamily = "'Dangrek', cursive";
    return timer;
}

function updateAndFixTimer(timer, time, tx, ty) {
    // Get left time
    const leftTime = limitedTime - Math.round(time / 1000);

    // Set leftTime to timer
    if (leftTime > 0) {
        timer.content = (limitedTime - Math.round(time / 1000)).toString();
    } else {
        timer.content = "0";
    }

    // Change color of timer
    if (leftTime < 60 && leftTime >= 30) {
        timer.fillColor = "orange";
    } else if (leftTime < 30) {
        timer.fillColor = "red";
    }

    // Fix timer to top left side of the screen
    timer.bounds.topLeft.x += tx;
    timer.bounds.topLeft.y += ty;

    timer.bringToFront();

    return timer;
}

function screenResized() {
    const resizedWidth = window.innerWidth - screenSize.width;
    const resizedHeight = window.innerHeight - screenSize.height;

    screenSize.width = window.innerWidth;
    screenSize.height = window.innerHeight;

    return { resizedHeight, resizedWidth }
}

function showGameOver(timer) {
    const transparentBackground = new paper.Path.Rectangle([timer.bounds.topLeft.x - 20, timer.bounds.topLeft.y - 10], [window.screen.availWidth, window.screen.availHeight + 40]);
    transparentBackground.fillColor = "black";
    transparentBackground.opacity = 0.4;

    const gameOverPhrase = new paper.PointText();
    gameOverPhrase.fontSize = 150;
    gameOverPhrase.content = "G a m e  O v e r";
    gameOverPhrase.fontWeight = "bold";
    gameOverPhrase.strokeWidth = 4;
    gameOverPhrase.strokeColor = "red"
    gameOverPhrase.fillColor = "white";
    gameOverPhrase.fontFamily = "'Dangrek', cursive";
    gameOverPhrase.bounds.center.x = timer.bounds.topLeft.x - 20 + (window.screen.availWidth / 2);
    gameOverPhrase.bounds.center.y = timer.bounds.topLeft.y - 10 + ((window.screen.availHeight + 40) / 2);

    return {loseTransparentBackground:transparentBackground,gameOverPhrase};

}


function showGameWin(timer) {
    const transparentBackground = new paper.Path.Rectangle([timer.bounds.topLeft.x - 20, timer.bounds.topLeft.y - 10], [window.screen.availWidth, window.screen.availHeight + 40]);
    transparentBackground.fillColor = "black";
    transparentBackground.opacity = 0.4;

    const gameWinPhrase = new paper.PointText();
    gameWinPhrase.fontSize = 150;
    gameWinPhrase.content = "G a m e  W i n !";
    gameWinPhrase.fontWeight = "bold";
    gameWinPhrase.strokeWidth = 4;
    gameWinPhrase.strokeColor = "yellow"
    gameWinPhrase.fillColor = "green";
    gameWinPhrase.fontFamily = "'Dangrek', cursive";
    gameWinPhrase.bounds.center.x = timer.bounds.topLeft.x - 20 + (window.screen.availWidth / 2);
    gameWinPhrase.bounds.center.y = timer.bounds.topLeft.y - 10 + ((window.screen.availHeight + 40) / 2);

    return {winTransparentBackground:transparentBackground,gameWinPhrase};
}

function isGameOver(gameOver, timer, myCharacter) {
    if (timer.content === "0") {
        const {loseTransparentBackground,gameOverPhrase} = showGameOver(timer);
        return {gameOverState:!gameOver,loseTransparentBackground,gameOverPhrase};
    }

    if (myCharacter.getSize() < 50) {
        const {loseTransparentBackground,gameOverPhrase} = showGameOver(timer);
        return {gameOverState:!gameOver,loseTransparentBackground,gameOverPhrase};
    }

    return {gameOverState:gameOver,loseTransparentBackground:undefined,gameOverPhrase:undefined};
}

function isGameWin(gameWin, timer, myCharacter) {
    if (myCharacter.getSize() >= 300 && timer.content !== "0") {
        const {winTransparentBackground,gameWinPhrase} = showGameWin(timer);
        return {gameWinState:!gameWin,winTransparentBackground,gameWinPhrase};
    }
    return {gameWinState:gameWin,winTransparentBackground:undefined,gameWinPhrase:undefined};
}



async function gameStart(mode, video, myCharacter, mapSize, mobs, obstacles, attackers, hiders) {


    let gameOver = false;
    let gameWin = false;
    let hideTime = 0;
    let prevTime = -10001;
    const worker = new Worker(process.env.PUBLIC_URL + '/worker.js');
    const tmpCanvas = document.createElement("canvas");
    const imageSize = { width: 320, height: 240 };
    let receievedKeyPoints;
    let isExecuted = false;
    let firstPosition = 0;
    let movement = "";
    const screen1 = new paper.PointText();
    const state = { left: false, right: false };
    let countWalk = 0;
    let isReverse = false;
    const { motionFrame, down, straight, up, leftReverse, rightReverse } = (mode === "exercise") ? createMotionFrame() : { motionFrame: null, down: null, straight: null, up: null, leftReverse: null, rightReverse: null };
    const { leftKnee, rightKnee } = (mode === "exercise") ? createMotion() : { leftKnee: null, rightKnee: null };
    let timer = createTimer();

    /*  Test Making path using Bezier curve*/
    // paths.forEach(function (path, index) {
    //     drawPath(path, index);
    // });


    window.requestAnimationFrame((time) => {
        update(time, mobs);
    });


    async function videoUpdate(isExecuted) {
        const ctx = tmpCanvas.getContext('2d');
        ctx.drawImage(video.current, 0, 0);
        const contents = {
            image: ctx.getImageData(0, 0, imageSize.width, imageSize.height),
            isExecuted: isExecuted,
        };


        worker.postMessage(contents);

    }

    function createMotionFrame() {
        const motionFrame = new paper.Path.Rectangle(paper.view.bounds.width - imageSize.width, paper.view.bounds.height - imageSize.height, imageSize.width, imageSize.height);
        motionFrame.fillColor = "white";
        const size = [120, 80];


        const down = new paper.Path.Rectangle([motionFrame.bounds.x, motionFrame.bounds.y + 35], size);
        down.fillColor = "red";

        const straight = new paper.Path.Rectangle([motionFrame.bounds.x + motionFrame.bounds.width / 3 + 10, motionFrame.bounds.y + 35], [size[0] - 20, size[1]]);
        straight.fillColor = "green";

        const up = new paper.Path.Rectangle([motionFrame.bounds.x + motionFrame.bounds.width * (2 / 3), motionFrame.bounds.y + 35], size);
        up.fillColor = "blue";

        const leftReverse = new paper.Path.Rectangle([motionFrame.bounds.x, motionFrame.bounds.y], [30, 240]);
        leftReverse.fillColor = "yellow";

        const rightReverse = new paper.Path.Rectangle([motionFrame.bounds.x + motionFrame.bounds.width - 30, motionFrame.bounds.y], [30, 240]);
        rightReverse.fillColor = "pink";



        return { motionFrame: motionFrame, down: down, straight: straight, up: up, leftReverse: leftReverse, rightReverse: rightReverse };
    }


    function createMotion() {

        const leftKnee = paper.Path.Circle([motionFrame.bounds.centerX, motionFrame.bounds.centerY], 3);
        leftKnee.selected = true;


        const rightKnee = paper.Path.Circle([motionFrame.bounds.centerX, motionFrame.bounds.centerY], 3);
        rightKnee.selected = true;



        return {
            leftKnee: leftKnee, rightKnee: rightKnee
        };
    }



    // for walk recognition by movenet
    worker.onmessage = (event) => {
        receievedKeyPoints = event.data;
        if (receievedKeyPoints) {

            leftKnee.bounds.centerX = motionFrame.bounds.x + (imageSize.width - receievedKeyPoints.keypoints[13].x);
            leftKnee.bounds.centerY = motionFrame.bounds.y + receievedKeyPoints.keypoints[13].y + 20;

            rightKnee.bounds.centerX = motionFrame.bounds.x + (imageSize.width - receievedKeyPoints.keypoints[14].x);
            rightKnee.bounds.centerY = motionFrame.bounds.y + receievedKeyPoints.keypoints[14].y + 20;


            if (firstPosition === 0) {
                firstPosition = leftKnee.bounds.centerY;
            }

            if (up.intersects(leftKnee) || up.contains(leftKnee) || up.isInside(leftKnee)) {
                movement = "up";
                state.left = true;
            }
            if (straight.intersects(leftKnee) || straight.contains(leftKnee) || straight.isInside(leftKnee)) {
                movement = "straight";
                state.left = true;
            }
            if (down.intersects(leftKnee) || down.contains(leftKnee) || down.isInside(leftKnee)) {
                movement = "down";
                state.left = true;
            }

            if (up.intersects(rightKnee) || up.contains(rightKnee) || up.isInside(rightKnee)) {
                state.right = true;
            }
            if (straight.intersects(rightKnee) || straight.contains(rightKnee) || straight.isInside(rightKnee)) {
                state.right = true;
            }
            if (down.intersects(rightKnee) || down.contains(rightKnee) || down.isInside(rightKnee)) {
                state.right = true;
            }


            if (leftReverse.intersects(leftKnee) || leftReverse.contains(leftKnee) || leftReverse.isInside(leftKnee)) {
                myCharacter.setReverse(false);
                isReverse = false;
            }

            if (rightReverse.intersects(rightKnee) || rightReverse.contains(rightKnee) || rightKnee.isInside(rightKnee)) {
                myCharacter.setReverse(true);
                isReverse = true;
            }

            if (state.left && state.right) {
                countWalk += 0.5;
                state.left = false;
                state.right = false;
                if (countWalk === 1) {
                    countWalk = 0;
                    // move the fish! keyboard == true
                    if (movement === "up") {
                        if (isReverse) {
                            userState.keys["ArrowUp"] = true;
                            userState.keys["ArrowRight"] = true;
                        } else {
                            userState.keys["ArrowUp"] = true;
                            userState.keys["ArrowLeft"] = true;
                        }

                    } else if (movement === "straight") {
                        if (isReverse) {
                            userState.keys["ArrowRight"] = true;
                        } else {
                            userState.keys["ArrowLeft"] = true;
                        }

                    } else if (movement === "down") {
                        if (isReverse) {
                            userState.keys["ArrowDown"] = true;
                            userState.keys["ArrowRight"] = true;
                        } else {
                            userState.keys["ArrowDown"] = true;
                            userState.keys["ArrowLeft"] = true;
                        }
                    }
                }
            }


            screen1.content = `saying : ${movement} state : ${state.left} ${state.right} walk ${countWalk}`;
            screen1.fontSize = 40;
            screen1.bounds.center = [mapSize[0] / 4, mapSize[1] / 4];


        }
    };

    function updateTimerAndPhrasePosition(tx, ty,transparentBackground,phrase) {
        const { resizedWidth, resizedHeight } = screenResized();
        timer.bounds.topLeft.x += -resizedWidth / 2;
        timer.bounds.topLeft.y += -resizedHeight / 2;

        transparentBackground.bounds.topLeft.x = timer.bounds.topLeft.x - 20;
        transparentBackground.bounds.topLeft.y = timer.bounds.topLeft.y - 10;

        phrase.bounds.center.x = timer.bounds.topLeft.x - 20 + (window.innerWidth / 2);
        phrase.bounds.center.y = timer.bounds.topLeft.y - 10 + ((window.innerHeight + 40) / 2);

        window.requestAnimationFrame(()=>updateTimerAndPhrasePosition(tx,ty,transparentBackground,phrase));
    }


    async function update(time, mobs) {
        // move screen when user fish gets a border of virtual Rectangle
        const { tx, ty } = getMatrix(myCharacter.group.bounds.center.x, myCharacter.group.bounds.center.y, myCharacter.rx, myCharacter.ry);
        myCharacter.rx = myCharacter.group.bounds.center.x;
        myCharacter.ry = myCharacter.group.bounds.center.y;
        paper.view.translate([-tx, -ty]);

        timer = updateAndFixTimer(timer, time, tx, ty);
        const { resizedWidth, resizedHeight } = screenResized();
        timer.bounds.topLeft.x += -resizedWidth / 2;
        timer.bounds.topLeft.y += -resizedHeight / 2;

        const {gameOverState,loseTransparentBackground,gameOverPhrase} = isGameOver(gameOver, timer, myCharacter);
        gameOver = gameOverState;
        const {gameWinState,winTransparentBackground,gameWinPhrase} = isGameWin(gameWin, timer, myCharacter);
        gameWin = gameWinState;



        if (gameOver) {
            window.requestAnimationFrame(()=>updateTimerAndPhrasePosition(tx,ty,loseTransparentBackground,gameOverPhrase));
        }
        if(gameWin){
            window.requestAnimationFrame(()=>updateTimerAndPhrasePosition(tx,ty,winTransparentBackground,gameWinPhrase));
        }

        // Control mob size as time goes
        // console.log(time);
        const { minMobSize, maxMobSize } = controlMobSize(time / 1000);

        // Create mobs every 5 sec and the limitation of number of mobs is 50
        if (prevTime + 500 < time && mobs.length < 60) {
            prevTime = time;
            console.log("created", mobs.length);
            const randomPlace = Math.floor(Math.random() * 12);
            const randomSize = Math.floor(Math.random() * (maxMobSize - minMobSize)) + minMobSize;
            const mob = new Mob1({ x: paths[randomPlace][0][0].x, y: paths[randomPlace][0][0].y }, true, randomSize);
            mob.selectedPath = randomPlace;
            mobs.push(mob);
        }


        if (mobs.length === 50) {
            mobs = mobs.filter(function (mob, index) {
                if (index < 15) {
                    mob.group.remove();
                    mob.removeSizeTag();
                    return;
                }

                return mob;
            });
        }


        // Move mob fishes following the path made by bezier curves
        mobs = mobs.map(function (mob) {
            const prevMobPosition = { x: mob.group.bounds.centerX, y: mob.group.bounds.centerY, speed: 0.003, t: mob.t };
            const prevX = prevMobPosition.x;
            const prevY = prevMobPosition.y;
            const mobMovedPosition = moveMobInBezierCurve(paths[mob.selectedPath][mob.currentPoint], prevMobPosition);
            mob.t = mobMovedPosition.t;
            mob.group.bounds.centerX = mobMovedPosition.x;
            mob.group.bounds.centerY = mobMovedPosition.y;

            // Get movement angle of mob fish and turn the mob's head toward the angle
            const mobMovementAngle = getMovementAngle(prevX, prevY, mobMovedPosition.x, mobMovedPosition.y);
            if ((mobMovementAngle <= 90 && mobMovementAngle >= 0) || (mobMovementAngle >= -90 && mobMovementAngle <= 0)) {
                mob.setReverse(true);
            } else if ((mobMovementAngle > 90 && mobMovementAngle) <= 180 || (mobMovementAngle < -90 && mobMovementAngle >= -180)) {
                mob.setReverse(false);
            }

            if (mob.t > 1) {
                mob.t = 0;
                mob.currentPoint = paths[mob.selectedPath].length - 1 !== mob.currentPoint ? mob.currentPoint + 1 : 0;
            }



            return mob;
        });



        // when control is by motion recognition
        // send video image to worker
        if (mode === "exercise") {
            await videoUpdate(isExecuted);
            isExecuted = true;
        }




        // Recognize key board input
        if (userState.keys["ArrowUp"] || userState.keys["w"]) {
            if (userState.velY > -userState.speed) {
                userState.velY--;
            }
        }
        if (userState.keys["ArrowDown"] || userState.keys["s"]) {
            if (userState.velY < userState.speed) {
                userState.velY++;
            }
        }
        if (userState.keys["ArrowRight"] || userState.keys["d"]) {
            myCharacter.setReverse(true);
            if (userState.velX < userState.speed) {
                userState.velX++;
            }
        }
        if (userState.keys["ArrowLeft"] || userState.keys["a"]) {
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
        // detect where the user fish bumped into the obstacles
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

        // If x or y has been changed by bumping into objects
        // then makes the user's velocity to zero
        if (isXChanged) {
            userState.velX = 0;
        }
        if (isYChanged) {
            userState.velY = 0;
        }







        /* Motion Recognition Section */
        if (mode === "exercise") {
            // Fix motion frame position to right bottom
            motionFrame.bounds.x = 1600 - paper.view.matrix.tx;
            motionFrame.bounds.y = 840 - paper.view.matrix.ty;
            down.bounds.x = motionFrame.bounds.x;
            down.bounds.y = motionFrame.bounds.y + 35;
            straight.bounds.x = motionFrame.bounds.x + motionFrame.bounds.width / 3 + 10;
            straight.bounds.y = motionFrame.bounds.y + 35;
            up.bounds.x = motionFrame.bounds.x + motionFrame.bounds.width * (2 / 3);
            up.bounds.y = motionFrame.bounds.y + 35;
            leftReverse.bounds.x = motionFrame.bounds.x;
            leftReverse.bounds.y = motionFrame.bounds.y;
            rightReverse.bounds.x = motionFrame.bounds.x + motionFrame.bounds.width - 30;
            rightReverse.bounds.y = motionFrame.bounds.y;
        }







        // If mob is bigger than user's then game over
        // If not user's can eat mob and grow bigger
        mobs = mobs.filter(function (mob) {
            const isIntersects = myCharacter.group.intersects(mob.group);
            if (isIntersects) {
                if (mob.size <= myCharacter.size) {
                    console.log("You can eat!", myCharacter.size, mob.size);
                    if (myCharacter.size <= 70) {
                        myCharacter.setSize(myCharacter.size + mob.size * 0.05);
                    } else if (70 < myCharacter.size && myCharacter.size <= 130) {
                        myCharacter.setSize(myCharacter.size + mob.size * 0.04);
                    } else if (130 < myCharacter.size && myCharacter.size <= 180) {
                        myCharacter.setSize(myCharacter.size + mob.size * 0.03);
                    } else if (180 < myCharacter.size && myCharacter.size <= 250) {
                        myCharacter.setSize(myCharacter.size + mob.size * 0.005);
                    } else if (250 < myCharacter.size) {
                        myCharacter.setSize(myCharacter.size + mob.size * 0.002);
                    }
                    mob.group.remove();
                    mob.removeSizeTag();
                    return;
                } else {
                    mob.size += myCharacter.size * 0.05;
                    myCharacter.group.remove();
                    myCharacter.removeSizeTag();
                    gameOver = true;
                    showGameOver(timer);
                    return mob;
                }
            } else {
                return mob;
            }

        });


        // when meeding hiders, for example seaweed where can hide fishes including your fish
        // make mob or user can hide into seaweed
        hiders = hiders.map(function (hider) {
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

        // if user fish hidden duration has just passed
        // then user fish should be visible
        // else user fish sohould be invisible
        if (hideTime < time) {
            myCharacter.group.visible = true;
        } else {
            myCharacter.group.visible = false;
        }


        // if mob fish's hidden duration has just passed
        // then mob fish should be visible
        // else user fish should be invisible
        mobs = mobs.map(function (mob) {
            if (mob.hideTime < time) {
                mob.group.visible = true;
                mob.sizeTag.visible = true;
            } else {
                mob.group.visible = false;
                mob.sizeTag.visible = false;
            }

            return mob;
        });


        // when user fish meets attacters like sea anemone, their size is decreased
        // then make user fish smaller and bounced away from sea anemone
        attackers.map(function (attacker) {
            if (attacker.group.contains(myCharacter.group.bounds) || attacker.group.intersects(myCharacter.group.bounds)) {
                myCharacter.setSize(myCharacter.size - 1);
                userState.velX = userState.velX < userState.speed ? -userState.velX * 1.1 : -userState.velX * 0.9;
                userState.velY = userState.velY < userState.speed ? -userState.velY * 1.1 : -userState.velY * 0.9;
            }
        });

        // Stop movement by motion recognition
        if (mode === "exercise") {
            userState.keys["ArrowDown"] = false;
            userState.keys["ArrowUp"] = false;
            userState.keys["ArrowLeft"] = false;
            userState.keys["ArrowRight"] = false;
        }


        // Move sizetag to fishes position
        // user
        myCharacter.moveSizeTag();
        // mob
        mobs = mobs.map(function (mob) {
            mob.moveSizeTag();
            return mob;
        });


        // Check if it is game over or not
        // if game over is true then stop game and lose game
        if (gameOver) {
            window.cancelAnimationFrame((time) => { update(time, mobs); });
        } else if (gameWin) {
            window.cancelAnimationFrame((time) => { update(time, mobs); });
        } else {
            window.requestAnimationFrame((time) => { update(time, mobs); });
        }


    }
}









export { startyMovementHandler, gameStart };