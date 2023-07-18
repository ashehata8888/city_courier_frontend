import React from "react";
import Navbar from "../../components/NavBar/NavBar";

export default function CreateNewRequestPage() {
  const createFormContent = [
    {
      label: "Sender Name",
      type: "text",
      name: "Sender Name",
      labelClassName:
        "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
      inputClassName:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
    {
      label: "Sender Phone",
      type: "text",
      name: "Sender Phone",
      labelClassName:
        "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
      inputClassName:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
    {
      label: "Sender Adress",
      type: "text",
      name: "Sender Adress",
      labelClassName:
        "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
      inputClassName:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
    {
      label: "Receiver Name",
      type: "text",
      name: "Receiver Name",
      labelClassName:
        "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
      inputClassName:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
    {
      label: "Receiver Adress",
      type: "text",
      name: "Receiver Adress",
      labelClassName:
        "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
      inputClassName:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
    {
      label: "Parcel Quantity",
      type: "text",
      name: "Parcel Quantity",
      labelClassName:
        "block mb-2 text-sm font-medium text-gray-900 dark: text-white",
      inputClassName:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
    {
      label: "Parcel Content",
      type: "text",
      name: "Parcel Content",
      labelClassName:
        "block mb-2 text-sm font-medium text-gray-900 dark: text-white",
      inputClassName:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
    {
      label: "Parcel Wight",
      type: "text",
      name: "Parcel Wight",
      labelClassName:
        "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
      inputClassName:
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
  ];

  const userDataPrivilege = "sender";

  return (
    <>
      <Navbar userDataPrivilege={userDataPrivilege} />
      <h1 className="text-gray-500"> Create New Request Page</h1>
      <form>
        {createFormContent.map((input) => (
          <div key={input.name} className="mb-12">
            <label htmlFor={input.name} className={input.labelClassName}>{input.label}</label>
            <input type={input.type} name={input.name} id={input.name} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        ))}
        <button type="submit" className="className="bg-blue-500 text-white px-4 py-2 rounded-lg>Submit</button>
      </form>
    </>
  );
}
