import React from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import InputForm from "./components/inputform/inputform";
import Rank from "./components/rank/rank";

import Particles from "react-particles-js";
import Tachyons from "tachyons/css/tachyons.min.css";
import Params from "./pointers";

function App() {
  return (
    <div className="App">
      <Particles params={Params} className="particles" />
      <Navigation />
      <Logo />
      <Rank />
      <InputForm />

      {/* <facedetection /> */}
    </div>
  );
}

export default App;
