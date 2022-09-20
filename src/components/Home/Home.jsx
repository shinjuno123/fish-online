import React, { useState } from "react";
import SettingButton from "./SettingButton";
import ModechageButton from "./ModeChangeButton";
import Footer from "./Footer";
import Main from "./Main";
import Header from "./Header";
import "./css/index.css";

function Home () {
    const [mode, setMode] = useState("keyboard");

    function handleModeChange () {
        setMode(function (prev) {
            const currentMode = (prev === "keyboard") ? "exercise" : "keyboard";
            return currentMode;
        });
    }

    return (
        <div className="home">
            <SettingButton />
            <Header mode={ mode } />
            <Main />
            <ModechageButton currentMode={ mode } changeMode={ handleModeChange } />
            <Footer />
        </div>
    );
}


export default Home;