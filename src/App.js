import React from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import InputForm from "./components/inputform/inputform";

import Tachyons from "tachyons/css/tachyons.min.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <InputForm />
      {/* <facedetection /> */}
    </div>
  );
}

export default App;
