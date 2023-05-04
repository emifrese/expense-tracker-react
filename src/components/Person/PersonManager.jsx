import React, { useEffect } from "react";
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
  const [loading, setLoading] = useState(true);

  const homematesDisplay = [];

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

  if (typeof homemates === "undefined") {
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
      <li key={i}>
        <div className={classes.nameContainer}>
          <p className={classes.nameLogo}>{mate.person.slice(0,1)}</p>
          <p>{mate.person}</p>
        </div>
        <div className={classes.jobsContainer}>
          Jobs: {jobsList}
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
      </li>
    );
  }

  return (
    <>
      {modalContent[0] && (
        <Modal Toggle={toggleFixedCartHandler}>{modalContent[1]}</Modal>
      )}
      <div className={classes.personManagerControl}>
        <ul>{homematesDisplay}</ul>
      </div>
    </>
  );
};

export default PersonManager;
