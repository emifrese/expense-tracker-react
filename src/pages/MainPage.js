import React, { useState } from "react";

import Header from "../components/UI/Header";
import NavBar from "../components/UI/NavBar";
import { useSelector } from "react-redux";
import Balance from "../components/Balance/Balance";

import cardImg from "../assets/id-insignia.svg";
import Modal from "../components/UI/Modal";
import PersonCard from "../components/Person/PersonCard";
import TransactionsList from "../components/Transaction/TransactionsList";
import DeleteCard from "../components/UI/DeleteCard";

const MainPage = () => {
  const [modalCart, setModalCart] = useState([false, ""]);
  const expenses = useSelector((state) => state.expense.expenses);
  const displayName = useSelector((state) => state.user.displayName);
  const photoURL = useSelector((state) => state.user.photoURL);
  const creationTime = useSelector((state) => state.user.creationTime);
  const email = useSelector((state) => state.user.email);
  const [homemates] = useSelector((state) => state.user.homemates);

  const toggleModalCartHandler = (element, id, type) => {
    let modalElement;

    switch (element) {
      case "Person":
        modalElement = (
          <PersonCard
            onClose={toggleModalCartHandler}
            name={displayName}
            photoURL={photoURL}
            email={email}
            creationTime={creationTime}
            homemates={homemates}
          />
        );
        break;
      case "Delete":
        modalElement = (
          <DeleteCard id={id} type={type} Toggle={toggleModalCartHandler} />
        );
        break;
      default:
    }

    setModalCart((state) => [!state[0], modalElement]);
  };

  return (
    <>
      {modalCart[0] && (
        <Modal Toggle={toggleModalCartHandler}>{modalCart[1]}</Modal>
      )}
      <Header
        type="main"
        titleText={displayName}
        leftImg={photoURL}
        rightImg={cardImg}
        Toggle={toggleModalCartHandler}
      />
      <Balance />
      <TransactionsList
        section="main"
        type="expense"
        expenses={expenses}
        Toggle={toggleModalCartHandler}
      />
      <NavBar />
    </>
  );
};

export default MainPage;
