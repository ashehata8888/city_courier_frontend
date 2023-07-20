import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import Navbar from "../../components/NavBar/NavBar";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

import { ProgressBar } from "react-bootstrap";
import apiServices from "../../services/apiServices";

export default function DashBoardPage() {
  const [trackingData, setTrackingData] = useState([]);
  const contextData = useContext(AppContext);
  console.log(contextData);

  const userDataPrivilege = "sender";

 
  useEffect(() => {
    const TRACKING_URL = "http://localhost:7000/api/tracking";

    const fetchTrackingData = async () => {
      try {
        const response = await apiServices.fetchData(TRACKING_URL);
        console.log("test Tracking data from Dashboard", response);

        setTrackingData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrackingData();
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
            <th scope="col">STATUS</th>
            <th scope="col">DATE</th>

            {/* <th scope='col'>Handle</th> */}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {console.log("trackingDataTest", trackingData)}
          {trackingData.length === 0 ? (
  <tr>
    <td colSpan="4">Loading...</td>
  </tr>
) : (trackingData.map((item) => {
            console.log("item",item)
            return (
            
                <tr key={item.id}>
                  <th scope="row" style={{color:"red"}}><h3>{item.id}</h3></th>
                  <td>{item.parcel_content}</td>
                  <td>
                    <ProgressBar
                      now={50}
                      label={item.parcel_status}
                      variant="completed"
                    />
                  </td>
                  <td>{item.picked_up_time}</td>
                </tr>
           
            );
          }))}
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
