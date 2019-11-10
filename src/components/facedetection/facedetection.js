import React from "react";
import "./facedetection.css";

const FaceDetection = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt3">
        <img
          id="inputimage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.toprow,
            bottom: box.bottomrow,
            right: box.rightcol,
            left: box.leftcol
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceDetection;
