import { useState } from "react";
import { auth, firestore } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./IncomesForm.css";
import SaveButton from "../UI/SaveButton";

import titleImg from "../../assets/informacion.svg";
import Modal from "../UI/Modal";
import Person from "../Person/Person";
import { useSelector } from "react-redux";

const actualDate = new Date();

const IncomesForm = (props) => {
  const [fixedCart, setFixedCart] = useState(false);
  const [enteredPerson, setEnteredPerson] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [enteredWork, setEnteredWork] = useState("");
  const [homemates] = useSelector((state) => state.user.homemates);

  const toggleFixedCartHandler = () => {
    setFixedCart((state) => !state);
  };

  console.log(homemates)

  let selectPerson = [];
  let jobOptions = [];

  homemates.forEach( mate => {
    selectPerson.push(
      <option value={mate.person} id={mate.id} key={mate.id}>
        {mate.person}
      </option>
    );
    if(enteredPerson.id === mate.id)
    mate.jobs.forEach(job =>
        jobOptions.push(
          <option value={job.value} id={job.id} key={job.id}>
        {job.value}
      </option>
        )
      )
  }) 

  const submitHandler = async (e) => {
    e.preventDefault();
    let personId = 1;
    if (enteredPerson === "Emiliano") {
      personId = 0;
    }
    const incomeData = {
      person: enteredPerson[0],
      personId,
      amount: +enteredAmount,
      type: enteredType,
      work: enteredWork,
      month: actualDate.getMonth(),
      year: actualDate.getFullYear(),
    };

    const incomeRef = collection(
      firestore,
      `users/${auth.currentUser.uid}/income`
    );
    await addDoc(incomeRef, incomeData);

    setEnteredPerson("");
    setEnteredAmount("");
    setEnteredWork("");
    setEnteredType("");
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
              // value={enteredAmount}
              // onChange={amountChangeHandler}
            />
          </div>
          <div className="incomes__control">
            <img src={titleImg} alt="title" />
            <select
              onChange={(e) => setEnteredPerson({name: e.target.value, id: e.target.id})}
              value={enteredPerson}
            >
              <option value="">Select person</option>
              {selectPerson}
            </select>
            <img
              src={titleImg}
              alt="title"
              onClick={() => toggleFixedCartHandler()}
            />
          </div>
          <div className="incomes__control">
            <img src={titleImg} alt="title" />
            <input
              type="text"
              placeholder="Type"
              // value={enteredTitle}
              // onChange={titleChangeHandler}
            />
          </div>
          <div className="incomes__control">
            <img src={titleImg} alt="category" />
            <select
            // onChange={categoryChangeHandler}
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
