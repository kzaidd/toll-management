import React, { Fragment, useState, useEffect } from 'react'
import { getAllData } from './Helper';
import { VehicleTypes } from '../master-data';
import { Table, Form } from 'react-bootstrap';

const VehicleLogs = (props) => {
  const [ vehicleLogs, setVehicleLogs ] = useState([]);
  let collectionCreated = props.collectionCreated;

  const idb = props.idb
 


  useEffect(() => {
    if (collectionCreated !== false) {
        getAllData(idb, "toll-logs", "vehiclelogs", "readwrite")
      .then((res) => {
          if (res) {
          setVehicleLogs(res)
          console.log(res , "fd")
        } else {
          setVehicleLogs([])
          console.log(res , "empy")
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }

    console.log("props", collectionCreated)

  }, [collectionCreated])
  

  function searchVehicle(e) {
    const value = e.target.value
    let searchResults = vehicleLogs.filter(a => a.vehicleNumber == value.toLowerCase())
    if (searchResults.length > 0) {
      setVehicleLogs(searchResults)
    }
    
  }


  return (
    <Fragment>
      
      <div style={{paddingLeft: 100, paddingRight: 100, paddingTop:20, textAlign: "center"}}>
      <span><b>Toll Entries/ Vehicle Entries</b></span>
      <Form.Control
              type="text"
              placeholder="Search Vehicle"
              style={{width: "200px", marginBottom: "10px"}}
              onChange={(e) => searchVehicle(e)}
            />
        
        <Table bordered>
          <thead>
            <tr>
              <th>Vehicle Type</th>
              <th>Vehicle Number</th>
              <th>Date Time</th>
              <th>Toll Name</th>
              <th>Tariff</th>
            </tr>
          </thead>
          <tbody>
              {vehicleLogs.map((veh) => (
                <tr key={veh.id}>
                  <td>{VehicleTypes.find(a => a.value === veh.vehicleType).label}</td>
                  <td>{veh.vehicleNumber.toUpperCase()}</td>
                  <td>{new Date(veh.createdDate).toString()}</td>
                  <td>{veh.tollName}</td>
                  <td>{veh.fare}</td>
                </tr>
              ))}
          </tbody>
        </Table> 
      </div>
    </Fragment>
   
  )
}

export default VehicleLogs