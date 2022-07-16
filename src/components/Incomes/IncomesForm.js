import { useState } from "react";
import { auth, firestore } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { actualDate } from "../../helpers/variables";

import SaveButton from "../UI/SaveButton";

import typeImge from "../../assets/informacion.svg";
import addImg from "../../assets/add.svg";
import userImg from "../../assets/usuario.svg";
import jobImg from "../../assets/maletin.svg";
import Modal from "../UI/Modal";
import Person from "../Person/Person";

import classes from "./IncomesForm.module.css";

const IncomesForm = (props) => {
  const [fixedCart, setFixedCart] = useState(false);
  const [enteredPerson, setEnteredPerson] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [enteredJob, setEnteredJob] = useState("");
  const [validation, setValidation] = useState([]);
  const [homemates] = useSelector((state) => state.user.homemates);
  const navigate = useNavigate();

  const toggleFixedCartHandler = () => {
    setFixedCart((state) => !state);
  };

  let selectPerson = [];
  let jobOptions = [];
  let typeOptions = [];

  const types = ["Job", "Gift/Present", "Debt"];

  for (const [i, type] of types.entries()) {
    typeOptions.push(
      <option value={type} id={i} key={i}>
        {type}
      </option>
    );
  }

  if (homemates?.length !== undefined) {
    for (const [i, mate] of homemates.entries()) {
      selectPerson.push(
        <option value={i} id={mate.id} key={mate.id}>
          {mate.person}
        </option>
      );
      if (
        enteredPerson !== "" &&
        homemates[enteredPerson].person === mate.person
      ) {
        jobOptions = mate.jobs.map((job, i) => (
          <option value={job.value} id={job.id} key={job.id}>
            {job.value}
          </option>
        ));
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const incomeRef = collection(
      firestore,
      `users/${auth.currentUser.uid}/income`
    );

    let error = false;
    if (enteredAmount === "") {
      setValidation((state) => {
        if (!state.includes("amount")) {
          return [...state, "amount"];
        }
        return state;
      });
      error = true;
    }
    if (enteredPerson.trim() === "") {
      setValidation((state) => {
        if (!state.includes("person")) {
          return [...state, "person"];
        }
        return state;
      });
      error = true;
    }
    if (enteredType === "") {
      setValidation((state) => {
        if (!state.includes("type")) {
          return [...state, "type"];
        }
        return state;
      });
      error = true;
    } else if (enteredType === "Job" && enteredJob === "") {
      setValidation((state) => {
        if (!state.includes("job")) {
          return [...state, "job"];
        }
        return state;
      });
      error = true;
    }

    if (error === true) {
      return;
    }
    const incomeData = {
      person: homemates[enteredPerson].person,
      colors: homemates[enteredPerson].color,
      amount: enteredAmount,
      type: enteredType,
      job: enteredJob,
      month: actualDate.getMonth(),
      year: actualDate.getFullYear(),
    };

    await addDoc(incomeRef, incomeData);

    setEnteredPerson("");
    setEnteredAmount("");
    setEnteredJob("");
    setEnteredType("");
    navigate("../", { replace: true });
  };

  return (
    <>
      {fixedCart && (
        <Modal Toggle={toggleFixedCartHandler}>
          <Person onClose={toggleFixedCartHandler} />
        </Modal>
      )}
      <form onSubmit={submitHandler}>
        <div className={classes.incomesControls}>
          <div className={classes.incomesControlAmount}>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder={0}
              value={enteredAmount}
              onChange={(e) => {
                if (e.target.value === "") {
                  setEnteredAmount("");
                } else {
                  setEnteredAmount(parseFloat(e.target.value));
                }
              }}
              style={
                validation.includes("amount")
                  ? { boxShadow: "0px 0px 5px 3px rgba(255,0,0,0.75)" }
                  : { boxShadow: "none" }
              }
              onBlur={() => {
                if (enteredAmount !== "" && enteredAmount !== 0) {
                  setValidation((state) =>
                    state.filter((el) => el !== "amount")
                  );
                }
              }}
            />
          </div>
          <div className={classes.incomesControl}>
            <img src={userImg} alt="user" />
            <select
              onChange={(e) => setEnteredPerson(e.target.value)}
              value={enteredPerson.name}
              style={
                validation.includes("person")
                  ? { boxShadow: "0px 0px 5px 3px rgba(255,0,0,0.75)" }
                  : { boxShadow: "none" }
              }
              onBlur={() => {
                if (enteredPerson !== "") {
                  setValidation((state) =>
                    state.filter((el) => el !== "person")
                  );
                }
              }}
            >
              <option value="">Select person</option>
              {selectPerson}
            </select>
            <img
              src={addImg}
              alt="title"
              onClick={() => toggleFixedCartHandler()}
            />
          </div>
          <div className={classes.incomesControl}>
            <img src={typeImge} alt="type" />
            <select
              onChange={(e) => setEnteredType(e.target.value)}
              style={
                validation.includes("type")
                  ? { boxShadow: "0px 0px 5px 3px rgba(255,0,0,0.75)" }
                  : { boxShadow: "none" }
              }
              onBlur={() => {
                if (enteredType !== "") {
                  setValidation((state) => state.filter((el) => el !== "type"));
                }
              }}
            >
              <option value="">Select a type </option>
              {typeOptions}
            </select>
          </div>
          <div className={classes.incomesControl}>
            <img src={jobImg} alt="job" />
            <select
              onChange={(e) => setEnteredJob(e.target.value)}
              disabled={enteredType !== "Job"}
              style={
                validation.includes("job")
                  ? { boxShadow: "0px 0px 5px 3px rgba(255,0,0,0.75)" }
                  : { boxShadow: "none" }
              }
              onBlur={() => {
                if (enteredJob !== "") {
                  setValidation((state) => state.filter((el) => el !== "job"));
                }
              }}
            >
              <option value="">Select a Job</option>
              {jobOptions}
            </select>
          </div>
        </div>
        <SaveButton />
      </form>
    </>
  );
};

export default IncomesForm;
