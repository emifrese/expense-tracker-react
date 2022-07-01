import React from "react";

import "./PersonCard.css";
import userImg from "../../assets/usuario.svg";
import emailImg from "../../assets/sobre.svg";
import creationImg from "../../assets/tiempo-trimestrepasado.svg";
import Sign from "../UI/Sign";

const PersonCard = (props) => {

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
          {/* <img src={matesImg} alt="homemates" />
          {homematesDisplay} */}
          <img src={creationImg} alt="creation-time" />
          {props.creationTime.slice(0,16)}
        </li>
      </ul>
      <Sign type={'out'}/>
    </div>
  );
};

export default PersonCard;
