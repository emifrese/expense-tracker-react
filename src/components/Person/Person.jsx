import React, { useState } from "react";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

import userImg from "../../assets/usuario.svg";
import jobImg from "../../assets/maletin.svg";
import addImg from "../../assets/add.svg";
import colourImg from "../../assets/llenar.svg";
import deleteImg from "../../assets/basura.svg";
import SaveButton from "../UI/SaveButton";

import { colors, colorStyles } from "../../helpers/variables";

import classes from "./Person.module.css";

const Person = ({ onClose, type, editMate }) => {
  const [enteredName, setEnteredName] = useState(editMate?.person || "");
  const [enteredJob, setEnteredJob] = useState("");
  const [addedJob, setAddedJob] = useState(editMate?.jobs || []);
  const [enteredColour, setEnteredColour] = useState(editMate?.colorId || -1);
  const [validation, setValidation] = useState([]);

  let jobsPending = [];
  

  const coloursList = colors.map((colour, i) => 
    <option value={i} key={i}>
      {colour}
    </option>
  )

  if (addedJob.length >= 1) {
    for (const job of addedJob) {
      const jobItem = (
        <button
          value={job.value}
          onClick={() => removeJob(job.id)}
          key={job.id}
          id={job.id}
          className={classes.personControlJob}
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

    let error = false;

    if(enteredName === ''){
      setValidation(state => {
        if(!state.includes('name')) {
          return [...state, 'name']
        }
        return state;
      })
      error = true;
    }

    if(addedJob.length < 1){
      setValidation(state => {
        if(!state.includes('job')){
          return [...state, 'job']
        }
        return state
      })
      error = true;
    }

    if(enteredColour === -1){
      setValidation(state => {
        if(!state.includes('color')){
          return [...state, 'color']
        }
        return state
      })
      error = true
    }

    if(error === true) {
      return;
    }


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
      <h2>{type === "edit" ? "Edit" : "New"} Homemate</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.personControls}>
          <div className={classes.personControl}>
            <img src={colourImg} alt="color" />
            <select
              value={enteredColour}
              onChange={(e) => setEnteredColour(+e.target.value)}
              style={
                validation.includes("color")
                  ? { boxShadow: "0px 0px 5px 3px rgba(255,0,0,0.75)" }
                  : { boxShadow: "none" }
              }
              onBlur={() => {
                if (enteredColour !== -1) {
                  setValidation((state) => state.filter((el) => el !== "color"));
                }
              }}
            >
              <option value="-1">Select a colour</option>
              {coloursList}
            </select>
          </div>
          <div className={classes.personControl}>
            <img src={userImg} alt="name" />
            <input
              type="text"
              placeholder="Name"
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              style={
                validation.includes("name")
                  ? { boxShadow: "0px 0px 5px 3px rgba(255,0,0,0.75)" }
                  : { boxShadow: "none" }
              }
              onBlur={() => {
                if (enteredName !== "") {
                  setValidation((state) =>
                    state.filter((el) => el !== "name")
                  );
                }
              }}
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
          <div className={classes.personControl}>
            <img src={jobImg} alt="malet" />
            <input
              type="text"
              placeholder="Job"
              value={enteredJob}
              onChange={(e) => setEnteredJob(e.target.value)}
              style={
                validation.includes("job")
                  ? { boxShadow: "0px 0px 5px 3px rgba(255,0,0,0.75)" }
                  : { boxShadow: "none" }
              }
              onBlur={() => {
                if (enteredJob !== "") {
                  setValidation((state) =>
                    state.filter((el) => el !== "job")
                  );
                }
              }}
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
          <div className={classes.personControl} style={{ flexWrap: "wrap" }}>
            {jobsPending}
          </div>
        </div>
        <SaveButton />
      </form>
    </>
  );
};

export default Person;
