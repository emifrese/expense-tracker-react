import React from "react";
import { useSelector } from "react-redux";

import jobImg from "../../assets/maletin.svg";
import editImg from "../../assets/editar.svg";

import "./PersonManager.css";
import { useState } from "react";
import Person from "./Person";
import Modal from "../UI/Modal";

const PersonManager = () => {
  const [modalContent, setModalContent] = useState([false, ""]);
  const [homemates] = useSelector((state) => state.user.homemates);

  const homematesDisplay = [];
  

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
    return <p>Loading</p>;
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
      <ul key={i}>
        <figure>
          <figcaption>{mate.person}</figcaption>
          <img
            src={editImg}
            alt="edit-person"
            onClick={() => {
              toggleFixedCartHandler("Edit", mate);
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
      {modalContent[0] && (
        <Modal Toggle={toggleFixedCartHandler}>{modalContent[1]}</Modal>
      )}
      <div className="personmanager__control">{homematesDisplay}</div>
    </>
  );
};

export default PersonManager;
