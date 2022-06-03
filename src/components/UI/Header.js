import React from "react";
import { useSelector } from "react-redux";

import "./Header.css";

const Header = () => {
  const displayName = useSelector((state) => state.user.displayName);
  const photoURL = useSelector((state) => state.user.photoURL);
  return (
    <figure className="user-info">
      <img src={photoURL} alt="user-profile" />
      <figcaption>{displayName}</figcaption>
    </figure>
  );
};

export default Header;
