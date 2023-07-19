import React from "react";
import Navbar from "../../components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreateNewRequestPage() {
  const createFormContent = [
    {
      label: "Sender Name",
      type: "text",
      name: "Sender Name",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Sender Phone",
      type: "text",
      name: "Sender Phone",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Sender Adress",
      type: "text",
      name: "Sender Adress",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Receiver Name",
      type: "text",
      name: "Receiver Name",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Receiver Adress",
      type: "text",
      name: "Receiver Adress",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Parcel Quantity",
      type: "text",
      name: "Parcel Quantity",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Parcel Content",
      type: "text",
      name: "Parcel Content",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
    {
      label: "Parcel Wight",
      type: "text",
      name: "Parcel Wight",
      labelClassName: "input-group-text mb-3 rounded",
      inputClassName: " mb-3 mr-2 rounded ",
    },
  ];

  const userDataPrivilege = "sender";

  return (
    <>
      <Navbar userDataPrivilege={userDataPrivilege} />
      <h1 className="text-gray-500 m-4"> Create New Request Page</h1>
      <div className="d-flex justify-content-center input-group-text" style={{maxWidth:"100vh", margin: "auto"}}>
        <form className="input-group m-3">
          {createFormContent.map((input) => (
            <div key={input.name} className="input-group mb-3 w-50 ml-3">
              <label htmlFor={input.name} className={input.labelClassName}>
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                className={input.inputClassName}
              />
              <br></br>
            </div>
          ))}
          <button type="submit" className="btn btn-light rounded" style={{backgroundColor:"#fef7e5"}}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
