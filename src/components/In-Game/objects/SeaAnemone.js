import paper from "paper";


function SeaAnemone(x, y, scale, degree) {
    this.group = new paper.Group();


    this.constructor = function () {
        this.createBody();
        this.createTentacle();
        this.createBelly();


        this.group.bounds.bottomCenter.x = x;
        this.group.bounds.bottomCenter.y = y;

        this.group.rotate(degree, this.group.bounds.bottomCenter);

        this.group.scale(scale);
    }


    this.createBody = function () {
        // Create body
        const body = new paper.Path.Circle([40, 70], 30);
        body.strokeColor = "black";
        body.strokeWidth = 2;
        body.removeSegment(3);
        body.fillColor = "#E46028";
        body.curves[2].handle1.y = 30;
        body.curves[2].handle2.y = 30;
        this.group.addChild(body);


    
    }


    this.createTentacle = function () {
        const tentacle = new paper.Path([65, 80], [67, 20], [60, 10], [50, 30], [50, 80]);
        tentacle.strokeColor = "black";
        tentacle.strokeWidth = 2;
        tentacle.smooth();
        tentacle.fillColor = "#FF8642";
        tentacle.position.x = 40;
        tentacle.position.y = 10;

        for (let i = 0; i < 10; i++) {
            const tentaclone = tentacle.clone();
            tentaclone.bounds.height *= 0.7;
            if (i === 3) {
                tentaclone.rotate(i * 36, [tentacle.bounds.bottomCenter.x - 5, tentacle.bounds.bottomCenter.y - 10]);
            }
            else if (i === 4) {
                tentaclone.rotate(i * 36, [tentacle.bounds.bottomCenter.x - 2, tentacle.bounds.bottomCenter.y - 15]);
            } else if (i === 5) {
                tentaclone.rotate(i * 36, [tentacle.bounds.bottomCenter.x, tentacle.bounds.bottomCenter.y - 15]);
            } else if (i === 6) {
                tentaclone.rotate(i * 36, [tentacle.bounds.bottomCenter.x + 2, tentacle.bounds.bottomCenter.y - 15]);
            }
            else if (i === 7) {
                tentaclone.rotate(i * 36, [tentacle.bounds.bottomCenter.x + 8, tentacle.bounds.bottomCenter.y - 17]);
            }
            else {
                tentaclone.rotate(i * 36, tentacle.bounds.bottomCenter);
            }

            this.group.addChild(tentaclone);
        }

        tentacle.remove();
    }


    this.createBelly = function () {
        const belly = new paper.Path.Circle([40, 40], 20);
        belly.fillColor = "#E36229";
        belly.strokeColor = "black";
        belly.strokeWidth = 2;


        this.group.addChild(belly);
    }

    this.constructor();



}

export default SeaAnemone;