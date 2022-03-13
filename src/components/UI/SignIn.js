import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const SignIn = () => {
  const signInWithGoogle = () =>
    // signInWithPopup(auth, new GoogleAuthProvider());
    signInWithRedirect(auth, new GoogleAuthProvider());

  return (
    <main>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </main>
  );
};

export default SignIn;
