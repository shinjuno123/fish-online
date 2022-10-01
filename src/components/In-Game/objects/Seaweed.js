import paper from "paper";



function Seaweed(x, y, scale, degree) {
    this.group = new paper.Group();
    this.path = new paper.Path([50, 100], [50, 60], [50, 20], [60, 20], [60, 60], [60, 100]);


    this.constructor = function () {
        this.path.strokeColor = "black";
        this.path.strokeWidth = 2;
        this.path.fillColor = "#ACE094";
        this.path.curves[0].handle1.x = 10;
        this.path.curves[0].handle2.x = 10;

        this.path.curves[1].handle1.x = -10;
        this.path.curves[1].handle2.x = -10;

        this.path.curves[2].handle1.y = -2;
        this.path.curves[2].handle2.y = -2;

        this.path.curves[3].handle1.x = -10;
        this.path.curves[3].handle2.x = -10;

        this.path.curves[4].handle1.x = 10;
        this.path.curves[4].handle2.x = 10;

        for (let i = 1; i <= 10; i++) {
            const clone = this.path.clone();
            clone.position.x += i * 14;
            this.group.addChild(clone);
        }


        this.group.addChild(this.path);


        this.group.bounds.bottomCenter.x = x;
        this.group.bounds.bottomCenter.y = y;


        this.group.bounds.height *= scale;
        this.group.rotate(degree, this.group.bounds.bottomCenter);
    }

    this.constructor();

}

export default Seaweed;