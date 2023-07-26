import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Navbar from "../../components/NavBar/NavBar";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

import { ProgressBar } from "react-bootstrap";
import apiServices from "../../services/apiServices";

export default function DashBoardPage() {
  const [trackingData, setTrackingData] = useState([]);

  // const contextData = JSON.parse(useContext(AppContext));

  const contextData = useContext(AppContext)
  // const token = contextData.token

  const [storedContextData, setStoredContextData] = useState(
    JSON.parse(localStorage.getItem("userData")) ||
    contextData
  );
  const token = storedContextData.token;

  // const contextData = useContext(AppContext);
  console.log("testToken", token);

  const userDataPrivilege = "sender";

  JSON.parse(localStorage.getItem("contextData"))


  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 30000); // Reload every 30 seconds (0.5 minutes)

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  useEffect(() => {
    // const userData = localStorage.getItem("userData");
    // const userDataJS = JSON.parse(userData);

    const TRACKING_URL =
      "https://city-courier-webservices.onrender.com/api/tracking";

    const fetchTrackingData = async () => {
      try {


        console.log("contextUserData from apiServices", contextData);

        // const response = await apiServices.fetchData(TRACKING_URL);
        const response = await apiServices.fetchDataById(
          TRACKING_URL,
          storedContextData.id,
          token
        );

        console.log("test Tracking data from Dashboard", response);

        setTrackingData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrackingData();
  }, [storedContextData, token]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setStoredContextData(storedUserData);
    }
  }, []);





  return (
    <>
      <Navbar userDataPrivilege={userDataPrivilege} />
      <h1 style={{ color: "black", marginTop: "150px" }}> </h1>

      <MDBTable>
        <MDBTableHead light>
          <tr>
            <th scope="col">PARCEL NO</th>
            <th scope="col">PARCEL CONTENT</th>
            <th scope="col">RECEIVER ADRESS</th>
            <th scope="col">STATUS</th>
            <th scope="col">DATE</th>

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
            trackingData?.map((item) => {
              console.log("item", item);
              return (
                <tr key={item.id}>
                  <th scope="row">
                    <h4>{item.id}</h4>
                  </th>
                  <td>{item.parcel_content}</td>
                  <td>{item.receiver_adress}</td>
                  <td>
                    <ProgressBar
                      now={
                        item.parcel_status == "Picked Up"
                          ? 50
                          : item.parcel_status == "Deliveried"
                            ? 100
                            : 0
                      }
                      label={item.parcel_status}
                      variant={
                        item.parcel_status == "Picked Up"
                          ? "info"
                          : item.parcel_status == "succeDeliveriedss"
                            ? "success"
                            : 0
                      }
                      style={{
                        fontSize: "16px",
                        color: "blue !important",
                      }}
                    />
                  </td>
                  <td>
                    {item.parcel_status == "Picked Up"
                      ? item.picked_up_time
                      : item.parcel_status == "Deliveried"
                        ? item.delivery_time
                        : "Pending"}
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
