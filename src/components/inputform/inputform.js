import React from "react";
import "./inputform.css";
const InputForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        This Smart App will detect faces in your pictures. Try it out!
      </p>
      <div className="center">
        <div className="center form pa3 br2 shadow-5 ">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            placeholder="Enter the URL to your picture"
            onChange={onInputChange}
          />
          <button
            className="w-30 f4 link ph3 pv2 dib white bg-light-purple primary"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
