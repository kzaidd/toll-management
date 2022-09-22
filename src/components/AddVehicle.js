import React, { Fragment, useState, useEffect } from 'react'
import { Form, Modal, Row, Col, Button } from 'react-bootstrap'
import { VehicleTypes } from '../master-data'
import { getAllData, isLessTha24HoursAge, ObjectId } from './Helper'

const AddVehicle = (props) => {
    const [ vehicleType, setVehicleType ] = useState(0) 
    const [ vehicleNumber, setVehicleNumber ] = useState("") 
    const [ tollFare, setTollFare ] = useState(0);
    const [ tolls, setTollData ] = useState([])
    const [ selectedLocation, setSelectedLocation ] = useState("");


    const idb = props.idb
    var dbPromise;

    if (idb) {
        dbPromise = idb.open("toll-logs", 1);
    }

  const selectVehicleType = (event) => {
    const value = event.target.value;
    setVehicleType(parseInt(value))
    console.log(value)
  }

  
  const handleSubmit = () => {
    const dbPromise = idb.open("toll-logs", 1);

    dbPromise.onsuccess = () => {
      const adb = dbPromise.result;
      const tx = adb.transaction("vehiclelogs", 'readwrite')
      const vehicleData = tx.objectStore("vehiclelogs")

      const data = vehicleData.put({
        id: ObjectId(),
        createdDate : new Date().toISOString(),
        tollName: selectedLocation,
        vehicleType: parseInt(vehicleType),
        vehicleNumber: vehicleNumber,
        fare: tollFare
      });

      data.onsuccess = () => {
        tx.oncomplete = () => {
            adb.close();
            alert("vehicle added")
        }

        props.handleModal("vehicleModal", false)

    };

    // window.location.reload() 
    data.onerror = () => {
        alert("error occured")
      }
    }
  };

  useEffect(() => {
      getAllData(idb, "toll-logs", "tollrates", "readwrite")
      .then((resp) => {
        if (resp) {
          let tollAsPerLocations = []

          resp.forEach(element => {
            if (element) {
              tollAsPerLocations.push(element)
            }
          });
          setTollData(tollAsPerLocations)

          console.log("locations", tollAsPerLocations)
        }
      })
  }, [])
  

  


  function handleVehicleNumber (e) {
    setVehicleNumber(e.target.value)

      if (tolls.length > 0) {
        tolls.forEach((i) => {
        
            i.tollRates.forEach((a) => {
              if (a.vehicleType === vehicleType) {
                let createdDate = new Date(i.createdDate);

                let timestamp = createdDate.getTime();
                
                let hrs = isLessTha24HoursAge(timestamp)
                if (hrs) {
                  setTollFare(a.return)
                } else {
                  setTollFare(a.single)
                }
              }
            })
        })
      }
  }

  function handleLocation (e) {
    const value = e.target.value
    const id = e.target.id
    setSelectedLocation(value)
  }


  return (
    <Fragment>
      <Modal
        show={true}
        onHide={() => props.handleModal("vehicleModal", false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Add New Entry
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Row>
                <Col>
                <Form.Select className='form-control' onChange={(e) => handleLocation(e)}>
                {tolls ? 
                  tolls.map((toll) => {
                    return (
                      <option 
                                defaultValue="" 
                                // disabled={a.disabled} 
                                key={toll.id} 
                                value={toll.tollName}
                            >
                                {toll.tollName}
                            </option>
                    )
                  })
                : null}
                </Form.Select>
                </Col>
              </Row>
            </Form.Group>


            <Form.Group className='mb-3'>
              <Row>
                <Col>
                <label>Select Vehicle Type*</label>
                  <Form.Select className='form-control' onChange={(e) => selectVehicleType(e)} selected={0}>
                      {VehicleTypes.map((a) => {
                          return (
                              <option 
                                  defaultValue={vehicleType} 
                                  disabled={a.disabled} 
                                  key={a.value} 
                                  value={a.value}
                              >
                                  {a.label}
                              </option>
                          )   
                      })}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Row>
                <Col>
                  <Form.Label>Enter Vehicle Number*</Form.Label>
                  <Form.Control
                  type="text"
                  placeholder="Enter your login id"
                  onChange={(e) => handleVehicleNumber(e)} 
                />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Row>
                <Col>
                  <Form.Label>Tariff*</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Tariff amount"
                      value={`${tollFare}`}
                      disabled 
                  />
                </Col>
              </Row>
            </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Add Entry
              </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>

  )
}


export default AddVehicle