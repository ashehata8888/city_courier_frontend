import React from "react";
import Navbar from "../../components/NavBar/NavBar";
import { useNavigate, useLocation } from "react-router-dom";

export default function TodoPage() {
  const location = useLocation();

  const userDataPrivilege = "biker";

  return (
    <>
      <Navbar userDataPrivilege={userDataPrivilege} />
      <h1 style={{ color: "black" }}> TodoPage</h1>
    </>
  );
}
