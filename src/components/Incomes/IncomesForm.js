import { useState } from "react";
import { auth, firestore } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./IncomesForm.css";
import SaveButton from "../UI/SaveButton";

import typeImge from "../../assets/informacion.svg";
import addImg from "../../assets/add.svg";
import userImg from "../../assets/usuario.svg";
import jobImg from "../../assets/maletin.svg";
import Modal from "../UI/Modal";
import Person from "../Person/Person";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const actualDate = new Date();

const IncomesForm = (props) => {
  const [fixedCart, setFixedCart] = useState(false);
  const [enteredPerson, setEnteredPerson] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [enteredJob, setEnteredJob] = useState("");
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
    for (const mate of homemates) {
      selectPerson.push(
        <option value={mate.person} id={mate.id} key={mate.id}>
          {mate.person}
        </option>
      );
      if (enteredPerson === mate.person) {
        mate.jobs.forEach((job) =>
          jobOptions.push(
            <option value={job.value} id={job.id} key={job.id}>
              {job.value}
            </option>
          )
        );
      }
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    let personId = 1;
    if (enteredPerson === "Emiliano") {
      personId = 0;
    }
    const incomeData = {
      person: enteredPerson,
      personId,
      amount: enteredAmount,
      type: enteredType,
      job: enteredJob,
      month: actualDate.getMonth(),
      year: actualDate.getFullYear(),
    };

    const incomeRef = collection(
      firestore,
      `users/${auth.currentUser.uid}/income`
    );

    if(enteredAmount === ""){
      return alert('Enter an amount')
    }
    if(enteredPerson.trim() === ""){
      return alert('Enter a valid person')
    }
    if(enteredType === ""){
      return alert('Select a category')
    } else if(enteredType === "Job" && enteredJob === ""){
      return alert('Select a Job')
    }
    
    

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
        <div className="incomes__controls">
          <div className="incomes__control_amount">
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder={0}
              value={enteredAmount}
              onChange={(e) => {
                setEnteredAmount(parseFloat(e.target.value));
              }}
            />
          </div>
          <div className="incomes__control">
            <img src={userImg} alt="user" />
            <select
              onChange={(e) => setEnteredPerson(e.target.value)}
              value={enteredPerson.name}
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
          <div className="incomes__control">
            <img src={typeImge} alt="type" />
            <select onChange={(e) => setEnteredType(e.target.value)}>
              <option value="">Select a type </option>
              {typeOptions}
            </select>
          </div>
          <div className="incomes__control">
            <img src={jobImg} alt="job" />
            <select
              onChange={(e) => setEnteredJob(e.target.value)}
              disabled={enteredType !== "Job"}
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
