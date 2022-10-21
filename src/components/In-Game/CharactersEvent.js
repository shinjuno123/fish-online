import { Mob1 } from "./Mob";
import paper from "paper";
import { paths } from "./MobPaths";
import { moveMobInBezierCurve, getMovementAngle, drawPath } from "./MobPaths";
import controlMobSize from "./ControlMobSize";


// object's position depending on the relative position of fish
const userState = { isObstacle: false, velX: 0, velY: 0, speed: 7, friction: 0.98, keys: {} };


function startyMovementHandler (event) {

    event.preventDefault();


    if (event.type === "keydown") {
        userState.keys[event.key] = true;
    }

    if (event.type === "keyup") {
        userState.keys[event.key] = false;

    }

    return;
}


function getMatrix (x1, y1, x2, y2) {
    return { tx: x1 - x2, ty: y1 - y2 };
}



async function gameStart (mode, video, myCharacter, mapSize, mobs, obstacles, attackers, hiders) {


    let isGameOver = false;
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


    /*  Test Making path using Bezier curve*/
    // paths.forEach(function (path, index) {
    //     drawPath(path, index);
    // });


    window.requestAnimationFrame((time) => {
        update(time, mobs);
    });


    async function videoUpdate (isExecuted) {
        const ctx = tmpCanvas.getContext('2d');
        ctx.drawImage(video.current, 0, 0);
        const contents = {
            image: ctx.getImageData(0, 0, imageSize.width, imageSize.height),
            isExecuted: isExecuted,
        };


        worker.postMessage(contents);

    }

    function createMotionFrame () {
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


    function createMotion () {

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


            screen1.content = `saying : ${ movement } state : ${ state.left } ${ state.right } walk ${ countWalk }`;
            screen1.fontSize = 40;
            screen1.bounds.center = [mapSize[0] / 4, mapSize[1] / 4];


        }
    };


    async function update (time, mobs) {

        // Control mob size as time goes
        // console.log(time);
        const { minMobSize, maxMobSize } = controlMobSize(time / 1000);

        // Create mobs every 5 sec and the limitation of number of mobs is 50
        if (prevTime + 1000 < time && mobs.length < 60) {
            prevTime = time;
            console.log("created", mobs.length);
            const randomPlace = Math.floor(Math.random() * 12);
            const randomSize = Math.floor(Math.random() * (maxMobSize - minMobSize)) + minMobSize;
            // console.log(randomSize);
            const mob = new Mob1({ x: paths[randomPlace][0][0].x, y: paths[randomPlace][0][0].y }, true, randomSize);
            mob.selectedPath = randomPlace;
            mobs.push(mob);
        }
        if (mobs.length % 5 === 0) {
            mobs = mobs.map(function (mob, index) {
                if (index < 1) {
                    console.log(mob.group);
                    // mob.group.remove();
                    return;
                }

                return mob;
            });
        }


        // Move mob fishes following the path made by bezier curves
        mobs = mobs.map(function (mob) {
            const prevMobPosition = { x: mob.group.bounds.centerX, y: mob.group.bounds.centerY, speed: 0.01, t: mob.t };
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




        // move screen when user fish gets a border of virtual Rectangle
        const { tx, ty } = getMatrix(myCharacter.group.bounds.center.x, myCharacter.group.bounds.center.y, myCharacter.rx, myCharacter.ry);
        myCharacter.rx = myCharacter.group.bounds.center.x;
        myCharacter.ry = myCharacter.group.bounds.center.y;
        paper.view.translate([-tx, -ty]);



        /* Motion Recognitio Section */
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
            } else {
                mob.group.visible = false;
            }

            return mob;
        });


        // when user fish meets attacters like sea anemone, their size is decreased
        // then make user fish smaller and bounced away from sea anemone
        attackers.map(function (attacker) {
            if (attacker.group.contains(myCharacter.group.bounds) || attacker.group.intersects(myCharacter.group.bounds)) {
                myCharacter.size -= 0.1;
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


        // Check if it is game over or not
        // if game over is true then stop game and lose game
        if (isGameOver) {
            window.cancelAnimationFrame((time) => { update(time, mobs); });
        } else {
            window.requestAnimationFrame((time) => { update(time, mobs); });
        }


    }
}









export { startyMovementHandler, gameStart };