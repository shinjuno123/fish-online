import React, { useEffect } from "react";
import paper from "paper";
import { Starty } from "./Characters";
import "./css/game.css";




function Game () {

    function canvasSetup () {
        const canvas = document.getElementById("game-canvas");
        paper.setup(canvas);

        // object generation test
        const starty = new Starty({ x: 0, y: 50 }, true);
        const starty2 = new Starty({ x: 100, y: 200 });
        const starty3 = new Starty({ x: 400, y: 200 });
        starty2.setPosition({ x: 200, y: 500 });
        // starty2.setSize(300, 100);
        console.log(starty2.id);
        starty2.setReverse(true);
        console.log(starty2.id);

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