import React, { useEffect, useRef, useState } from "react";
import { Starty } from "./Characters";
import "./css/game.css";
import { gameStart } from "./CharactersEvent";
import { PaperScope } from "paper/dist/paper-core";
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
        const scope1 = new PaperScope();
        const scope2 = new PaperScope();
        const canvas = document.getElementById("game-canvas");
        const movementCanvas = document.getElementById("motion-canvas");

        scope1.setup(canvas);


        scope1.activate();

    



        const { mapSize, obstacles, responsePoints, attackers, hiders } = testMap(scope1);
        const starty = new Starty({ x: window.screen.availWidth / 2, y: window.screen.availHeight / 2 }, false, 70,scope1);


        gameStart(scope1,video, starty, mapSize, [], obstacles, responsePoints, attackers, hiders);
    }



    useEffect(() => {
        videoSetting(video,cameraOptions,0);
        canvasSetup();
    });

    return (
        <div style={{ width: window.screen.availWidth + "px", height: window.screen.availHeight + 40 + "px" }} className="game" >
            <canvas id="game-canvas"></canvas>
            <video ref={video} autoPlay></video>
            <canvas id="motion-canvas"></canvas>
            <select onChange={handleCameraSelection} ref={cameraOptions}/>
        </div>
    );
}

export default Game;