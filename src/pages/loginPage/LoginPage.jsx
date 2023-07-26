import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import apiServices from "../../services/apiServices";

// const LOGIN_URL = "https://city-courier-webservices.onrender.com/api/users";

const LoginPage = ({ parentCallBack }) => {
  const initialValues = { user_name: "", password: "" };
  const [values, handleChange,
    //  resetForm
  ] = useForm(initialValues);

  const [isSender, setisSender] = useState(true);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  // const [userLogdIn, setUserLogedIn] = useState(false);

  const navigate = useNavigate();

  const handleRedirect = (path, userData) => {
    console.log("userData from LoginPage:", userData);

    navigate(path, { state: userData });
  };

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  window.history.pushState(null, document.title, window.location.href);
  window.addEventListener("popstate", function (event) {
    window.history.pushState(null, document.title, window.location.href);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // isSender ? handleRedirect('/DashBoardPage') : handleRedirect('/ToDoPage')

    try {
      const response = await apiServices.authUser(values);
      const userPrivileges = await response?.data?.privilege;

      setTimeout(() => { console.log("TestuserResposefromLoginPage", response) }, 1000)
      parentCallBack(response.data)


      // (async (response) => {

      if (parseInt(response?.data?.id) < 1) {
        setErrMsg("Login Failed");
      } else if (
        parseInt(response?.data?.id) > 0 &&
        response.data.status == "active"
      ) {
        const userData = {
          id: response?.data?.id,
          privilege: userPrivileges,
          adress: response?.data?.adress,
          user_name: response?.data?.user_name,
          user_mail: response?.data?.user_mail,
          token: response?.data?.token,
          userLogedIn: true,
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        handleRedirect(
          userPrivileges == "sender" ? "/DashBoardPage" : "/ToDoPage",
          userData
        );
        console.log("sender test passed");

        console.log(
          "userData item was set in the browser storage ...",
          localStorage
        );
      } else {
        setErrMsg("Login Failed");
      }
      // });

      const accessToken = response?.data?.token;
      const userId = response?.data?.id;
      console.log(accessToken);
      // const userPrivileges = await response.data.privilege;
      console.log("userPriviliedges : ", JSON.stringify(userPrivileges));
    } catch (err) {
      console.log(err);
    }
  };

  return (


   
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f5f5f5",
        flexDirection: "column",
      }}

      
    >

<div style={{marginBottom:"20px"}} >Sender user Name : mark.schmidt   password : test</div> 
    <div style={{marginBottom:"20px"}} >Biker user Name : timo.schulz    password : test </div>
    <div style={{marginBottom:"20px"}} >Biker user Name : lina.becker    password : test </div> 



      <form
        onSubmit={handleSubmit}
        style={{
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
          background: "white",
        }}
      >
        <h1>Login</h1>
        <br></br>
        <input
          type="text"
          name="user_name"
          placeholder="User Name"
          value={values.user_name}
          onChange={handleChange}
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "300px",
            minWidth: "200px",
            marginRight: "20px",
            marginLeft: "20px",
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "300px",
            marginRight: "20px",
            marginLeft: "20px",
          }}
          required
        />
        <button
          type="submit"
          style={{
            borderRadius: "10px",
            marginTop: "20px",
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
