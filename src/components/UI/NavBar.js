import React from "react";

import "./NavBar.css";
import config from "../../assets/aplicaciones.svg";
import stats from "../../assets/estadisticas.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <footer className="navbar">
      <div className="navbar__add">
        <Link to='/add'>
          <button>+</button>
        </Link>
      </div>
      <div className="navbar__buttons">
        <img src={config} alt="config" />
        <img src={stats} alt="stats" />
      </div>
    </footer>
  );
};

export default NavBar;
