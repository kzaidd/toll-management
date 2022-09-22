import React, { useState, useEffect, Fragment } from 'react'
import { getAllData } from './Helper';
import { Table, Row, Col, Form } from 'react-bootstrap';
import { VehicleTypes } from '../master-data';

const TollList = (props) => {
  const [tolls, setTolls ] = useState([]);
  const [locations, setLocations] = useState([])

  const idb = props.idb;

  useEffect(() => {
    getAllData(idb, "toll-logs", "tollrates", "readwrite")
    .then((res) => {
        if (res) {
          var dropdownList = []
          res.forEach((e) => {
            dropdownList.push(e.tollName)
          })
          dropdownList.splice(0, 0, "All");
          setLocations(dropdownList)
          setTolls(res)
        console.log(res , "fd")

      } else {
        setTolls([])
      }
    })
    .catch((err) => {
      console.log(err)
    })

  }, [])


  function searchTolls(e) {
    const value = e.target.value
    getAllData(idb, "toll-logs", "tollrates", "readwrite")
    .then((res) => {
      if (res) {
        if (value !== "All") {
          let tollLogs = res.filter(i => i.tollName == value)
          setTolls(tollLogs)
        } else {
          setTolls(res)
        }
        
      }
    })
  }

  function getDataUsingLocation () {
    
  }

  return (
    <Fragment>
     
      <div style={{paddingLeft: 100, paddingRight:100,  textAlign:"center"}}>
      <div>
      <Form.Group className='mb-3'>
              <Row>
                <Col>
                <p><b>Toll Gate List</b></p>
                  <Form.Select className='form-control' onChange={(e) => searchTolls(e)} style={{width: "200px", marginBottom: "10px"}}>
                      {locations.length > 0 ? 
                        locations.map((a) => {
                            return (
                                <option 
                                    // selected="All"
                                    // defaultValue= 
                                    // disabled={a.disabled} 
                                    key={a} 
                                    value={a}
                                >
                                    {a}
                                </option>
                            )   
                        })
                      : "No Location Found"}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
      </div>
        <Table bordered>
          <thead>
            <tr>
              <th>Toll Name</th>
              <th>Car/Jeep/Van</th>
              <th>LCV</th>
              <th>Truck/ Bus</th>
              <th>Heavy Vehicles</th>
            </tr>
          </thead>
          <tbody>
          {tolls?.length > 0 ? 
            tolls.map((toll) => {
              let tollRates = toll.tollRates
              console.log(tollRates)
              return (
                <tr key={toll?.id}>
                  <td>{toll?.tollName}</td>
                  <td>{tollRates.map((i) => {
                    if (i.vehicleType === 1) {
                      return (i.single + "/" + i.return)
                    }
                  })}
                  </td>
                  <td>{tollRates.map((i) => {
                    if (i.vehicleType === 2) {
                      return (i.single + "/" + i.return)
                    }
                  })}
                  </td>
                  <td>{tollRates.map((i) => {
                    if (i.vehicleType === 3) {
                      return (i.single + "/" + i.return)
                    }
                  })}
                  </td>
                  <td>{tollRates.map((i) => {
                    if (i.vehicleType === 4) {
                      return (i.single + "/" + i.return)
                    }
                  })}
                  </td>
                </tr>
              )
            })
          : "No Tolls added"}
          </tbody>
        </Table> 
      </div>
    </Fragment>
  )
}

export default TollList