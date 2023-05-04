import React from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";

const Header = ({ leftImg, titleText, rightImg, Toggle, type }) => {
  const firstName = titleText.split(' ')[0]
  let leftSide = (
    // <img src={leftImg} alt="user-profile" className={classes.userProfileImg} />
    <h1>Hola {firstName}</h1>
  );
  let rightSide = (
    <div className={classes.profileImgContainer}>
      <img src={rightImg} alt="user-info" onClick={() => Toggle("Person")} />
    </div>
  );

  switch (type) {
    case "main":
      break;
    case "stats":
      leftSide = (
        <Link to="/" className={classes.profileImgContainer}>
          <img src={leftImg} alt="back-button" />
        </Link>
      );
      rightSide = (
        <img src={rightImg} alt="user-info" onClick={() => Toggle("Filter")} />
      );
      break;
    case "manager":
      leftSide = null;
      rightSide = (
        <Link to="/" className={classes.profileImgContainer}>
          <img src={rightImg} alt="back-button" />
        </Link>
      );
      break;
    default:
  }

  const content = (
    <header className={classes.mainHeader}>
      {leftSide}
      {rightSide}
    </header>
  );

  return content;
};

export default Header;
