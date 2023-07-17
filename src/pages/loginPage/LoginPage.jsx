import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import apiServices from "../../services/apiServices";

const LOGIN_URL = "http://localhost:7000/api/users";

const LoginPage = () => {
  const initialValues = { user_name: "", password: "" };
  const [values, handleChange, resetForm] = useForm(initialValues);

  const [isSender, setisSender] = useState(true);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [userLogdIn, setUserLogedIn] = useState(false);

  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
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
      const response =  await apiServices.authUser(values)
      const userPrivileges = await response.data.privilege;

      console.log("response are ",response)
      
      // (async (response) => {

  
      if (response.data.id > 0) {
        setErrMsg("There is No response from the Server");
      } else if (response.status === 400) {
        setErrMsg("Missing User name or Password");
      } else if (response.status === 401) {
        setErrMsg(response.message);
        alert(response.message);
      }  else if (response.status == 200 && response.data.states == "active" && JSON.stringify(userPrivileges) == "sender") {
            
            // const userData = {
            //   id: response.data.id,
            //   privilege: userPrivileges,
            //   addresponses: response.data.addresponses,
            //   user_mail: response.data.user_mail,
            //   token: response.data.token,
            //   userLogedIn: true,
            // };
            handleRedirect("/DashBoardPage")
            console.log("sender test passed")
  
            // switch (userPrivileges) {
            //   case "sender":
            //     handleRedirect("/DashBoardPage")
            //     // navigate("/DashBoardPage", {
            //     //   state: userData,
            //     //   replace: true,
            //     // });
            //     setUserLogedIn(true);
            //     localStorage.setItem("userData", JSON.stringify(userData));
            //     break;
            //   case "biker":
            //     handleRedirect("/ToDoPage")
            //     // navigate("/ToDoPage", {
            //     //   state: userData,
            //     //   replace: true,
            //     // });
            //     setUserLogedIn(true);
            //     localStorage.setItem("userData", JSON.stringify(userData));
            //     break;
            //   default:
            //     navigate("/", { replace: true });
            // }
  
            console.log(
              "userData item was set in the browser storage ...",
              localStorage
            );
            const useridStorage = localStorage.getItem("userData");
          } else {
            setErrMsg("Login Failed");
          }
        // });


         
          const accessToken = response.data.token;
          const userId = response.data.id;
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
        height: "89vh",
        background: "#f5f5f5",
        flexDirection: "column",
      }}
    >
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
