import React from "react";
import InGameButton from "./InGameButton";


function Main () {
    return (
        <main className="main">
            <InGameButton isActivated={ false } text="MultiPlay (See you Soon!)" />
            <InGameButton isActivated={ true } text="SinglePlay" />
        </main>
    );
}


export default Main;
