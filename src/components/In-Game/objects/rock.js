import paper from "paper";
import stone from "./img/stone.png";

function Rock (x,y) {
    this.raster =  new paper.Raster(stone);
    this.raster.position.x = x;
    this.raster.position.y = y;


}


export default Rock;