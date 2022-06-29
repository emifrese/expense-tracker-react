import React from "react";
import { useSelector } from "react-redux";

import jobImg from "../../assets/maletin.svg";
import userImg from "../../assets/usuario.svg";
import editImg from "../../assets/editar.svg";

import "./PersonManager.css";
import { useState } from "react";
import Person from "./Person";
import Modal from "../UI/Modal";

const PersonManager = () => {
  const [fixedCart, setFixedCart] = useState(false);
  const [homemates] = useSelector((state) => state.user.homemates);

  const [editMate, setEditMate] = useState("");

  const homematesDisplay = [];

  const toggleFixedCartHandler = () => {
    setFixedCart((state) => !state);
  };
  console.log(typeof homemates)
  if(typeof homemates === 'undefined'){
    return <p>Loading</p>;
  }
  console.log(homemates?.length)
  for (const [i, mate] of homemates.entries()) {
    const jobsList = [];

    console.log(i);
    console.log(mate);

    mate.jobs.forEach((job, i) => {
      if (i < mate.jobs.length - 1) {
        jobsList.push(job.value + ",  ");
      } else {
        jobsList.push(job.value);
      }
    });
    homematesDisplay.push(
      <ul key={i}>
        <figure>
          <figcaption>{mate.person}</figcaption>
          <img
            src={editImg}
            alt="edit-person"
            onClick={() => {
              setEditMate(mate);
              toggleFixedCartHandler();
            }}
          />
        </figure>
        <li>
          <img src={jobImg} alt="jobs" />
          Jobs: {jobsList}
        </li>
      </ul>
    );
  }

  return (
    <>
      {fixedCart && (
        <Modal Toggle={toggleFixedCartHandler}>
          <Person
            onClose={toggleFixedCartHandler}
            type={"edit"}
            editMate={editMate}
          />
        </Modal>
      )}
      <div className="personmanager__control">{homematesDisplay}</div>
    </>
  );
};

export default PersonManager;
