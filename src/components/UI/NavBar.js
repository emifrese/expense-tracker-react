import React from "react";

import config from "../../assets/aplicaciones.svg";
import stats from "../../assets/estadisticas.svg";
import { Link } from "react-router-dom";

import classes from './NavBar.module.css'

const NavBar = () => {
  return (
    <footer className={classes.navbar}>
      <div className={classes.navbarAdd}>
        <Link to="/add">
          <button className={classes.navBarAddButton}>+</button>
        </Link>
      </div>
      <div className={classes.navbarButtons}>
        <Link to="/user">
          <img src={config} alt="config" />
        </Link>
        <Link to="/stats">
          <img src={stats} alt="stats" />
        </Link>
      </div>
    </footer>
  );
};

export default NavBar;
