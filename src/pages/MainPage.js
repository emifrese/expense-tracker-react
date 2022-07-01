import React, { useState } from "react";

import Header from "../components/UI/Header";
import NavBar from "../components/UI/NavBar";
import { useSelector } from "react-redux";
import Balance from "../components/Balance/Balance";

import cardImg from "../assets/id-insignia.svg";
import Modal from "../components/UI/Modal";
import PersonCard from "../components/Person/PersonCard";
import TransactionsList from "../components/Transaction/TransactionsList";

const MainPage = () => {
  const [fixedCart, setFixedCart] = useState(false);
  const expenses = useSelector((state) => state.expense.expenses);
  const displayName = useSelector((state) => state.user.displayName);
  const photoURL = useSelector((state) => state.user.photoURL);
  const creationTime = useSelector((state) => state.user.creationTime);
  const email = useSelector((state) => state.user.email);
  const [homemates] = useSelector((state) => state.user.homemates);

  const toggleFixedCartHandler = () => {
    setFixedCart((state) => !state);
  };

  return (
    <>
      {fixedCart && (
        <Modal Toggle={toggleFixedCartHandler}>
          <PersonCard
            onClose={toggleFixedCartHandler}
            name={displayName}
            photoURL={photoURL}
            email={email}
            creationTime={creationTime}
            homemates={homemates}
          />
        </Modal>
      )}
      <Header
        type="main"
        titleText={displayName}
        leftImg={photoURL}
        rightImg={cardImg}
        Toggle={toggleFixedCartHandler}
      />
      <Balance />
      <TransactionsList section="main" type="expense" expenses={expenses} />
      <NavBar />
    </>
  );
};

export default MainPage;
