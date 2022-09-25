const userState = {velX : 0,velY : 0,speed:2,friction :0.98, keys : {}}

function startyMovementHandler (event) {


    event.preventDefault();



    if (event.type === "keydown"){
        userState.keys[event.key] = true;
    }

    if (event.type === "keyup"){
        userState.keys[event.key] = false;
    }



}


function update(myCharacter){
    requestAnimationFrame(()=>update(myCharacter));

    if(userState.keys["ArrowUp"]){
        if(userState.velY > -userState.speed){
            userState.velY--;
        }
    }
    if (userState.keys["ArrowDown"]){
        if(userState.velY < userState.speed){
            userState.velY++;
        }
    }
    if (userState.keys["ArrowRight"]){
        myCharacter.setReverse(true);
        if(userState.velX < userState.speed){
            userState.velX++
        }
    }
    if (userState.keys["ArrowLeft"]){
        myCharacter.setReverse(false);
        if(userState.velX > -userState.speed){
            userState.velX--
        }
    }
    const nextPosition = myCharacter.getPosition();

    userState.velY *= userState.friction;
    nextPosition.y += userState.velY;

    userState.velX *= userState.friction;
    nextPosition.x += userState.velX;


    myCharacter.setPosition(nextPosition)





}



export { startyMovementHandler,update };