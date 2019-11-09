import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import InputForm from "./components/inputform/inputform";
import Rank from "./components/rank/rank";
import FaceDetection from "./components/facedetection/facedetection";

import Particles from "react-particles-js";
import Tachyons from "tachyons/css/tachyons.min.css";
import Params from "./pointers";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "0cdeeb12db6143eb91e0268d7f004ccf"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: ""
    };
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = event => {
    console.log("click");

    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        "0cdeeb12db6143eb91e0268d7f004ccf",
        "://samples.clarifai.com/face-det.jpg"
      )
      .then(
        function(response) {
          // do something with response
        },
        function(err) {
          // there was an error
        }
      );
  };

  render() {
    return (
      <div className="App">
        <Particles params={Params} className="particles" />
        <Navigation />
        <Logo />
        <Rank />
        <InputForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceDetection imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
