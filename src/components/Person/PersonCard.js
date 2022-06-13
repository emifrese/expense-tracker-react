import React from "react";

import "./PersonCard.css";
import userImg from "../../assets/usuario.svg";
import emailImg from "../../assets/sobre.svg";
import jobImg from "../../assets/maletin.svg";
import matesImg from "../../assets/usuarios-alt.svg";

const PersonCard = (props) => {
  const homematesDisplay = [];


  for (const [i, mate] of props.homemates.entries()) {
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
        {mate.person}
        <li>
          <img src={jobImg} alt="jobs" />
          Jobs: {jobsList}
        </li>
      </ul>
    );
  }

  return (
    <div className="personcard__control">
      <h2>PersonCard</h2>
      <ul>
        <li>
          <img src={userImg} alt="user" />
          {props.name}
        </li>
        <li>
          <img src={emailImg} alt="email" />
          {props.email}
        </li>
        <li className="personcard__control_mateslist">
          <img src={matesImg} alt="homemates" />
          {homematesDisplay}
        </li>
      </ul>
    </div>
  );
};

export default PersonCard;
