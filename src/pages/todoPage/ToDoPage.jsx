import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/NavBar/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import apiServices from "../../services/apiServices";
import useForm from "../../hooks/useForm";
import useInput from "../../hooks/useInput";
import InputWithButton from "../../components/InputWithButton/InputWithButton";
import AppContext from "../../context/AppContext";

export default function TodoPage() {
  const contextData = useContext(AppContext)

  const [storedContextData, setStoredContextData] = useState(
    JSON.parse(localStorage.getItem("userData")) ||
     contextData
  );
  const token = storedContextData.token;


  // const token = contextData.token

  const location = useLocation();
  // const [data, setData] = useState([]);
  const [trackingData, setTrackingData] = useState([]);
  // const [pickedUp, setPickedUp] = useState("");
  // const [delivery, setDelivery] = useState("");

  const [pickedUp, setPickedUp] = useState(trackingData.map(() => ""));
  const [delivery, setDelivery] = useState(trackingData.map(() => ""));

  const userDataPrivilege = "biker";

  const [inputValue, setInputValue] = useInput("");

  const initialValues = {
    picked_up_time: "",
    delivery_time: "",
  };

  const [values, handleChange, resetForm] = useForm(initialValues);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const userDataJS = JSON.parse(userData);

    const TRACKING_URL =
      "http://localhost:7000/api/tracking";

    const fetchTrackingData = async () => {
      try {
        // await apiServices.create(values)

        const response = await apiServices.fetchData(TRACKING_URL,token);

        console.log("test Tracking data from Dashboard", response);

        setTrackingData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrackingData();
  },[storedContextData, token]);



  const pickUpBtn = "Picked Up";
  const deliveriedBtn = "Deliveried";

  return (
    <>
      <Navbar userDataPrivilege={userDataPrivilege} />
      <h1 style={{ color: "black", marginTop: "150px" }}> </h1>

      <MDBTable>
        <MDBTableHead light>
          <tr>
            <th scope="col">PARCEL NO</th>
            <th scope="col">SENDER NAME</th>
            <th scope="col">SENDER PHONE</th>
            <th scope="col">SENDER ADRESS</th>
            <th scope="col">RECEIVER NAME</th>
            <th scope="col">RECEIVER PHONE</th>
            <th scope="col">RECEIVER ADRESS</th>
            <th scope="col">PARCEL Q.T</th>
            <th scope="col">PARCEL CONTENT</th>
            <th scope="col">PARCEL WIGHT</th>
            <th scope="col">PARCEL STATUS</th>
            <th scope="col">ACTION BY</th>
            <th scope="col">PICKED UP TIME</th>
            <th scope="col">DELIVERY TIME</th>

            {/* <th scope='col'>Handle</th> */}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {console.log("trackingDataTest", trackingData)}
          {trackingData?.length === 0 ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            trackingData?.map((item, index) => {
              console.log("item", item);
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.sender_name}</td>
                  <td>{item.sender_phone}</td>
                  <td>{item.sender_adress}</td>
                  <td>{item.receiver_name}</td>
                  <td>{item.receiver_phone}</td>
                  <td>{item.receiver_adress}</td>
                  <td>{item.parcel_qt}</td>
                  <td>{item.parcel_content}</td>
                  <td>{item.parcel_wight}</td>
                  <td>{item.parcel_status}</td>
                  <td>{item.action_by}</td>

                  <td>
                    <InputWithButton
                      trackingId={item.id}
                      btnName={pickUpBtn}
                      value={pickedUp[index]}
                      parcel_status={item.parcel_status}
                      onChange={(e) =>
                        setPickedUp((prevState) => {
                          const newState = [...prevState];
                          newState[index] = e.target.value;
                          return newState;
                        })
                      }
                    />
                  </td>

                  <td>
                    <InputWithButton
                      trackingId={item.id}
                      btnName={deliveriedBtn}
                      value={delivery[index]}
                      parcel_status={item.parcel_status}
                      onChange={(e) =>
                        setDelivery((prevState) => {
                          const newState = [...prevState];
                          newState[index] = e.target.value;
                          return newState;
                        })
                      }
                    />
                  </td>
                </tr>
              );
            })
          )}
        </MDBTableBody>
        {/* <tfoot>
        <tr>
          <td>Footer</td>
          <td>Footer</td>
          <td>Footer</td>
          <td>Footer</td>
        </tr>
      </tfoot> */}
      </MDBTable>
    </>
  );
}

// sender_name VARCHAR(40) NOT NULL,
// sender_phone VARCHAR(20) NOT NULL,
// sender_adress VARCHAR(200) NOT NULL,
// receiver_name VARCHAR(40) NOT NULL,
// receiver_phone VARCHAR(20) NOT NULL,
// receiver_adress VARCHAR(200) NOT NULL,
// parcel_qt  INTEGER NOT NULL,
// parcel_content VARCHAR(100),
// parcel_wight INTEGER,

// parcel_status VARCHAR (20) NOT NULL,
// action_by  VARCHAR(40) NOT NULL,
// picked_up_time VARCHAR(100),
// delivery_time VARCHAR(100),
// user_id REFERENCE
