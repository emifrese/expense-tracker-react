import React from "react";
import TransactionsList from "../components/Expenses/TransactionsList";
import Header from "../components/UI/Header";
import NavBar from "../components/UI/NavBar";
import Incomes from "../components/Incomes/Incomes";
import { useSelector } from "react-redux";
import Balance from "../components/Balance/Balance";

const MainPage = () => {
  const displayName = useSelector((state) => state.user.displayName);
  const photoURL = useSelector((state) => state.user.photoURL);

  return (
    <>
      <Header type='main' name={displayName} photoURL={photoURL}/>
      <Balance />
      <TransactionsList />
      <NavBar />
    </>
  );
};

export default MainPage;
