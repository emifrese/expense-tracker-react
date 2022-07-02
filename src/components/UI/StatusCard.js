import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { auth, firestore } from "../../firebase";

import "./StatusCard.css";

const StatusCard = ({ id, status, Toggle }) => {
  const changeStatus = async () => {
    await setDoc(
      doc(firestore, `users/${auth.currentUser.uid}/expense/${id}`),
      {
        payed: !status,
      },
      { merge: true }
    );
    Toggle();
  };

  return (
    <div>
      <p>
        Do you really want to change the status to{" "}
        {status ? "not payed" : "payed"}?
      </p>
      <button onClick={() => changeStatus()}>Yes</button>
      <button onClick={() => Toggle()}>No</button>
    </div>
  );
};

export default StatusCard;
