import React from "react";
import InGameButton from "./InGameButton";


function Main (props) {
    return (
        <main className="main">
            <InGameButton mode={ props.mode } isActivated={ false } text="MultiPlay (See you Soon!)" />
            <InGameButton mode={ props.mode } isActivated={ true } text="SinglePlay" />
        </main>
    );
}


export default Main;
