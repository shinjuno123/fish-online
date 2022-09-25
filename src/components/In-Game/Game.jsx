import React, { useEffect, useState, useRef} from "react";
import paper from "paper";
import { Starty } from "./Characters";
import "./css/game.css";
import { update } from "./CharactersEvent";




function Game () {

    function canvasSetup () {
        const canvas = document.getElementById("game-canvas");
        paper.setup(canvas);

        const starty = new Starty({ x: 200, y: 300 });
        update(starty);

    }

    console.log("render");

    useEffect(() => {
        canvasSetup();
    });


    return (
        <div className="game"  >
            <canvas id="game-canvas"></canvas>
        </div>
    );
}

export default Game;