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

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
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
    fetch("https://radiant-basin-43552.herokuapp.com/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          user: {
            ...this.state.user,
            entries: data
          }
        });
      });

    this.setState({ imageUrl: this.state.input });
    fetch("https://radiant-basin-43552.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response =>
        this.displayBoundingBox(this.calculateFaceLocation(response))
      )
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles params={Params} className="particles" />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <InputForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceDetection box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <div>
            <SignIn
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
