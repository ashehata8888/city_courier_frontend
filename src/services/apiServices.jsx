import AppContext from "../context/AppContext";
import React, { useContext, useEffect } from "react";

const API_URL =
  "https://city-courier-webservices.onrender.com/api/users/authenticate";
const TRACKING_URL =
  "https://city-courier-webservices.onrender.com/api/tracking";

// export function FunctionComp() {

// const contextData = JSON.parse(useContext(AppContext));
//   const contextData = useContext(AppContext)

//   console.log("apiServicesContextData ", contextData)


//   return <><div>test</div></>
// }






function createRequestOptionsJWT(method, body, token) {

  return {
    method,
    headers: new Headers({
      Authorization: "bearer " + token,
      "Content-Type": "application/json",
    }),
    withCredentials: true,
    body: JSON.stringify(body),
  };
}

function fetchOptionsWithoutBody(method, token) {
  return {
    method,
    headers: new Headers({
      Authorization: "bearer " + token,
      "Content-Type": "application/json",
    }),
    withCredentials: true,
  };
}

async function sendRequest(url, options) {

  const response = await fetch(url, options);
  return await response.json();
}

// const userData = localStorage.getItem("userData");
// const userDataJS = JSON.parse(userData);

// console.log("contextUserData from apiServices", userDataJS.token);

function createRequestOptions(method, body) {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    body: JSON.stringify(body),
  };
}

//  "Content-Type": "application/x-www-form-urlencoded",

async function fetchData(url, token) {
  const options = fetchOptionsWithoutBody("GET", token);
  return await sendRequest(url, options);
}

async function authUser(userCredentials) {
  const options = createRequestOptions("POST", userCredentials);
  return await sendRequest(API_URL, options);
}

async function create(user, token) {
  const options = createRequestOptionsJWT("POST", user, token);
  return await sendRequest(TRACKING_URL, options);
}

async function update(API_URL, userId, body, token) {
  const options = createRequestOptionsJWT("PATCH", body, token);
  return await sendRequest(`${API_URL}/${userId}`, options);
}

async function deleteAny(userId, API_URL, token) {
  const options = createRequestOptionsJWT("DELETE", token);
  await sendRequest(`${API_URL}/${userId}`, options);
}

async function fetchDataById(API_URL, userId, token) {
  // console.log("testContextfromApiServices",contextData)
  const options = fetchOptionsWithoutBody("GET", token);

  return await sendRequest(`${API_URL}/${userId}`, options);
}

export default {
  fetchData,
  fetchDataById,
  create,
  update,
  deleteAny,
  authUser,
};
