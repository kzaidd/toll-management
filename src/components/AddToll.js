import React, {Fragment, useEffect, useState} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { VehicleTypes } from '../master-data'
import { getAllData, ObjectId } from './Helper'



const AddToll = (props) => {
    const [ tollName, setTollName ] = useState("")
    const [ vehicleTollA, setTollRateA ] = useState({vehicleType: 0, single: 0, return: 0});
    const [ vehicleTollB, setTollRateB ] = useState({vehicleType: 0, single: 0, return: 0});
    const [ vehicleTollC, setTollRateC ] = useState({vehicleType: 0, single: 0, return: 0});
    const [ vehicleTollD, setTollRateD ] = useState({vehicleType: 0, single: 0, return: 0});
    const [ tollRates, setTollRates ] = useState([])
    const vehicleType = "vehicleType";
    const idb = props.idb


    useEffect(() => {
        getAllData(idb, "toll-logs", "tollrates", "readwrite")
        .then((resp) => {
            if (resp) {
                setTollRates(resp);
            }
        })
    },[])

   function handleTollName (e) {
        const value = e.target.value;
        // if (value) {
            setTollName(value)
        // }
   } 

   const handleTollRates = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value);


    if (id && value) {
        if (id === "selectA") {
            vehicleTollA.vehicleType = value
            setTollRateA(vehicleTollA);
        }
        else if (id === `${vehicleType}A1`) {
            vehicleTollA.single = value
            setTollRateA(vehicleTollA);

        } else if (id === `${vehicleType}A2`) {
            vehicleTollA.return = value
            setTollRateA(vehicleTollA);

        }

        if (id === "selectB") {
            vehicleTollB.vehicleType = value
            setTollRateB(vehicleTollB);
        }
        else if (id === `${vehicleType}B1`) {
            vehicleTollB.single = value
            setTollRateB(vehicleTollB)

        } else if (id === `${vehicleType}B2`) {
            vehicleTollB.return = value
            setTollRateB(vehicleTollB)

        }

        if (id === "selectC") {
            vehicleTollC.vehicleType = value
            setTollRateC(vehicleTollC);
        }
        else if (id === `${vehicleType}C1`) {
            vehicleTollC.single = value
            setTollRateC(vehicleTollC)

        } else if (id === `${vehicleType}C2`) {
            vehicleTollC.return = value
            setTollRateC(vehicleTollC)
        }

        if (id === "selectD") {
            vehicleTollD.vehicleType = value
            setTollRateD(vehicleTollD);
        }
        else if (id === `${vehicleType}D1`) {
            vehicleTollD.single = value
            setTollRateD(vehicleTollD)

        } else if (id === `${vehicleType}D2`) {
            vehicleTollD.return = value
            setTollRateD(vehicleTollD)

        }
    }

    

   }

   const handleSubmit = () => {
    const tollRatesDb = idb.open("toll-logs", 1);

    tollRatesDb.onsuccess = () => {
      const db = tollRatesDb.result;
      const tx = db.transaction("tollrates", 'readwrite')
      const tollData = tx.objectStore("tollrates")

      
      const data = tollData.put({
        id: ObjectId(),
        createdDate : new Date().toISOString(),
        tollName: tollName,
        tollRates: [vehicleTollA, vehicleTollB, vehicleTollC, vehicleTollD]
      });

      data.onsuccess = () => {
        tx.oncomplete = () => {
            db.close();
        }
        alert("Toll added")
        props.handleModal("tollModal", false)      
        window.location.reload() 
        data.onerror = (err) => {
            alert("error occured")
            console.log(err)
          }
        }
    };

    //getAllData(dbPromise, "logs", 'readwrite');

    
  };


  const addEntry = () => {
    if (idb) {
        const tollLog = idb.open("tollrates", 1)


    }

  }

  return (
    <Fragment>
            <Modal show={props.showModal} centered size="lg" onHide={() => props.handleModal("tollModal", false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New toll</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" id="" controlId="tollName">
                        <Row>
                            <Form.Label>Toll Name*</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text"
                                    placeholder='Enter toll name'
                                    onChange={(e) => handleTollName(e)}
                                    defaultValue={tollName}
                                    />
                            </Col>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                        </Row>
                    </Form.Group>

                    
                    <Form.Group className="mb-3">
                    <Row>
                        <Col sm={4}>
                            <Form.Select 
                                id="selectA"
                                className='form-control' 
                                onChange={(e) => handleTollRates(e)}
                            >
                                {VehicleTypes.map((a) => {
                                    return (
                                        <option 
                                            selected={a.value === 0}
                                            // defaultValue={vehicleType} 
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
                        <Col sm={4}>
                        <Form.Control 
                            id={`${vehicleType}A1`}
                            type="number"
                            placeholder='Single Journey'
                            onChange={(e) => handleTollRates(e)}
                            min= "0"
                            />
                        </Col>
                        <Col sm={4}>
                        <Form.Control 
                             id={`${vehicleType}A2`}
                             type="number"
                             min= "0"
                             placeholder='Return Journey'
                             onChange={(e) => handleTollRates(e)} 
                             />
                        </Col>
                        </Row>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                    <Row>
                        <Col sm={4}>
                            <Form.Select
                                id="selectB"
                                className='form-control' 
                                onChange={(e) => handleTollRates(e)}
                            >
                                {VehicleTypes.map((a) => {
                                    return (
                                        <option 
                                            selected={a.value === 0}
                                            // defaultValue={vehicleType} 
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
                        <Col sm={4}>
                        <Form.Control 
                             id={`${vehicleType}B1`}
                             type="number"
                             min= "0"
                             placeholder='Single Journey'
                             onChange={(e) => handleTollRates(e)}
                            />
                        </Col>
                        <Col sm={4}>
                        <Form.Control 
                              id={`${vehicleType}B2`}
                              type="number"
                              min= "0"
                              placeholder='Return Journey'
                              onChange={(e) => handleTollRates(e)}
                             />
                        </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Row>
                        <Col sm={4}>
                            <Form.Select
                                id="selectC"
                                className='form-control' 
                                onChange={(e) => handleTollRates(e)}
                            >
                                {VehicleTypes.map((a) => {
                                    return (
                                        <option 
                                            selected={a.value === 0}
                                            // defaultValue={vehicleType} 
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
                        <Col sm={4}>
                        <Form.Control 
                            id={`${vehicleType}C1`}
                            type="number"
                            min= "0"
                            placeholder='Single Journey'
                            onChange={(e) => handleTollRates(e)}
                            />
                        </Col>
                        <Col sm={4}>
                        <Form.Control 
                             id={`${vehicleType}C2`}
                             type="number"
                             min= "0"
                             placeholder='Return Journey'
                             onChange={(e) => handleTollRates(e)} 
                             />
                        </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Row>
                        <Col sm={4}>
                            <Form.Select
                                 id="selectD"
                                 className='form-control' 
                                 onChange={(e) => handleTollRates(e)}
                            >
                                {VehicleTypes.map((a) => {
                                    return (
                                        <option 
                                            selected={a.value === 0}
                                            // defaultValue={vehicleType} 
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
                        <Col sm={4}>
                        <Form.Control 
                            id={`${vehicleType}D1`}
                            type="number"
                            placeholder='Single Journey'
                            onChange={(e) => handleTollRates(e)}
                            min= "0"
                            />
                        </Col>
                        <Col sm={4}>
                        <Form.Control 
                             id={`${vehicleType}D2`}
                             type="number"
                             min= "0"
                             placeholder='Return Journey'
                             onChange={(e) => handleTollRates(e)} 
                             />
                        </Col>
                        </Row>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={() => handleSubmit()}>
                        Add Entry
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
        
        
    </Fragment>
  )
}

export default AddToll