import {useState} from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'


const Navbar = () => {

    const [showNavbar, setShowNavbar] = useState(false)
  
    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar)
    }

  return (
    <nav className="navbar">
      <div className="container">
     
        <div className="menu-icon" onClick={handleShowNavbar}>
          
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          
          <ul>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/createNewRequest">Create New Request</NavLink>
            </li>
            <li>
              <NavLink to="/to-do">Parcels To Do List</NavLink>
            </li>
        
            <li>
              <NavLink to="/">Logout</NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar