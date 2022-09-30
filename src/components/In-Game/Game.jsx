import React, { useEffect } from "react";
import paper from "paper";
import { Starty } from "./Characters";
import "./css/game.css";
import { update } from "./CharactersEvent";
import testMap from "./Maps";
import SeaAnemone from "./objects/SeaAnemone";


function Game () {


    function canvasSetup () {
        const canvas = document.getElementById("game-canvas");
        paper.setup(canvas);



        const { mapSize, obstacles, responsePoints } = testMap();

        console.log(mapSize);




        const starty = new Starty({ x: mapSize[0] / 4, y: mapSize[1] / 4 }, false, 70);




        update(starty, mapSize, [], obstacles, responsePoints);



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