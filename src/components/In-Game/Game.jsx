import React, { useEffect } from "react";
import paper from "paper";
import { Starty } from "./Characters";
import "./css/game.css";
import { update } from "./CharactersEvent";
import testMap from "./Maps";
import { Mob1 } from "./Mob";


function Game () {


    function canvasSetup () {
        const canvas = document.getElementById("game-canvas");
        paper.setup(canvas);



        const { mapSize, obstacles, userResponsePoints, mobsResponsePoints } = testMap();

        console.log(mapSize);

        const mob1 = new Mob1({ x: 93.75, y: 63.3 }, true, 70);

        const mobs = [mob1];


        const starty = new Starty({ x: mapSize[0] / 4, y: mapSize[1] / 4 }, false, 70);




        update(starty, mapSize, mobs, obstacles);



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