import React, { useEffect } from "react";
import paper from "paper";
import { Starty } from "./Characters";
import "./css/game.css";
import { update } from "./CharactersEvent";
import testMap from "./Maps";


function Game () {


    function canvasSetup () {
        const canvas = document.getElementById("game-canvas");
        paper.setup(canvas);



        const mapSize = testMap();

        console.log(mapSize);


        const starty = new Starty({ x: mapSize[0] / 4, y: mapSize[1] / 4 });

        const starty2 = new Starty({ x: mapSize[0] / 4, y: mapSize[1] / 4 });


        starty.setPosition({ x: mapSize[0] / 4, y: mapSize[1] / 4 });

        // starty.setPosition([mapSize[0] / 2, mapSize[1] / 2]);
        update(starty, mapSize, starty2);



        // paper.view.center.x = mapSize[0] / 2;

        // paper.view.scrollBy([mapSize[0] / 2, -mapSize[1] / 2]);
        // console.log([0, mapSize[1] / 2]);






    }


    useEffect(() => {
        canvasSetup();
    });

    return (
        <div style={ { width: window.screen.availWidth + "px", height: window.screen.availHeight + "px" } } className="game" >
            <canvas id="game-canvas"></canvas>
        </div>
    );
}

export default Game;