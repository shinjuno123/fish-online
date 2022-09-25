import React, { useEffect } from "react";
import paper from "paper";
import { Starty } from "./Characters";
import "./css/game.css";
import { update } from "./CharactersEvent";




function Game () {

    function canvasSetup () {
        const canvas = document.getElementById("game-canvas");
        paper.setup(canvas);

        // object generation test
        const starty = new Starty({ x: 200, y: 300 });
        update(starty);

    }

    useEffect(() => {
        canvasSetup();
    });


    return (
        <div className="game"  >
            <canvas style={ { width: window.screen.availWidth + "px", height: window.screen.availHeight + "px" } } id="game-canvas"></canvas>
        </div>
    );
}

export default Game;