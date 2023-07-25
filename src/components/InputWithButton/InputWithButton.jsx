import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import useInput from "../../hooks/useInput";
import apiServices from "../../services/apiServices";

function InputWithButton({
  btnName,
  value,
  onChange,
  trackingId,
  parcel_status,
}) {

  const contextData = useContext(AppContext)

  const [storedContextData, setStoredContextData] = useState(
    JSON.parse(localStorage.getItem("userData")) ||
     contextData
  );
  const token = storedContextData.token;



  const [inputValue, setInputValue] = useInput("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log();



  const userData = localStorage.getItem("userData");
  const userDataJS = JSON.parse(userData);

  useEffect(() => {
    if (parcel_status == "Picked Up" && btnName == "Picked Up") {
      setIsSubmitted(true);
    } else if (parcel_status == "Deliveried") {
      setIsSubmitted(true);
    }
  }, []);

  const handlePatchData = async () => {
    const TRACKING_URL =
      btnName == "Picked Up"
        ? "http://localhost:7000/api/tracking/pickedup"
        : btnName == "Deliveried"
          ? "http://localhost:7000/api/tracking/deliveried"
          : null;
    // const modifiedData = {btnName == "Picked Up" ? "http://localhost:7000/api/tracking/picked" : btnName == "Deliveried" ? "http://localhost:7000/api/tracking/delivery" : null

    // }
    console.log("testuserDataJS.user_name", storedContextData.user_name);
    setIsSubmitted(true);

    const modifiedData =
      btnName == "Picked Up"
        ? {
          id: trackingId,
          picked_up_time: value,
          parcel_status: "Picked Up",
          action_by: storedContextData.user_name,
        }
        : btnName == "Deliveried"
          ? {
            id: trackingId,
            delivery_time: value,
            parcel_status: "Deliveried",
            action_by: storedContextData.user_name,
          }
          : null;

    try {
      await apiServices.update(TRACKING_URL, trackingId, modifiedData,token);
    } catch (error) {
      console.error(error);
    }

    // Replace this function with your logic to make the POST request using 'inputValue'
    console.log("Post data:", inputValue);
  };

  return (
    <div>
      <input
        disabled={isSubmitted}
        className="mb-2 mr-2 rounded"
        style={{ maxWidth: "170px" }}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={ !isSubmitted ? "Enter date and Time" : " Done"}
      />
      <button
        disabled={isSubmitted}
        className="btn btn-info rounde"
        onClick={handlePatchData}
      >
        {btnName}
      </button>
    </div>
  );
}

export default InputWithButton;
