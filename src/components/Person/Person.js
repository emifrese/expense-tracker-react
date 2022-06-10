import React, { useState } from "react";

import userImg from "../../assets/usuario.svg";
import jobImg from "../../assets/maletin.svg";
import addImg from "../../assets/add.svg";
import SaveButton from "../UI/SaveButton";

import "./Person.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { useDispatch } from "react-redux";

const Person = ({onClose}) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredJob, setEnteredJob] = useState("");
  const [addedJob, setAddedJob] = useState([]);
  
  console.log(addedJob);
  let jobsPending = [];

  if (addedJob.length >= 1) {
    for (const job of addedJob) {
      const jobItem = (
        <button
          value={job.value}
          onClick={(e) => removeJob(job.id)}
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

  console.log(jobsPending);

  const submitHandler = async (e) => {
    e.preventDefault();

    const personData = {
        person: enteredName,
        personId: Math.random().toString(16).slice(2),
        jobs: addedJob
    }

    const personRef = collection(
        firestore,
        `users/${auth.currentUser.uid}/homemates`
    );
    await addDoc(personRef, personData);

    

    setEnteredName("")
    setEnteredJob("")
    setAddedJob([])
    onClose();
  };
  return (
    <>
      <h2>New Homemate</h2>
      <form onSubmit={submitHandler}>
        <div className="person__controls">
          <div className="person__control">
            <img src={userImg} alt="name" />
            <input
              type="text"
              placeholder="Name"
              value={enteredName}
              onChange={(e) =>
                setEnteredName(e.target.value)
              }
            />
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
