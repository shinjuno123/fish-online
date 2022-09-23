import paper from "paper";

// Starty(fish character in game) class
function CreateStarty (head) {
    this.head = head;
    this.starty = new paper.Group();

    this.constructor = function () {
        const startyBody = this._makeBody();
        const startyTail = this._makeTail();
        const startyFin = this._makeFin();
        const { startyEye, startyPupil } = this._makeEyeAndPupil();
        const startyMouth = this._makeMouth();


        this.starty.addChild(startyBody);
        this.starty.addChild(startyTail);
        this.starty.addChild(startyFin);
        this.starty.addChild(startyEye);
        this.starty.addChild(startyPupil);
        this.starty.addChild(startyMouth);
        this._makeBodyFin();
        this._makeTailFin();
        // this.starty.skew(90, [100, 200]);
        // this.starty.transform();
    };


    this._makeBody = function () {
        const startyBody = new paper.Path([this.head.x, this.head.y], [this.head.x + 160, this.head.y + 10], [this.head.x + 160, this.head.y - 10], [this.head.x, this.head.y]);
        startyBody.curves[0].handle1.y = 45;
        startyBody.curves[0].handle2.y = 15;
        startyBody.curves[2].handle2.y = -45;
        startyBody.curves[2].handle1.y = -15;
        startyBody.fillColor = "#31E1F7";
        startyBody.strokeColor = "black";
        startyBody.strokeWidth = 3;
        startyBody.closed = true;

        return startyBody;
    };


    this._makeTail = function () {
        const startyTail = new paper.Path([this.head.x + 160, this.head.y - 10], [this.head.x + 200, this.head.y - 30], [this.head.x + 200, this.head.y + 30], [this.head.x + 160, this.head.y + 10]);
        startyTail.fillColor = "#D800A6";
        startyTail.strokeColor = "black";
        startyTail.strokeWidth = 3;
        startyTail.closed = true;
        startyTail.curves[0].handle1.y = -5;
        startyTail.curves[2].handle1.y = 5;


        return startyTail;
    };

    this._makeFin = function () {
        const startyFin = new paper.Path([this.head.x + 45, this.head.y - 26], [this.head.x + 70, this.head.y - 45], [this.head.x + 140, this.head.y - 20], [this.head.x + 45, this.head.y - 26]);
        startyFin.fillColor = "#D800A6";
        startyFin.strokeColor = "black";
        startyFin.strokeWidth = 3;
        startyFin.curves[0].handle2.y = 10;
        startyFin.curves[2].handle1.y = -2;
        startyFin.curves[2].handle2.y = -3;

        return startyFin;
    };

    this._makeEyeAndPupil = function () {
        const startyEye = new paper.Path.Circle([this.head.x + 20, this.head.y - 6], 8);
        startyEye.fillColor = "white";
        startyEye.strokeColor = "black";
        startyEye.strokeWidth = 3;

        const startyPupil = new paper.Path([startyEye.position.x - 3, startyEye.position.y + 2], [startyEye.position.x + 3, startyEye.position.y + 2]);
        startyPupil.strokeColor = "black";
        startyPupil.strokeWidth = 2;
        startyPupil.curves[0].handle1.y = -5;
        startyPupil.curves[0].handle2.y = -5;

        return { startyEye: startyEye, startyPupil: startyPupil };
    };

    this._makeMouth = function () {
        const startyMouth = new paper.Path([this.head.x + 3.5, this.head.y + 10], [this.head.x + 20, this.head.y + 10], [this.head.x + 12, this.head.y + 17], [this.head.x + 3.5, this.head.y + 10]);
        startyMouth.curves[2].handle1.y = 2;
        startyMouth.curves[2].handle2.y = 2;
        startyMouth.strokeColor = "black";
        startyMouth.strokeWidth = 2;
        startyMouth.fillColor = "#FF7777";

        return startyMouth;
    };

    this._makeBodyFin = function () {
        for (let i = this.head.x + 55; i < this.head.x + 150; i += 20) {
            const startyBodyFin = new paper.Path([i, this.head.y - 15], [i, this.head.y - 7], [i, this.head.y], [i, this.head.y + 8], [i, this.head.y + 15]);
            startyBodyFin.curves.forEach(function (curve) {
                curve.handle1.x = 5;
                curve.handle2.x = 5;
            });
            startyBodyFin.strokeColor = "black";
            startyBodyFin.strokeWidth = 2;
            this.starty.addChild(startyBodyFin);
        }
    };


    this._makeTailFin = function () {
        for (let i = -10; i <= 10; i += 5) {
            const startyTailFin = new paper.Path([this.head.x + 170, this.head.y - 10 + (i + 10)], [this.head.x + 190, this.head.y - 10 + (i + 10)]);
            startyTailFin.strokeWidth = 2;
            startyTailFin.strokeColor = "black";
            startyTailFin.rotate(i * 2, startyTailFin.bounds.bottomLeft);
            this.starty.addChild(startyTailFin);

        }
    };

    this.constructor();
}




export { CreateStarty };