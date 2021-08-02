import React, { useContext } from "react";
import { AppState } from "../App";

function Model({ img, title, show }) {
  const { setAppState } = useContext(AppState);

  const handleClick = () => {
    setAppState((prevState) => {
      return { ...prevState, show: false };
    });
  };

  return (
    <>
      <div
        className="model"
        style={show ? { display: "block" } : { display: "none" }}
      >
        <img className="model-img" src={img} alt={title} />
        <button
          className="model-close-btn"
          type="button"
          onClick={() => handleClick()}
        >
          X
        </button>
      </div>
    </>
  );
}

export default Model;
