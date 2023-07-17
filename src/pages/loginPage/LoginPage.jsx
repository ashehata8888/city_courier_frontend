import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import apiServices from "../../services/apiServices";

const LOGIN_URL = "http://localhost:7000/api/users/authenticate";

const LoginPage = () => {
  const initialValues = { userName: "", password: "" };
  const [values, handleChange, resetForm] = useForm(initialValues);

  const [isSender, setisSender] = useState(true);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [userLogdIn, setUserLogedIn] = useState(false);

  const navigate = useNavigate();

  const handleRedirect = (path, _data) => {
    navigate(path, _data);
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
      await apiServices.sendRequest(LOGIN_URL, values).then(async (response) => {
        const res = await response.json();
        try {
          const accessToken = res.data.token;
          const userId = res.data.id;
          console.log(accessToken);
          const userPrivileges = res.data.privileges;
          console.log("userPriviliedges : ", userPrivileges);
        } catch (err) {
          console.log(err);
        }

     
        if (!response) {
          setErrMsg("There is No Response from the Server");
        } else if (response.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (response.status === 401) {
          setErrMsg(res.message);
          alert(res.message);
        } else if (response.status === 200 && res.data.states === "active") {
          const userData = {
            id: res.data.id,
            privilege: res.data.privilege,
            address: res.data.address,
            user_mail: res.data.user_mail,
            token: res.data.token,
            userLogedIn: true,
          };
          switch (res.data.privilege) {
            case "sender":
              navigate("/DashBoardPage", {
                state: userData,
                replace: true,
              });
              setUserLogedIn(true);
              localStorage.setItem("userData", JSON.stringify(userData));
              break;
            case "biker":
              navigate("/ToDoPage", {
                state: userData,
                replace: true,
              });
              setUserLogedIn(true);
              localStorage.setItem("userData", JSON.stringify(userData));
              break;
            default:
              navigate("/", { replace: true });
          }

          console.log(
            "userData item was set in the browser storage ...",
            localStorage
          );
          const useridStorage = localStorage.getItem("userData");
        } else {
          setErrMsg("Login Failed");
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      resetForm();
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
          name="userName"
          placeholder="User Name"
          value={values.userName}
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
