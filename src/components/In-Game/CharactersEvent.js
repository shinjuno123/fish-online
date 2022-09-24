
let speed = {
    up: 1,
    down: 1,
    right: 1,
    left: 1
};

function startyMovementHandler (event, starty) {


    event.preventDefault();


    if (event.key === "ArrowUp") {
        moveUp(event.type);
    } else if (event.key === "ArrowDown") {
        moveDown(event.type);
    } else if (event.key === "ArrowLeft") {
        moveLeft(event.type);
    } else if (event.key === "ArrowRight") {
        moveRight(event.type);
    }





    // full screen mode
    if (event.key === "F11") {
        document.querySelector("html").requestFullscreen();
    }

    function moveUp (type) {
        if (type === "keydown") {
            starty.starty.position.y -= speed.up;
        }


    }

    function moveDown (type) {
        if (type === "keydown") {
            starty.starty.position.y += speed.down;
        }
    }

    function moveLeft (type) {
        if (type === "keydown") {
            starty.setReverse(false);
            starty.starty.position.x -= speed.left;
        }
    }


    // const decreaseSpeed = new Promise(function (resolve) {
    //     resolve(setTimeout(function ()){

    //     });
    // });


    async function moveRight (type) {
        console.log();
        if (type === "keydown") {
            starty.setReverse(true);
            starty.starty.position.x += speed.right;
            speed.right += 0.1;
            console.log(speed.right);
        }
        // else if (type === "keyup") {
        //     while (speed.right > 0) {
        //         await setTimeout(function () {
        //             starty.starty.position.x += speed.right;
        //             speed.right -= 0.1;
        //         }, 5);
        //         console.log(speed.right);
        //     }

        // }

    }


}



export { startyMovementHandler };