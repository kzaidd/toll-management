import React, { Fragment, useState, useEffect } from 'react'
import AddToll from './AddToll';
import AddVehicle from './AddVehicle';
import TollList from './TollList';
import { Link } from 'react-router-dom';
import VehicleLogs from './VehicleLogs';
import { getAllData } from './Helper';
import { VehicleTypes } from '../master-data';
import { Button, Form, Row, Col } from 'react-bootstrap';

const Home = (props) => {
  const [ vehicleModal, setVehicleModal ] = useState(false);
  const [ tollModal, setTollModal ] = useState(false);
  const [ showVehicleLogsPage, setVehicleLogsPage ] = useState(false);
  const idb = props.idb
  const collectionCreated = props.collectionCreated;
  let dataFromChild = null;

  function handleLogsPage (value) {
      setVehicleLogsPage(value)
  }
  

  function getVehicleLogsFromChild (data) {
    if (data) {
      console.log("data", data)
      dataFromChild = data
    }
  }

  
  function handleModal (from, value) {
    if (from === "vehicleModal") {
      setVehicleModal(value)
    } else if (from === "tollModal") {
      setTollModal(value)
    }
   
  }

  return (
    <Fragment>
      <div style={{paddingLeft: 100, paddingRight: 100, paddingTop: 30}}>
          <h4>Toll Management Application</h4>
          <div className='d-flex'>
            <Button variant="primary" style={{width: "150px", margin: "10px"}} onClick = {() => setVehicleModal(!vehicleModal)}>Add Vehicle</Button>
          <Button variant="primary" style={{width: "150px", margin: "10px"}} onClick = {() => setTollModal(!tollModal)}>Add new toll</Button>

          <Link to={showVehicleLogsPage ? "/tolls" : "/"}> 
                <Button variant="primary" style={{width: "200px", margin: "10px"}}  onClick={() => handleLogsPage(!showVehicleLogsPage)}>
                  {showVehicleLogsPage ? "View all toll" : "Back to vehicle logs"}</Button>
            </Link>
          </div>
        </div>

         {vehicleModal ? 
          <AddVehicle idb={idb} updateParent={getVehicleLogsFromChild} collectionCreated={collectionCreated} handleModal={handleModal}/> 
        : null}

        {tollModal ? 
            <AddToll idb={idb} showModal={tollModal} handleModal={handleModal}/> 
        : null} 

    </Fragment>
  )
}

export default Home