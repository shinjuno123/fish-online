import React, { useEffect } from "react";
import paper from "paper";
import { CreateStarty } from "./Characters";
import "./css/game.css";




function Game () {

    function canvasSetup () {
        const canvas = document.getElementById("game-canvas");
        paper.setup(canvas);

        // object generation test
        const starty = new CreateStarty({ x: 0, y: 50 });
        const starty2 = new CreateStarty({ x: 100, y: 200 });
        const starty3 = new CreateStarty({ x: 400, y: 200 });
        starty2.setPosition({ x: 200, y: 500 });
        console.log(starty2.getPosition());

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