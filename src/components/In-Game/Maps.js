import paper from "paper";

function defaultMap () {
    // map Size setup
    const mapSize = [window.screen.availWidth * 2, window.screen.availHeight * 2];

    // Map camera movement
    const screen1 = new paper.PointText();
    screen1.content = "1";
    screen1.fontSize = 60;
    screen1.bounds.center = [window.screen.availWidth / 2, window.screen.availHeight / 2];

    const screen2 = new paper.PointText();
    screen2.content = "2";
    screen2.fontSize = 60;
    screen2.bounds.center = [window.screen.availWidth / 2, -window.screen.availHeight / 2];


    const screen3 = new paper.PointText();
    screen3.content = "3";
    screen3.fontSize = 60;
    screen3.bounds.center = [window.screen.availWidth * 1.5, -window.screen.availHeight / 2];


    const screen4 = new paper.PointText();
    screen4.content = "4";
    screen4.fontSize = 60;
    screen4.bounds.center = [window.screen.availWidth * 1.5, window.screen.availHeight / 2];

    return mapSize;
}





export default defaultMap;