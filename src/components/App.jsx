import React from "react";
import SettingButton from "./SettingButton";
import ModechageButton from "./ModeChangeButton";
import Footer from "./Footer";
import Main from "./Main";
import Header from "./Header";

function App () {
  return (
    <div className="App">
      <SettingButton />
      <Header />
      <Main />
      <ModechageButton />
      <Footer />
    </div>
  );
}

export default App;
