import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import InputForm from "./components/inputform/inputform";
import Rank from "./components/rank/rank";
import FaceDetection from "./components/facedetection/facedetection";
import SignIn from "./components/signin/signin";
import Register from "./components/registration/registration";

import Particles from "react-particles-js";
import "tachyons/css/tachyons.min.css";
import Params from "./pointers";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "adf356b58c634ee98c2d9de8859629a6"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin"
    };
  }

  calculateFaceLocation = response => {
    const ClarifaiBox =
      response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height, ClarifaiBox.top_row);
    return {
      leftcol: ClarifaiBox.left_col * width,
      toprow: ClarifaiBox.top_row * height,
      rightcol: width - ClarifaiBox.right_col * width,
      bottomrow: height - ClarifaiBox.bottom_row * height
    };
  };

  displayBoundingBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = event => {
    console.log("click");

    this.setState({ imageUrl: this.state.input });
    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then(response =>
        this.displayBoundingBox(this.calculateFaceLocation(response))
      )

      // response.outputs[0].data.regions[0].region_info.bounding_box

      .catch(err => console.log("Error"));
    // there was an error
  };

  onRouteChange = route => {
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles params={Params} className="particles" />
        {this.state.route === "home" ? (
          <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank />
            <InputForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceDetection
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <div>
            <SignIn onRouteChange={this.onRouteChange} />
          </div>
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
