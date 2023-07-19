import React from 'react';
import Logo from '../../assets/images/logo.jpeg'


export default function Header(){
   return(
<header className="App-header" style={{position:"fixed",width:"100%",zIndex:"100",marginTop:"0px",top:"0"}}>

       <div className="logo">
        <img id='logo' src={Logo} alt="Logo of the devliery App it's contain of Delviery word and Car" />
        </div>

   <h1 className='appName'>City Courier</h1> 
 

  
    </header>
   ) 
}