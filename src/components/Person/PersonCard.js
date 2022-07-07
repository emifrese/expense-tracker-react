import React from "react";

import "./PersonCard.css";
import userImg from "../../assets/usuario.svg";
import emailImg from "../../assets/sobre.svg";
import creationImg from "../../assets/tiempo-trimestrepasado.svg";
import Sign from "../UI/Sign";
import { useSelector } from "react-redux";

const PersonCard = (props) => {
  const displayName = useSelector((state) => state.user.displayName);
  const photoURL = useSelector((state) => state.user.photoURL);
  const creationTime = useSelector((state) => state.user.creationTime);
  const email = useSelector((state) => state.user.email);

  return (
    <div className="personcard__control">
      {/* <h2>PersonCard</h2> */}
      <figure>
        <img src={photoURL} alt="profile" className="personcardProfile" />
      </figure>
      <ul>
        <li>
          <img src={userImg} alt="user" />
          {displayName}
        </li>
        <li>
          <img src={emailImg} alt="email" />
          {email}
        </li>
        <li className="personcard__control_mateslist">
          <img src={creationImg} alt="creation-time" />
          {creationTime.slice(0, 16)}
        </li>
      </ul>
      <Sign type={"out"} />
    </div>
  );
};

export default PersonCard;
