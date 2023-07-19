import React, {useEffect, useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const Navbar = ({handleLogout,userDataPrivilege}) => {
  const contextData = JSON.parse(useContext(AppContext));

  const [showNavbar, setShowNavbar] = useState(false);
  const [isSender, setIsSender] = useState(true);
  const [value ,setValue] = useState(true)


  useEffect(
()=>{
 
  if (userDataPrivilege == "sender") {
    setIsSender(true);
    setShowNavbar(true);
  } else if (userDataPrivilege == "biker") {
    setIsSender(false);
    setShowNavbar(true);
  }
},[userDataPrivilege]
  )



 

  const handleShowNavbar = () => {

  };

  return (
    <nav className="navbar" style={{position:"fixed",width:"100%",zIndex:"100",marginTop:"0px",top:"60px"}}>
      <div className="container">
        <div className="menu-icon" onClick={handleShowNavbar}></div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          {userDataPrivilege == "sender" ? (
            <ul>
              <li>
                <NavLink to="/DashBoardPage" active={value.toString()}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/CreateNewRequestPage">Create New Request</NavLink>
              </li>
              <li>
                <NavLink to="/">Logout</NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink to="/ToDoPage" active={value.toString()}>Parcels To Do List</NavLink>
              </li>

              <li>
                <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
