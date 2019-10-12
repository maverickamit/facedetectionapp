import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import InputForm from "./components/inputform/inputform";
import Rank from "./components/rank/rank";

import Particles from "react-particles-js";
import Tachyons from "tachyons/css/tachyons.min.css";
import Params from "./pointers";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ""
    };
  }

  onInputChange = event => {
    console.log(event.target.value);
  };

  
  render() {
    return (
      <div className="App">
        <Particles params={Params} className="particles" />
        <Navigation />
        <Logo />
        <Rank />
        <InputForm onInputChange={this.onInputChange} />
        {/* <facedetection /> */}
      </div>
    );
  }
}

export default App;
