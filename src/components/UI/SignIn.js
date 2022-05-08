import { auth } from "../../firebase";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const signInWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  return (
    <main>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </main>
  );
};

export default SignIn;
