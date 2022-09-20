import React from "react";


function InGameButton (props) {
    return (
        <div className="in-game-button">
            <button style={ { background: props.isActivated ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)" } }>{ props.text }</button>
        </div >
    );
}



export default InGameButton;