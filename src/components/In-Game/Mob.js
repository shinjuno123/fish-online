import paper from "paper";


function Mob1 () {
    const frame = new paper.Path.Rectangle([0, 0], [200, 150]);
    frame.strokeColor = "black";
    const mob1 = new paper.Group();


    const fin = new paper.Path([55, 29], [45, 10], [150, 56], [180, 40], [180, 115], [150, 90], [145, 90], [113, 105]);
    // fin.selected = true;
    fin.fillColor = "#F6D30E";
    fin.strokeColor = "black";
    fin.strokeWidth = 3;
    fin.curves[0].handle1.x = 2;
    fin.curves[0].handle2.x = 2;
    fin.curves[1].handle1.x = 100;
    fin.curves[1].handle2.y = -15;
    fin.curves[2].handle1.y = -12;
    fin.curves[3].handle1.x = 10;
    fin.curves[3].handle2.x = 10;
    fin.curves[4].handle2.y = 12;
    fin.curves[6].handle1.y = 20;
    fin.curves[6].handle2.y = 25;

    const body = new paper.Path([0, 75], [150, 75], [0, 75]);
    // body.selected = true;
    body.strokeColor = "black";
    body.strokeWidth = 3;
    body.curves[0].handle1.y = 45;
    body.curves[0].handle2.y = 45;
    body.curves[1].handle1.y = -65;
    body.curves[1].handle2.y = -65;
    body.fillColor = "#44A2F3";


    const bodyPattern1 = new paper.Path([27, 37], [27, 101], [44, 106], [44, 31]);
    // bodyPattern1.selected = true;
    bodyPattern1.fillColor = "#F6D30E";
    bodyPattern1.strokeColor = "black";
    bodyPattern1.strokeWidth = 3;
    bodyPattern1.curves[0].handle1.x = 15;
    bodyPattern1.curves[0].handle2.x = 8;
    bodyPattern1.curves[2].handle2.x = 13;
    bodyPattern1.curves[2].handle1.x = 15;


    const bodyPattern2 = new paper.Path([67, 27], [67, 109], [85, 109], [85, 27]);
    // bodyPattern2.selected = true;
    bodyPattern2.fillColor = "#F6D30E";
    bodyPattern2.strokeColor = "black";
    bodyPattern2.strokeWidth = 3;
    bodyPattern2.curves[0].handle1.x = 15;
    bodyPattern2.curves[0].handle2.x = 15;
    bodyPattern2.curves[2].handle2.x = 13;
    bodyPattern2.curves[2].handle1.x = 20;


    const bodyPattern3 = new paper.Path([115, 33], [115, 103], [125, 100], [125, 39]);
    // bodyPattern3.selected = true;
    bodyPattern3.fillColor = "#F6D30E";
    bodyPattern3.strokeColor = "black";
    bodyPattern3.strokeWidth = 3;
    bodyPattern3.curves[0].handle1.x = 16;
    bodyPattern3.curves[0].handle2.x = 8;
    bodyPattern3.curves[2].handle2.x = 20;
    bodyPattern3.curves[2].handle1.x = 16;


    const eye = new paper.Path.Circle([17, 65], 10);
    eye.fillColor = "white";
    const pupil = new paper.Path([eye.position.x - 5, eye.position.y + 3], [eye.position.x + 5, eye.position.y + 3]);
    // pupil.selected = true;
    pupil.strokeColor = "black";
    pupil.strokeCap = "round";
    pupil.strokeWidth = 3;
    pupil.curves[0].handle1.y = -8;
    pupil.curves[0].handle2.y = -8;


}




export { Mob1 };