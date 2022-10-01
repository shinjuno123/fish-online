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



        const { mapSize, obstacles, responsePoints,attackers,hiders } = testMap();
        const starty = new Starty({ x: window.screen.availWidth / 2, y:window.screen.availHeight / 2 }, false, 70);

        // paper.view.zoom = 0.3;
        update(starty, mapSize, [], obstacles, responsePoints,attackers,hiders);
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