import React, { useContext,useState,useEffect } from 'react';
import AppContext from '../context/AppContext';
import Header from '../components/Header/Header';
import Navbar from '../components/NavBar/NavBar';


function Layout({ children , handleLogout  }) {
 
  const contextData = JSON.parse(useContext(AppContext));
    console.log("contextDatafromLayout",contextData)

    const contextUserData = localStorage.getItem("userData");

    console.log("contextUserData from layout",contextUserData)
    const currentURL = window.location.href;
    console.log("current URL : ",currentURL)
    
  const [currUrl,setCurr]=useState(false)

    useEffect(
      ()=>{ 
       console.log("contextData.userLogedIn",contextData?.userLogedIn)
       console.log("currnet url inclode DashBoardPage ",currentURL.includes('DashBoardPage'))
      
       if((currentURL.includes('DashBoardPage') || currentURL.includes('ToDoPage')) && currentURL != "http://localhost:3000/"){
        setCurr(true)
       } else{
        setCurr(false)
       }
      
      }
        )

        // contextData?.userLogedIn,currentURL



  return (
   <>
      <header>
       <Header/>
      {/* { contextData?.userLogedIn && contextUserData != null &&  currUrl   ?  <Navbar handleLogout={handleLogout}/> : null} */}
      </header>
      <main>
        {children}
      </main>
      <footer>
        {/* Footer content */}
      </footer>
   </>
    
  );
}

export default Layout;