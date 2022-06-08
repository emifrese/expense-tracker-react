import React from "react";

import "./Header.css";

const Header = (props) => {

  console.log(props.photoURL)

  const content =
    props.type === "main" ? (
      <figure className="user-info">
        <img src={props.photoURL} alt="user-profile" />
        <figcaption>{props.name}</figcaption>
      </figure>
    ) : (
      <p>Empty</p>
    );

  return content;
};

export default Header;
