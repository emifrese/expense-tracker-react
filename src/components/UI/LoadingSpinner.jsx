import React from "react";

import classes from './LoadingSpinner.module.css'

const LoadingSpinner = () => {
  return (
    <div className={classes.spinner}>
      <div className={classes.doubleBounce1}></div>
      <div className={classes.doubleBounce2}></div>
    </div>
  );
};

export default LoadingSpinner;
