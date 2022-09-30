import paper from "paper";
import Stone, { SideStone } from "./objects/rock";
import SeaAnemone from "./objects/SeaAnemone";

function testMap () {
    // map Size setup
    const mapSize = [window.screen.availWidth * 2, window.screen.availHeight * 2];

    const obstacles = [];

    const rect = new paper.Path.Rectangle([0, -mapSize[1] / 2], [mapSize[0], mapSize[1]]);

    rect.strokeColor = "black";
    rect.strokeWidth = "3";

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


    // setup center Stone
    obstacles.push(new Stone(window.screen.availWidth, 0, 2.5));


    // setup Stones at the 4 egdes of map
    obstacles.push(new SideStone(window.screen.availWidth / 2, window.screen.availHeight / 2, 0, false));
    obstacles.push(new SideStone(window.screen.availWidth * 1.5, window.screen.availHeight / 2, 0, true));
    obstacles.push(new SideStone(window.screen.availWidth / 2, -window.screen.availHeight / 2, 180, true));
    obstacles.push(new SideStone(window.screen.availWidth * 1.5, -window.screen.availHeight / 2, 180, false));


    // Response place setup
    const userResponsePoints = [93.75, 63.3];
    const mobsResponsePoints = [[100, 0], [window.screen.availWidth * 2 - 100, 0], [window.screen.availWidth, window.screen.availHeight - 100], [window.screen.availWidth, -window.screen.availHeight + 100]];

    const responsePoints = { userResponsePoints: userResponsePoints, mobsResponsePoints: mobsResponsePoints };


    const seaAnemone1 = new SeaAnemone(500, 610, 1.5, 0);
    const seaAnemone2 = new SeaAnemone(300, 550, 1, 0);
    const seaAnemone3 = new SeaAnemone(990, 760, 1, 40);
    const seaAnemone4 = new SeaAnemone(990, 230, 1, 180);
    const seaAnemone5 = new SeaAnemone(550, 20, 0.8, 200);
    const seaAnemone6 = new SeaAnemone(2200, 190, 0.8, 160);
    const seaAnemone7 = new SeaAnemone(3030, 190, 1.2, 280);
    const seaAnemone8 = new SeaAnemone(2550, 600, 2, 10);
    const seaAnemone9 = new SeaAnemone(2350, -150, 2, 30);
    const seaAnemone10 = new SeaAnemone(2350, -640, 2, 210);
    const seaAnemone11 = new SeaAnemone(900, -700, 1.1, 140);
    const seaAnemone12 = new SeaAnemone(900, -200, 2, -20);


    return { mapSize: mapSize, obstacles: obstacles, responsePoints: responsePoints };
}





export default testMap;