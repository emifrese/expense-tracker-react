import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import './Sign.css'

const Sign = ({ type }) => {
  let buttonContainerClass;
  let buttonFunction;
  let buttonText;

  switch (type) {
    case "in":
      buttonContainerClass = "signIn";
      buttonFunction = () => signInWithPopup(auth, new GoogleAuthProvider());
      buttonText = "Sign In With Google";
      break;
    case "out":
      buttonContainerClass = "signOut";
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
