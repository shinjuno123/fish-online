import { Starty } from "./Characters";


function startyMovementHandler (event, starty) {
    // console.log(event.key);
    event.preventDefault();

    console.log(starty);
    if (event.key === "ArrowUp") {
        starty.starty.position.y -= 5;
    } else if (event.key === "ArrowDown") {
        starty.starty.position.y += 5;
    } else if (event.key === "ArrowLeft") {

        starty.setReverse(false);
        starty.starty.position.x -= 5;
    } else if (event.key === "ArrowRight") {
        starty.setReverse(true);
        starty.starty.position.x += 5;
    }
}



export { startyMovementHandler };