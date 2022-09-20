import React from "react";


function ModechageButton (props) {
    return (<button onClick={ props.changeMode } className="mode-change"><img alt="mode" src={ props.currentMode === "keyboard" ? "./images/keyboard.png" : "./images/walk.png" } /><p>{ props.currentMode } Mode</p></button>);
}


export default ModechageButton;