import paper from "paper";

// Character class itself
function CreateStarty () {

    const center = { x: 0, y: 50 };


    const starty = new paper.Group();
    const startyBody = new paper.Path([0, center.y], [160, 60], [160, 40], [0, 50]);
    startyBody.curves[0].handle1.y = 45;
    startyBody.curves[0].handle2.y = 15;
    startyBody.curves[2].handle2.y = -45;
    startyBody.curves[2].handle1.y = -15;
    startyBody.fillColor = "#31E1F7";
    startyBody.strokeColor = "black";
    startyBody.strokeWidth = 3;
    startyBody.closed = true;


    const startyTail = new paper.Path([160, 40], [200, 20], [200, 80], [160, 60]);
    startyTail.fillColor = "#D800A6";
    startyTail.strokeColor = "black";
    startyTail.strokeWidth = 3;
    startyTail.closed = true;
    startyTail.curves[0].handle1.y = -5;
    startyTail.curves[2].handle1.y = 5;

    const startyFin = new paper.Path([45, 24], [70, 5], [140, 30], [45, 24]);
    startyFin.fillColor = "#D800A6";
    startyFin.strokeColor = "black";
    startyFin.strokeWidth = 3;
    startyFin.curves[0].handle2.y = 10;
    startyFin.curves[2].handle1.y = -5;
    startyFin.curves[2].handle2.y = -5;

    const startyEye = new paper.Path.Circle([20, 44], 8);
    startyEye.fillColor = "white";
    startyEye.strokeColor = "black";
    startyEye.strokeWidth = 3;

    const startyPupil = new paper.Path([startyEye.position.x - 3, startyEye.position.y + 2], [startyEye.position.x + 3, startyEye.position.y + 2]);
    startyPupil.strokeColor = "black";
    startyPupil.strokeWidth = 2;
    startyPupil.curves[0].handle1.y = -5;
    startyPupil.curves[0].handle2.y = -5;
    console.log("두번");

    const startyMouth = new paper.Path([5, 60], [20, 60], [13, 67]);
    startyMouth.strokeColor = "black";
    startyMouth.strokeWidth = 2;
    startyMouth.fillColor = "#FF7777";

    starty.addChild(startyBody);
    starty.addChild(startyTail);
    starty.addChild(startyFin);
    starty.addChild(startyEye);
    starty.addChild(startyPupil);
    starty.addChild(startyMouth);


    for (let i = 55; i < 150; i += 20) {
        const startyBodyFin = new paper.Path([i, 35], [i, 43], [i, 50], [i, 58], [i, 65]);
        startyBodyFin.curves.forEach(function (curve) {
            curve.handle1.x = 5;
            curve.handle2.x = 5;
        });
        startyBodyFin.strokeColor = "black";
        startyBodyFin.strokeWidth = 2;
        starty.addChild(startyBodyFin);
    }


    for (let i = -10; i <= 10; i += 5) {
        const startyTailFin = new paper.Path([170, 40 + (i + 10)], [190, 40 + (i + 10)]);
        startyTailFin.strokeWidth = 2;
        startyTailFin.strokeColor = "black";
        startyTailFin.rotate(i * 2, startyTailFin.bounds.bottomLeft);
        starty.addChild(startyTailFin);

    }


    starty.bounds.height = 400;
    starty.bounds.width = 800;


}

export { CreateStarty };