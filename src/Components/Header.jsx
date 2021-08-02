import React, { useContext } from "react";
import svg from "../assets/spr.svg";
import { AppState } from "../App";

function Header() {
  const { setAppState } = useContext(AppState);
  const handleChange = (e) => {
    setAppState((prevState) => {
      return { ...prevState, query: e.target.value };
    });
  };

  return (
    <>
      <nav className="navbar">
        <h2 className="navbar-header">Search Photos</h2>
        <form action="#" className="navbar-form">
          <input
            className="navbar-input"
            onChange={(e) => handleChange(e)}
            type="search"
            placeholder="Search"
          />
          <svg className="navbar-input-icon">
            <use xlinkHref={`${svg}#icon-search`} />
          </svg>
        </form>
      </nav>
    </>
  );
}

export default Header;
