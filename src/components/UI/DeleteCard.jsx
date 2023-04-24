import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { auth, firestore } from "../../firebase";

import classes from './DeleteCards.module.css'

const DeleteCard = ({ id, type, Toggle }) => {
  const deleteTransaction = async () => {
    await deleteDoc(
      doc(firestore, `users/${auth.currentUser.uid}/${type}/${id}`)
    );
    Toggle()
  };

  return (
    <div className={classes.deleteCardContainer}>
      <p>Do you really want to delete that {type}?</p>
      <button className={classes.yesButton} onClick={() => deleteTransaction()}>Yes</button>
      <button className={classes.cancelButton} onClick={() => Toggle()}>No</button>
    </div>
  );
};

export default DeleteCard;
