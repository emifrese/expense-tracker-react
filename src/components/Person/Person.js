import React, { useState } from "react";

import userImg from "../../assets/usuario.svg";
import jobImg from "../../assets/maletin.svg";
import addImg from "../../assets/add.svg";
import colourImg from "../../assets/llenar.svg";
import deleteImg from "../../assets/basura.svg";
import SaveButton from "../UI/SaveButton";

import { colors, colorStyles } from "../../helpers/variables";

import "./Person.css";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

const Person = ({ onClose, type, editMate }) => {
  const [enteredName, setEnteredName] = useState(editMate?.person || "");
  const [enteredJob, setEnteredJob] = useState("");
  const [addedJob, setAddedJob] = useState(editMate?.jobs || []);
  const [enteredColour, setEnteredColour] = useState(editMate?.colorId || "");

  let jobsPending = [];
  let coloursList = [];

  colors.forEach((colour, i) => {
    coloursList.push(
      <option value={i} key={i}>
        {colour}
      </option>
    );
  });

  if (addedJob.length >= 1) {
    for (const job of addedJob) {
      const jobItem = (
        <button
          value={job.value}
          onClick={() => removeJob(job.id)}
          key={job.id}
          id={job.id}
          className="person__control_job"
        >
          {job.value}
        </button>
      );
      jobsPending.push(jobItem);
    }
  }

  const removeJob = (jobToRemove) => {
    setAddedJob((state) => state.filter((job) => job.id !== jobToRemove));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const personData = {
      person: enteredName,
      jobs: addedJob,
      color: colorStyles[enteredColour],
      colorId: enteredColour,
    };

    if (type !== "edit") {
      const personRef = collection(
        firestore,
        `users/${auth.currentUser.uid}/homemates`
      );
      await addDoc(personRef, personData);
    } else {
      await setDoc(
        doc(
          firestore,
          `users/${auth.currentUser.uid}/homemates/${editMate.id}`
        ),
        personData
      );
    }

    setEnteredName("");
    setEnteredJob("");
    setAddedJob([]);
    onClose();
  };
  return (
    <>
      <h2>{type === "edit" ? "Edit" : "New"}{" "}Homemate</h2>
      <form onSubmit={submitHandler}>
        <div className="person__controls">
          <div className="person__control">
            <img src={colourImg} alt="color" />
            <select value={enteredColour} onChange={(e) => setEnteredColour(+e.target.value)}>
              <option value='select'>Select a colour</option>
              {coloursList}
            </select>
          </div>
          <div className="person__control">
            <img src={userImg} alt="name" />
            <input
              type="text"
              placeholder="Name"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
            {type === "edit" && (
              <img
                src={deleteImg}
                alt="delete-person"
                onClick={async () => {
                  await deleteDoc(
                    doc(
                      firestore,
                      `users/${auth.currentUser.uid}/homemates/${editMate.id}`
                    )
                  );
                  onClose();
                }}
              />
            )}
          </div>
          <div className="person__control">
            <img src={jobImg} alt="malet" />
            <input
              type="text"
              placeholder="Job"
              value={enteredJob}
              onChange={(e) => setEnteredJob(e.target.value)}
            />
            <img
              src={addImg}
              alt="add"
              onClick={() => {
                setAddedJob((state) => [
                  ...state,
                  {
                    value: enteredJob,
                    id: Math.random().toString(16).slice(2),
                  },
                ]);
                setEnteredJob("");
              }}
            />
          </div>
          <div className="person__control jobs">{jobsPending}</div>
        </div>
        <SaveButton />
      </form>
    </>
  );
};

export default Person;
