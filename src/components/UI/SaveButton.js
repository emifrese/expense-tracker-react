import React from "react";

import classes from "./SaveButton.module.css";

const SaveButton = () => {
  return (
    <div className={classes.saveButton}>
      <button type="submit">Save</button>
    </div>
  );
};

export default SaveButton;
