import React, { useState } from "react";


function ModechageButton () {
    const [mode, setMode] = useState("keyboard");

    function handleModeChange () {
        setMode(function (prev) {
            const currentMode = (prev === "keyboard") ? "exercise" : "keyboard";
            return currentMode;
        });
    }

    return (<button onClick={ handleModeChange } className="mode-change"><img alt="mode" src={ mode === "keyboard" ? "/images/keyboard.png" : "/images/walk.png" } /><p>{ mode } Mode</p></button>);
}


export default ModechageButton;