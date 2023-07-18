import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import Navbar from "../../components/NavBar/NavBar";

export default function DashBoardPage() {
  const contextData = useContext(AppContext);
  console.log(contextData);

  const userDataPrivilege = "sender";

  return (
    <>
      <Navbar userDataPrivilege={userDataPrivilege} />
      <h1 style={{ color: "black" }}> DashBoardPage</h1>
      {/* <p>{userDataPrivilege}</p> */}
    </>
  );
}
