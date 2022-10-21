import { v4 as uuidv4 } from "uuid";
import { startyMovementHandler } from "./CharactersEvent";
import paper from "paper";

// Starty(fish character in game) class
function Starty (center, isReverse = false, size) {
    this.head = { x: center.x - 100, y: center.y };
    this.group = new paper.Group();
    this.isReverse = isReverse;
    this.id = uuidv4();
    this.ratio = { width: 1, height: 0.378306 };
    this.size = size;
    this.rx = center.x;
    this.ry = center.y;

    this.constructor = function () {
        this.group = new paper.Group();
        const startyBody = this._makeBody(this.isReverse);
        const startyTail = this._makeTail(this.isReverse);
        const startyFin = this._makeFin(this.isReverse);
        const { startyEye, startyPupil } = this._makeEyeAndPupil(this.isReverse);
        const startyMouth = this._makeMouth(this.isReverse);


        this.group.addChild(startyBody);
        this.group.addChild(startyTail);
        this.group.addChild(startyFin);
        this.group.addChild(startyEye);
        this.group.addChild(startyPupil);
        this.group.addChild(startyMouth);
        this._makeBodyFin(this.isReverse);
        this._makeTailFin(this.isReverse);

        this.group.bounds.width = this.ratio.width * this.size;
        this.group.bounds.height = this.ratio.height * this.size;
        this.group.position.x = center.x;
        this.group.position.y = center.y;

        // Setup character movement handler
        document.body.addEventListener("keydown", (event) => startyMovementHandler(event));
        document.body.addEventListener('keyup', (event) => startyMovementHandler(event));
    };


    this.getPosition = function () {
        return this.group.position;
    };

    this.setPosition = function (point) {
        this.group.position.x = point.x;
        this.group.position.y = point.y;
    };

    this.setSize = function (size) {
        this.group.bounds.width = this.ratio.width * size;
        this.group.bounds.height = this.ratio.height * size;
        this.size = size;
    };

    this.getSize = function () {
        return this.group.bounds;
    };

    this.setReverse = function (isReverse = false) {
        // isReverse === true -> arrowRight, 
        if ((isReverse && !this.isReverse) || (!isReverse && this.isReverse)) {
            this.group.scale(-1, 1);
        } else {
            this.group.scale(1, 1);
        }

        this.isReverse = isReverse;
    };

    this.getReverse = function () {
        return this.isReverse;
    };


    this._makeBody = function (isReverse = false) {
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


    this._makeTail = function (isReverse = false) {

        const startyTail = new paper.Path([this.head.x + 160, this.head.y - 10], [this.head.x + 200, this.head.y - 30], [this.head.x + 200, this.head.y + 30], [this.head.x + 160, this.head.y + 10]);
        startyTail.fillColor = "#D800A6";
        startyTail.strokeColor = "black";
        startyTail.strokeWidth = 3;
        startyTail.closed = true;
        startyTail.curves[0].handle1.y = -5;
        startyTail.curves[2].handle1.y = 5;
        return startyTail;


    };

    this._makeFin = function (isReverse = false) {

        const startyFin = new paper.Path([this.head.x + 45, this.head.y - 26], [this.head.x + 70, this.head.y - 45], [this.head.x + 140, this.head.y - 20], [this.head.x + 45, this.head.y - 26]);
        startyFin.fillColor = "#D800A6";
        startyFin.strokeColor = "black";
        startyFin.strokeWidth = 3;
        startyFin.curves[0].handle2.y = 10;
        startyFin.curves[2].handle1.y = -2;
        startyFin.curves[2].handle2.y = -3;

        return startyFin;


    };

    this._makeEyeAndPupil = function (isReverse = false) {

        // Declare eye and pupil variables
        let startyEye, startyPupil;

        // check if reverse left and right or not
        startyEye = new paper.Path.Circle([this.head.x + 20, this.head.y - 6], 8);
        startyPupil = new paper.Path([startyEye.position.x - 3, startyEye.position.y + 2], [startyEye.position.x + 3, startyEye.position.y + 2]);


        // Set up style of eye
        startyEye.fillColor = "white";
        startyEye.strokeColor = "black";
        startyEye.strokeWidth = 3;

        // Set up style of pupil
        startyPupil.strokeColor = "black";
        startyPupil.strokeWidth = 2;
        startyPupil.curves[0].handle1.y = -5;
        startyPupil.curves[0].handle2.y = -5;

        return { startyEye: startyEye, startyPupil: startyPupil };
    };

    this._makeMouth = function (isReverse = false) {
        let startyMouth;

        startyMouth = new paper.Path([this.head.x + 3.5, this.head.y + 10], [this.head.x + 20, this.head.y + 10], [this.head.x + 12, this.head.y + 17], [this.head.x + 3.5, this.head.y + 10]);



        startyMouth.curves[2].handle1.y = 2;
        startyMouth.curves[2].handle2.y = 2;
        startyMouth.strokeColor = "black";
        startyMouth.strokeWidth = 2;
        startyMouth.fillColor = "#FF7777";

        return startyMouth;
    };

    this._makeBodyFin = function (isReverse = false) {
        const start = this.head.x + 55;
        const end = this.head.x + 150;
        const direction = 20;

        for (let i = start; i < end; i += direction) {
            const startyBodyFin = new paper.Path([i, this.head.y - 15], [i, this.head.y - 7], [i, this.head.y], [i, this.head.y + 8], [i, this.head.y + 15]);
            startyBodyFin.curves.forEach(function (curve) {
                curve.handle1.x = 5;
                curve.handle2.x = 5;
            });
            startyBodyFin.strokeColor = "black";
            startyBodyFin.strokeWidth = 2;
            this.group.addChild(startyBodyFin);
        }
    };


    this._makeTailFin = function (isReverse = false) {
        // isReverse = true;
        const point1X = this.head.x + 170;
        const point2X = this.head.x + 190;

        for (let i = -10; i <= 10; i += 5) {
            const startyTailFin = new paper.Path([point1X, this.head.y + i], [point2X, this.head.y + i]);
            startyTailFin.strokeWidth = 2;
            startyTailFin.strokeColor = "black";
            startyTailFin.rotate(i * 2, startyTailFin.bounds.bottomLeft);

            this.group.addChild(startyTailFin);

        }
    };

    this.constructor();
}




export { Starty };