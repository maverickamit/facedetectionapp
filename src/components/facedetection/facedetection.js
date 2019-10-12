import React from "react";

const FaceDetection = ({ imageUrl }) => {
  return (
    <div className="center">
      <img alt=" " src={imageUrl} />
    </div>
  );
};

export default FaceDetection;
