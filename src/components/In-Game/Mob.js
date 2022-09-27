import paper from "paper";
import { v4 as uuidv4 } from "uuid";
// Mob1({ x: 93.75, y: 63.3 });

function Mob1 (center) {
    this.center = center;
    this.mob1 = new paper.Group();
    this.id = uuidv4();

    this.constructor = function () {
        const { pattern1, pattern2, pattern3 } = this._makeBodypatterns();
        const { eye, pupil } = this._makeEyeAndPupil();

        this.mob1.addChild(this._makeFin());
        this.mob1.addChild(this.makeBody());
        this.mob1.addChild(pattern1);
        this.mob1.addChild(pattern2);
        this.mob1.addChild(pattern3);
        this.mob1.addChild(eye);
        this.mob1.addChild(pupil);
    };


    this._makeFin = function () {
        const fin = new paper.Path([center.x - 37.25, center.y - 33.7], [center.x - 47.25, center.y - 53.3], [center.x + 56.25, center.y - 7.3], [center.x + 86.25, center.y - 23.3], [center.x + 86.25, center.y + 51.7], [center.x + 56.25, center.y + 26.7], [center.x + 51.25, center.y + 26.7], [center.x + 19.25, center.y + 41.7]);
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

        return fin;
    };

    this.makeBody = function () {
        const body = new paper.Path([center.x - 93.75, center.y + 11.7], [center.x + 56.25, center.y + 11.7], [center.x - 93.75, center.y + 11.7]);
        // body.selected = true;
        body.strokeColor = "black";
        body.strokeWidth = 3;
        body.curves[0].handle1.y = 45;
        body.curves[0].handle2.y = 45;
        body.curves[1].handle1.y = -65;
        body.curves[1].handle2.y = -65;
        body.fillColor = "#44A2F3";

        return body;
    };

    this._makeBodypatterns = function () {
        const bodyPattern1 = new paper.Path([center.x - 66.75, center.y - 26.3], [center.x - 66.75, center.y + 37.7], [center.x - 49.75, center.y + 42.7], [center.x - 49.75, center.y - 32.3]);
        // bodyPattern1.selected = true;
        bodyPattern1.fillColor = "#F6D30E";
        bodyPattern1.strokeColor = "black";
        bodyPattern1.strokeWidth = 3;
        bodyPattern1.curves[0].handle1.x = 15;
        bodyPattern1.curves[0].handle2.x = 8;
        bodyPattern1.curves[2].handle2.x = 13;
        bodyPattern1.curves[2].handle1.x = 15;


        const bodyPattern2 = new paper.Path([center.x - 26.75, center.y - 36.3], [center.x - 26.75, center.y + 45.7], [center.x - 8.75, center.y + 45.7], [center.x - 8.75, center.y - 36.3]);
        // bodyPattern2.selected = true;
        bodyPattern2.fillColor = "#F6D30E";
        bodyPattern2.strokeColor = "black";
        bodyPattern2.strokeWidth = 3;
        bodyPattern2.curves[0].handle1.x = 15;
        bodyPattern2.curves[0].handle2.x = 15;
        bodyPattern2.curves[2].handle2.x = 13;
        bodyPattern2.curves[2].handle1.x = 20;


        const bodyPattern3 = new paper.Path([center.x + 21.25, center.y - 30.3], [center.x + 21.25, center.y + 39.7], [center.x + 31.25, center.y + 36.7], [center.x + 31.25, center.y - 24.3]);
        // bodyPattern3.selected = true;
        bodyPattern3.fillColor = "#F6D30E";
        bodyPattern3.strokeColor = "black";
        bodyPattern3.strokeWidth = 3;
        bodyPattern3.curves[0].handle1.x = 16;
        bodyPattern3.curves[0].handle2.x = 8;
        bodyPattern3.curves[2].handle2.x = 20;
        bodyPattern3.curves[2].handle1.x = 16;

        return { bodyPattern1, bodyPattern2, bodyPattern3 };
    };


    this._makeEyeAndPupil = function () {
        const eye = new paper.Path.Circle([center.x - 76.75, center.y - 1.7], 10);
        eye.fillColor = "white";
        const pupil = new paper.Path([eye.position.x - 5, eye.position.y + 3], [eye.position.x + 5, eye.position.y + 3]);
        // pupil.selected = true;
        pupil.strokeColor = "black";
        pupil.strokeCap = "round";
        pupil.strokeWidth = 3;
        pupil.curves[0].handle1.y = -8;
        pupil.curves[0].handle2.y = -8;

        return { eye, pupil };
    };



    this.constructor();
}




export { Mob1 };