import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import ai from "./ai.png";

const Logo = () => {
  return (
    <Tilt
      className="Tilt br2 shadow-2"
      options={{ max: 50 }}
      style={{ height: 150, width: 150 }}
    >
      <div className="Tilt-inner pa3">
        <img src={ai} alt="logo" style={{ paddingRight: "2px" }} />
      </div>
    </Tilt>
  );
};

export default Logo;
