import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { auth, firestore } from "../../firebase";

import classes from './StatusCard.module.css'

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
    <div className={classes.statusCardContainer}>
      <p>
        Do you really want to change the status to{" "}
        {status ? "not payed" : "payed"}?
      </p>
      <button className={classes.yesButton} onClick={() => changeStatus()}>Yes</button>
      <button className={classes.cancelButton} onClick={() => Toggle()}>No</button>
    </div>
  );
};

export default StatusCard;
