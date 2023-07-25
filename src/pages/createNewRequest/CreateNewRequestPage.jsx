import React, { useContext,useState,useEffect } from 'react';
import Navbar from "../../components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import useForm from "../../hooks/useForm";
import apiServices from "../../services/apiServices";

import AppContext from '../../context/AppContext';

export default function CreateNewRequestPage() {

  const contextData = useContext(AppContext)
  console.log("testcontextDataCreateNewReq",contextData)
  // const token = contextData.token


  const [storedContextData, setStoredContextData] = useState(
    JSON.parse(localStorage.getItem("userData")) ||
     contextData
  );
  const token = storedContextData.token;


  const createFormContent = [
    {
      label: "Sender Name",
      type: "text",
      name: "sender_name",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Sender Phone",
      type: "text",
      name: "sender_phone",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Sender Adress",
      type: "text",
      name: "sender_adress",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Receiver Name",
      type: "text",
      name: "receiver_name",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Receiver Phone",
      type: "text",
      name: "receiver_phone",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Receiver Adress",
      type: "text",
      name: "receiver_adress",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Parcel Quantity",
      type: "number",
      name: "parcel_qt",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Parcel Content",
      type: "text",
      name: "parcel_content",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Parcel Wight",
      type: "number",
      name: "parcel_wight",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
  ];

  const userDataPrivilege = "sender";
  const userData = localStorage.getItem("userData");
  const userDataJS = JSON.parse(userData);

  console.log("testUserId", userDataJS.id);
  const initialValues = {
    sender_name: "",
    sender_phone: "",
    sender_adress: "",
    receiver_name: "",
    receiver_adress: "",
    receiver_phone: "",
    parcel_qt: 0,
    parcel_content: "",
    parcel_wight: 0,
    parcel_status: "pending",
    action_by: "pending",
    user_id: userDataJS.id,
  };

  const valuesHard = {
    sender_name: "Mansor",
    Sender_Phone: "01254889965",
    Sender_Adress: "Cairo",
    Receiver_Name: "Ibrahim",
    Receiver_Adress: "Giza",
    Parcel_Quantity: 2,
    Parcel_Content: "somethings",
    Parcel_Wight: 5,
    parcel_status: "pending",
    action_by: "pending",
  };

  const TRACKING_URL =
    "http://localhost:7000/api/tracking";

  const [values, handleChange, resetForm] = useForm(initialValues);

  const handelSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("testValues", values);

      // await apiServices.create(values);
      const createNewRequest = await apiServices.create(values,token);
           console.log("test new Request : ",createNewRequest)
      //  resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar userDataPrivilege={userDataPrivilege} />
      {/* <h1 className="text-gray-500 m-4" style={{marginBottom:"2%"}}> Create New Request Page</h1> */}
      <div
        className="d-flex justify-content-center input-group-text"
        style={{
          maxWidth: "90vh",
          margin: "auto",
          paddingLeft: "2.2rem",
          marginTop: "10%",
        }}
      >
        <form
          className="input-group m-2"
          style={{ margin: "auto" }}
          onSubmit={handelSubmit}
        >
          {createFormContent.map((input) => (
            <div key={input.name} className="input-group mb-3 w-50">
              <label htmlFor={input.name} className={input.labelClassName}>
                {input.label}
              </label>
              <input
                required
                type={input.type}
                name={input.name}
                id={input.name}
                className={input.inputClassName}
                value={
                  input.name == "sender_name"
                    ? values.sender_name
                    : input.name == "sender_phone"
                      ? values.sender_phone
                      : input.name == "sender_adress"
                        ? values.sender_adress
                        : input.name == "receiver_name"
                          ? values.receiver_name
                          : input.name == "receiver_phone"
                            ? values.receiver_phone
                            : input.name == "receiver_adress"
                              ? values.receiver_adress
                              : input.name == "parcel_qt"
                                ? values.parcel_qt
                                : input.name == "parcel_content"
                                  ? values.parcel_content
                                  : input.name == "parcel_wight"
                                    ? values.parcel_wight
                                    : null
                }
                onChange={handleChange}
              />
              <br></br>
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-light rounded"
            style={{
              backgroundColor: "#fef7e5",
              height: "40px",
              marginTop: "9%",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
