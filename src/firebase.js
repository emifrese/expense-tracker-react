import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCfxURC8FADTqRn_S6ICL5th04vETZtWN8",
  authDomain: "expense-tracker-react-6e5a7.firebaseapp.com",
  projectId: "expense-tracker-react-6e5a7",
  storageBucket: "expense-tracker-react-6e5a7.appspot.com",
  messagingSenderId: "281020493167",
  appId: "1:281020493167:web:62c4c71daab456d4564c9a",
});

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export default firebaseApp;