import paper from "paper";
// import stone from "./img/stone.png";
// x : 437.975 y: 225.651
function Stone (x, y) {
    this.group = new paper.Group();
    this.stonePath = new paper.Path([x - 387.975, y + 24.385], [x - 377.975, y - 22.651], [x - 37.975, y - 125.651], [x + 362.025, y - 35.651], [x + 342.025, y + 74.349], [x - 32.975, y + 124.349], [x - 387.975, y + 24.385]);
    this.stonePath.selected = true;
    this.stonePath.strokeColor = "#595260";
    this.stonePath.strokeWidth = 10;
    this.stonePath.strokeCap = "round";
    this.stonePath.smooth();
    this.stonePath.fillColor = "#B2B1B9";
    // console.log(this.stone.position);

    this.group.addChild(this.stonePath);
    // this.raster.position.x = x;
    // this.raster.position.y = y;


}


export default Stone;