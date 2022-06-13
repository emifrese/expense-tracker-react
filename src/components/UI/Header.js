import React from "react";

import "./Header.css";

const Header = (props) => {

  const content =
    props.type === "main" ? (
      <figure className="user-info">
        <img src={props.photoURL} alt="user-profile" />
        <figcaption>{props.name}</figcaption>
        <img className="card-tag" src={props.cardImg} alt='user-info' onClick={() => props.Toggle()}/>
      </figure>
    ) : (
      <p>Empty</p>
    );

  return content;
};

export default Header;
