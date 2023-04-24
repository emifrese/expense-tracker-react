import React from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import classes from './Sign.module.css'

const Sign = ({ type }) => {
  let buttonContainerClass;
  let buttonFunction;
  let buttonText;

  switch (type) {
    case "in":
      buttonContainerClass = classes.signIn;
      buttonFunction = () => signInWithPopup(auth, new GoogleAuthProvider());
      buttonText = "Sign In With Google";
      break;
    case "out":
      buttonContainerClass = classes.signOut;
      buttonFunction = () => auth.signOut();
      buttonText = "Sign Out";
      break;
    default:
  }

  return (
    <div className={buttonContainerClass}>
      <button onClick={buttonFunction}>{buttonText}</button>
    </div>
  );
};

export default Sign;
