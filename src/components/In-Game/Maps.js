import paper from "paper";
import Stone, { SideStone } from "./objects/rock";
import SeaAnemone from "./objects/SeaAnemone";
import Seaweed from "./objects/Seaweed";

function testMap() {
    // map Size setup
    const mapSize = [3072, 1648];

    const obstacles = [];


    const rect = new paper.Path.Rectangle([0, -mapSize[1] / 2], [mapSize[0], mapSize[1]]);

    rect.strokeColor = "black";
    rect.strokeWidth = "3";

    // // Map camera movement
    // const screen1 = new paper.PointText();
    // screen1.content = "1";
    // screen1.fontSize = 60;
    // screen1.bounds.center = [mapSize[0] / 4, mapSize[1] / 4];

    // const screen2 = new paper.PointText();
    // screen2.content = "2";
    // screen2.fontSize = 60;
    // screen2.bounds.center = [mapSize[0] / 4, -mapSize[1] / 4];


    // const screen3 = new paper.PointText();
    // screen3.content = "3";
    // screen3.fontSize = 60;
    // screen3.bounds.center = [mapSize[0] * 0.75, -mapSize[1] / 4];


    // const screen4 = new paper.PointText();
    // screen4.content = "4";
    // screen4.fontSize = 60;
    // screen4.bounds.center = [mapSize[0] * 0.75, mapSize[1] / 4];


    // setup center Stone
    obstacles.push(new Stone(mapSize[0] / 2, 0, 2.5));


    // setup Stones at the 4 egdes of map
    obstacles.push(new SideStone(mapSize[0] / 4, mapSize[1] / 4, 0, false, mapSize));
    obstacles.push(new SideStone(mapSize[0] * 0.75, mapSize[1] / 4, 0, true, mapSize));
    obstacles.push(new SideStone(mapSize[0] / 4, -mapSize[1] / 4, 180, true, mapSize));
    obstacles.push(new SideStone(mapSize[0] * 0.75, -mapSize[1] / 4, 180, false, mapSize));


    // Response place setup
    const userResponsePoints = [93.75, 63.3];
    const mobsResponsePoints = [[100, 0], [mapSize[0] - 100, 0], [mapSize[0] / 2, mapSize[1] / 2 - 100], [mapSize[0] / 2, -mapSize[1] / 2 + 100]];

    const responsePoints = { userResponsePoints: userResponsePoints, mobsResponsePoints: mobsResponsePoints };



    const attackers = [];

    // Setup seaAnemons
    attackers.push();
    attackers.push(new SeaAnemone(500, 610, 1.5, 0));
    attackers.push(new SeaAnemone(300, 550, 1, 0));
    attackers.push(new SeaAnemone(990, 760, 1, 40));
    attackers.push(new SeaAnemone(990, 230, 1, 180));
    attackers.push(new SeaAnemone(550, 20, 0.8, 200));
    attackers.push(new SeaAnemone(2200, 190, 0.8, 160));
    attackers.push(new SeaAnemone(3030, 190, 1.2, 280));
    attackers.push(new SeaAnemone(2550, 600, 2, 10));
    attackers.push(new SeaAnemone(2350, -150, 2, 30));
    attackers.push(new SeaAnemone(2350, -640, 2, 210));
    attackers.push(new SeaAnemone(900, -700, 1.1, 140));
    attackers.push(new SeaAnemone(900, -200, 2, -20));


    const hiders = []
    hiders.push()

    // Setup seaweeds
    hiders.push(new Seaweed(700, 100, 1.2, 210));
    hiders.push(new Seaweed(800, 650, 1.2, -20));
    hiders.push(new Seaweed(90, 340, 1.2, 70));
    hiders.push(new Seaweed(1600, 250, 1.2, 175));
    hiders.push(new Seaweed(1750, 250, 1.2, 175));
    hiders.push(new Seaweed(1540, 780, 1.5, 0));
    hiders.push(new Seaweed(1540, -860, 1.5, 180));
    hiders.push(new Seaweed(2700, -600, 1.3, 200));
    hiders.push(new Seaweed(2800, 510, 1.3, -10));
    hiders.push(new Seaweed(300, -560, 1.2, 170));
    hiders.push(new Seaweed(660, -660, 1.2, 140));

    return { mapSize: mapSize, obstacles: obstacles, responsePoints: responsePoints ,attackers:attackers,hiders:hiders};
}





export default testMap;