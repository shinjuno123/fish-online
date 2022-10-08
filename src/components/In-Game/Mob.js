import { v4 as uuidv4 } from "uuid";

function Mob1 (center, reverse = true, size,paper) {
    this.center = center;
    this.group = new paper.Group();
    this.id = uuidv4();
    this.reverse = reverse;
    this.size = size;
    this.ratio = { width: 1, height: 0.5688288 };
    this.hideTime = 0;


    this.constructor = function () {
        this.group = new paper.Group();
        const { bodyPattern1, bodyPattern2, bodyPattern3 } = this._makeBodypatterns();
        const { eye, pupil } = this._makeEyeAndPupil();


        this.group.addChild(this._makeFin());
        this.group.addChild(this.makeBody());
        this.group.addChild(bodyPattern1);
        this.group.addChild(bodyPattern2);
        this.group.addChild(bodyPattern3);
        this.group.addChild(eye);
        this.group.addChild(pupil);

        this.group.bounds.width = this.ratio.width * this.size;
        this.group.bounds.height = this.ratio.height * this.size;
        this.group.position.x = center.x;
        this.group.position.y = center.y;
    };


    this._makeFin = function () {
        let fin;
        if (this.reverse) {
            fin = new paper.Path([center.x + 37.25, center.y - 33.7], [center.x + 47.25, center.y - 53.3], [center.x - 56.25, center.y - 7.3], [center.x - 86.25, center.y - 23.3], [center.x - 86.25, center.y + 51.7], [center.x - 56.25, center.y + 26.7], [center.x - 51.25, center.y + 26.7], [center.x - 19.25, center.y + 41.7]);


            fin.fillColor = "#F6D30E";
            fin.strokeColor = "black";
            fin.strokeWidth = 3;
            fin.curves[0].handle1.x = -2;
            fin.curves[0].handle2.x = -2;
            fin.curves[1].handle1.x = -100;
            fin.curves[1].handle2.y = 15;
            fin.curves[2].handle1.y = -12;
            fin.curves[3].handle1.x = -10;
            fin.curves[3].handle2.x = -10;
            fin.curves[4].handle2.y = 12;
            fin.curves[6].handle1.y = 20;
            fin.curves[6].handle2.y = 25;

        } else {
            fin = new paper.Path([center.x - 37.25, center.y - 33.7], [center.x - 47.25, center.y - 53.3], [center.x + 56.25, center.y - 7.3], [center.x + 86.25, center.y - 23.3], [center.x + 86.25, center.y + 51.7], [center.x + 56.25, center.y + 26.7], [center.x + 51.25, center.y + 26.7], [center.x + 19.25, center.y + 41.7]);
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
        }



        return fin;
    };

    this.setReverse = function (isReverse = false) {
        this.isReverse = isReverse;
        const previousPosition = this.group.position;
        this.group.remove();
        this.constructor();
        this.group.position = previousPosition;

    };

    this.getReverse = function () {
        return this.isReverse;
    };

    this.makeBody = function () {
        let body;
        if (this.reverse) {
            body = new paper.Path([center.x + 93.75, center.y + 11.7], [center.x - 56.25, center.y + 11.7], [center.x + 93.75, center.y + 11.7]);
        } else {
            body = new paper.Path([center.x - 93.75, center.y + 11.7], [center.x + 56.25, center.y + 11.7], [center.x - 93.75, center.y + 11.7]);


            // body.selected = true;
        }
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
        let bodyPattern1, bodyPattern2, bodyPattern3;
        if (this.reverse) {
            bodyPattern1 = new paper.Path([center.x + 66.75, center.y - 26.3], [center.x + 66.75, center.y + 37.7], [center.x + 49.75, center.y + 42.7], [center.x + 49.75, center.y - 32.3]);

            bodyPattern2 = new paper.Path([center.x + 26.75, center.y - 36.3], [center.x + 26.75, center.y + 45.7], [center.x + 8.75, center.y + 45.7], [center.x + 8.75, center.y - 36.3]);

            bodyPattern3 = new paper.Path([center.x - 21.25, center.y - 30.3], [center.x - 21.25, center.y + 39.7], [center.x - 31.25, center.y + 36.7], [center.x - 31.25, center.y - 24.3]);

            // bodypattern 1 style setup
            bodyPattern1.fillColor = "#F6D30E";
            bodyPattern1.strokeColor = "black";
            bodyPattern1.strokeWidth = 3;
            bodyPattern1.curves[0].handle1.x = -15;
            bodyPattern1.curves[0].handle2.x = -8;
            bodyPattern1.curves[2].handle2.x = -13;
            bodyPattern1.curves[2].handle1.x = -15;

            // bodypattern 2 style setup
            bodyPattern2.fillColor = "#F6D30E";
            bodyPattern2.strokeColor = "black";
            bodyPattern2.strokeWidth = 3;
            bodyPattern2.curves[0].handle1.x = -15;
            bodyPattern2.curves[0].handle2.x = -15;
            bodyPattern2.curves[2].handle2.x = -13;
            bodyPattern2.curves[2].handle1.x = -20;



            // bodypattern 3 style setup
            bodyPattern3.fillColor = "#F6D30E";
            bodyPattern3.strokeColor = "black";
            bodyPattern3.strokeWidth = 3;
            bodyPattern3.curves[0].handle1.x = -16;
            bodyPattern3.curves[0].handle2.x = -8;
            bodyPattern3.curves[2].handle2.x = -20;
            bodyPattern3.curves[2].handle1.x = -16;

        } else {
            bodyPattern1 = new paper.Path([center.x - 66.75, center.y - 26.3], [center.x - 66.75, center.y + 37.7], [center.x - 49.75, center.y + 42.7], [center.x - 49.75, center.y - 32.3]);

            bodyPattern2 = new paper.Path([center.x - 26.75, center.y - 36.3], [center.x - 26.75, center.y + 45.7], [center.x - 8.75, center.y + 45.7], [center.x - 8.75, center.y - 36.3]);

            bodyPattern3 = new paper.Path([center.x + 21.25, center.y - 30.3], [center.x + 21.25, center.y + 39.7], [center.x + 31.25, center.y + 36.7], [center.x + 31.25, center.y - 24.3]);

            // bodypattern 1 style setup
            bodyPattern1.fillColor = "#F6D30E";
            bodyPattern1.strokeColor = "black";
            bodyPattern1.strokeWidth = 3;
            bodyPattern1.curves[0].handle1.x = 15;
            bodyPattern1.curves[0].handle2.x = 8;
            bodyPattern1.curves[2].handle2.x = 13;
            bodyPattern1.curves[2].handle1.x = 15;

            // bodypattern 2 style setup
            bodyPattern2.fillColor = "#F6D30E";
            bodyPattern2.strokeColor = "black";
            bodyPattern2.strokeWidth = 3;
            bodyPattern2.curves[0].handle1.x = 15;
            bodyPattern2.curves[0].handle2.x = 15;
            bodyPattern2.curves[2].handle2.x = 13;
            bodyPattern2.curves[2].handle1.x = 20;



            // bodypattern 3 style setup
            bodyPattern3.fillColor = "#F6D30E";
            bodyPattern3.strokeColor = "black";
            bodyPattern3.strokeWidth = 3;
            bodyPattern3.curves[0].handle1.x = 16;
            bodyPattern3.curves[0].handle2.x = 8;
            bodyPattern3.curves[2].handle2.x = 20;
            bodyPattern3.curves[2].handle1.x = 16;

        }


        return { bodyPattern1: bodyPattern1, bodyPattern2: bodyPattern2, bodyPattern3: bodyPattern3 };
    };


    this._makeEyeAndPupil = function () {
        let eye, pupil;
        if (this.reverse) {
            eye = new paper.Path.Circle([center.x + 76.75, center.y - 1.7], 10);
            eye.fillColor = "white";
            pupil = new paper.Path([eye.position.x - 5, eye.position.y + 3], [eye.position.x + 5, eye.position.y + 3]);
        } else {
            eye = new paper.Path.Circle([center.x - 76.75, center.y - 1.7], 10);
            eye.fillColor = "white";
            pupil = new paper.Path([eye.position.x - 5, eye.position.y + 3], [eye.position.x + 5, eye.position.y + 3]);
        }
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