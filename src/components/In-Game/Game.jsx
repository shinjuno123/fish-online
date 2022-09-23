import React, { useEffect } from "react";
import paper from "paper";
import { CreateStarty } from "./Characters";
import "./css/game.css";





function Game () {

    function canvasSetup () {
        const canvas = document.getElementById("game-canvas");
        paper.setup(canvas);
        CreateStarty();
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