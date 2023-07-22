import AppContext from "../context/AppContext";
import React, { useContext } from "react";

const API_URL =
  "https://city-courier-webservices.onrender.com/api/users/authenticate";
const TRACKING_URL =
  "https://city-courier-webservices.onrender.com/api/tracking";

function createRequestOptionsJWT(method, body) {
  return {
    method,
    headers: new Headers({
      Authorization: "bearer " + userDataJS.token,
      "Content-Type": "application/json",
    }),
    withCredentials: true,
    mode: 'no-cors',
    body: JSON.stringify(body),
  };
}

function fetchOptionsWithoutBody(method) {
  return {
    method,
    headers: new Headers({
      Authorization: "bearer " + userDataJS.token,
      "Content-Type": "application/json",
    }),
    withCredentials: true,
    mode: 'no-cors'
  };
}

async function sendRequest(url, options) {
  const response = await fetch(url, options);
  return await response.json();
}

const userData = localStorage.getItem("userData");
const userDataJS = JSON.parse(userData);

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

async function fetchData(url) {
  const options = fetchOptionsWithoutBody("GET");
  return await sendRequest(url, options);
}

async function authUser(userCredentials) {
  const options = createRequestOptions("POST", userCredentials);
  return await sendRequest(API_URL, options);
}

async function create(user) {
  const options = createRequestOptionsJWT("POST", user);
  return await sendRequest(TRACKING_URL, options);
}

async function update(API_URL, userId, body) {
  const options = createRequestOptionsJWT("PATCH", body);
  return await sendRequest(`${API_URL}/${userId}`, options);
}

async function deleteAny(userId, API_URL) {
  const options = createRequestOptionsJWT("DELETE");
  await sendRequest(`${API_URL}/${userId}`, options);
}

async function fetchDataById(API_URL, userId) {
  const options = fetchOptionsWithoutBody("GET");
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
