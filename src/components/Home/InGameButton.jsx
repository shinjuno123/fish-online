import React from "react";

function InGameButton (props) {
    function handleClick () {
        const currentMode = props.mode;

        if (props.isActivated) {
            window.location.href = `${ process.env.PUBLIC_URL }/game/${ currentMode }`;
        }


    }

    return (
        <div className="in-game-button">
            <button onClick={ handleClick } style={ { background: props.isActivated ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)" } }>{ props.text }</button>
        </div >
    );
}



export default InGameButton;