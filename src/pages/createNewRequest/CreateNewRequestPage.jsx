import React from 'react'
import Navbar from '../../components/NavBar/NavBar'


export default function CreateNewRequestPage (){


const userDataPrivilege="sender"

    return (
        <>
        <Navbar userDataPrivilege={userDataPrivilege} />
        <h1 style={{color:"black"}}> Create New Request Page</h1>
        </>
      
    )

}