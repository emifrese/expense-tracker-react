import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

import jobImg from "../../assets/maletin.svg";
import editImg from "../../assets/editar.svg";

import { useState } from "react";
import Person from "./Person";
import Modal from "../UI/Modal";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./PersonManager.module.css";

const PersonManager = () => {
  const [modalContent, setModalContent] = useState([false, ""]);
  const [homemates] = useSelector((state) => state.user.homemates);
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);  const homematesDisplay = [];
=======
  const [currentMate, setCurrentMate] = useState(null);
  const [loading, setLoading] = useState(true);
  const homematesDisplay = [];
>>>>>>> 4284581a16a057c25b016405566567a9a0de77cb

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const toggleFixedCartHandler = (element, editMate) => {
    let modalElement;

    switch (element) {
      case "Edit":
        modalElement = (
          <Person
            onClose={toggleFixedCartHandler}
            type={"edit"}
            editMate={editMate}
          />
        );
        break;
      default:
    }

    setModalContent((state) => [!state[0], modalElement]);
  };

  if (homemates.length === 0) {
    return <div>No homemates</div>;
  }

  for (const [i, mate] of homemates.entries()) {
    const jobsList = [];

    mate.jobs.forEach((job, i) => {
      if (i < mate.jobs.length - 1) {
        jobsList.push(job.value + ",  ");
      } else {
        jobsList.push(job.value);
      }
    });
    homematesDisplay.push(
      <li key={crypto.randomUUID()} id={mate.id} className={classes.cardContainer}>
        <div className={classes.logoContainer}>
          <p className={classes.nameLogo}>{mate.person.slice(0, 1)}</p>
        </div>
        <div className={classes.cardInfoContainer}>
          <h2>{mate.person}</h2>
          <div className={classes.jobsContainer}>
            {jobsList.map((job, i) =>
              i + 1 < jobsList.length ? (
                <Fragment key={crypto.randomUUID()}>
                  <p>{job}</p>
                  <div className={classes.vl}></div>
                </Fragment>
              ) : (
                <p key={crypto.randomUUID()}>{job}</p>
              )
            )}
          </div>
          <div className={classes.buttonsContainer}>
            <button
              onClick={() => {
                toggleFixedCartHandler("Edit", mate);
              }}
            >
              Editar
            </button>
            <button>Deshabilitar</button>
          </div>
        </div>
      </li>
    );
  }

  console.log(homemates)

  return (
    <>
      {modalContent[0] && (
        <Modal Toggle={toggleFixedCartHandler}>{modalContent[1]}</Modal>
      )}
      <div>
        <p>Selecciona la persona</p>
        <div>
          {homemates.map((mate) => (
<<<<<<< HEAD
            <button id={mate.id} onCLick={() => {}}>
=======
            <button key={crypto.randomUUID()} id={mate.id} onClick={() => setCurrentMate(mate.id)}>
>>>>>>> 4284581a16a057c25b016405566567a9a0de77cb
              {mate.person}
            </button>
          ))}
        </div>
      </div>
      <div className={classes.personManagerControl}>
        {currentMate !== null && <ul>{homematesDisplay.filter(mate => mate.props.id === currentMate)}</ul>}
      </div>
    </>
  );
};

export default PersonManager;
