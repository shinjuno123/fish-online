import React, { useEffect, useRef, useState } from "react";
import paper from "paper";
import { Starty } from "./Characters";
import "./css/game.css";
import { gameStart } from "./CharactersEvent";
import testMap from "./Maps";
import videoSetting from "./videoSetting";

function Game() {
    const video = useRef(null);
    const cameraOptions = useRef(null);

    function handleCameraSelection(event){
        const selectedIndex = event.target.selectedIndex;
        videoSetting(video,cameraOptions,selectedIndex)
    }


    function canvasSetup() {
        const canvas = document.getElementById("game-canvas");
        paper.setup(canvas);



        const { mapSize, obstacles, responsePoints, attackers, hiders } = testMap();
        const starty = new Starty({ x: window.screen.availWidth / 2, y: window.screen.availHeight / 2 }, false, 70);

        // paper.view.zoom = 0.3;
        gameStart(video, starty, mapSize, [], obstacles, responsePoints, attackers, hiders);
    }



    useEffect(() => {
        videoSetting(video,cameraOptions,0);
        canvasSetup();
    });

    return (
        <div style={{ width: window.screen.availWidth + "px", height: window.screen.availHeight + "px" }} className="game" >
            <canvas id="game-canvas"></canvas>
            <video ref={video} autoPlay></video>
            <select onChange={handleCameraSelection} ref={cameraOptions}/>
        </div>
    );
}

export default Game;