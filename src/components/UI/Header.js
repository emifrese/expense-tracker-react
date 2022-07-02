import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = ({ leftImg, titleText, rightImg, Toggle, type }) => {
  
  let leftSide = (
    <img src={leftImg} alt="user-profile" className="user-profile-img" />
  );
  let rightSide = (
    <img
      className="card-tag"
      src={rightImg}
      alt="user-info"
      onClick={() => Toggle('Person')}
    />
  );

  switch (type) {
    case "main":
      break;
    case "stats":
      leftSide = (
        <Link to="/">
          <img src={leftImg} alt="back-button" className="back-button" />
        </Link>
      );
      rightSide = (
        <img
          className="filter-button"
          src={rightImg}
          alt="user-info"
          onClick={() => Toggle('Filter')}
        />
      );
      break;
    case "manager":
      leftSide = null;
      rightSide = (
        <Link to="/">
          <img src={rightImg} alt="back-button" />
        </Link>
      );
      break;
    default:
  }

  const content = (
    <header className="main-header">
      {leftSide}
      <h1>{titleText}</h1>
      {rightSide}
    </header>
  );

  return content;
};

export default Header;
