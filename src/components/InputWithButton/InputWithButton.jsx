import React, { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import apiServices from "../../services/apiServices";

function InputWithButton({
  btnName,
  value,
  onChange,
  trackingId,
  parcel_status,
}) {
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
        ? "https://city-courier-webservices.onrender.com/api/tracking/pickedup"
        : btnName == "Deliveried"
        ? "https://city-courier-webservices.onrender.com/api/tracking/deliveried"
        : null;
    // const modifiedData = {btnName == "Picked Up" ? "https://city-courier-webservices.onrender.com/api/tracking/picked" : btnName == "Deliveried" ? "https://city-courier-webservices.onrender.com/api/tracking/delivery" : null

    // }
    console.log("testuserDataJS.user_name", userDataJS.user_name);
    setIsSubmitted(true);

    const modifiedData =
      btnName == "Picked Up"
        ? {
            id: trackingId,
            picked_up_time: value,
            parcel_status: "Picked Up",
            action_by: userDataJS.user_name,
          }
        : btnName == "Deliveried"
        ? {
            id: trackingId,
            delivery_time: value,
            parcel_status: "Deliveried",
            action_by: userDataJS.user_name,
          }
        : null;

    try {
      await apiServices.update(TRACKING_URL, trackingId, modifiedData);
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
        placeholder="Enter date and Time"
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
