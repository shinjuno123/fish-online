import paper from "paper";



function Seaweed (x, y, scale, reverse) {
    this.group = new paper.Group();
    this.path = new paper.Path([50, 100], [50, 60], [50, 20], [60, 20], [60, 60], [60, 100]);

    // this.path.selected = true;
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


    this.group.addChild(this.path);


    this.group.bounds.bottomCenter.x = x;
    this.group.bounds.bottomCenter.y = y;

    // flip horizontally
    if (reverse) {
        this.group.scale(-1, 1);
    } else {
        this.group.scale(1, 1);
    }

    this.group.bounds.height *= scale;

}

export default Seaweed;