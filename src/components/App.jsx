import React from "react";
import Home from "./Home/Home";
import Game from "./In-Game/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={ <Home /> }></Route>
          <Route path="game/keyboard" element={ <Game /> }></Route>
          <Route path="game/exercise" element={ <Game /> }></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
