import React from 'react';
import Header from './Header/Header';
import Navbar from './NavBar/NavBar';
import {useState} from "react"

function Layout({ children }) {
    const [userLogdIn,setUserLogedIn]=useState(true)
  return (
    <div>
      <header>
       <Header/>
      { userLogdIn ?  <Navbar/> : null}
      </header>
      <main>
        {children}
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default Layout;