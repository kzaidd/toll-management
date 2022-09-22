import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import TollList from "./components/TollList";
import VehicleLogs from "./components/VehicleLogs";
import { getAllData } from "./components/Helper";
import AddToll from "./components/AddToll";

const App = () => {
  const [ collectionCreated, setCollectionCreated ] = useState(false) 
  const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  const createCollectionInDB = () => {
    if (!idb) {
      alert("This browser doesn't support IndexedDb");
    }
    console.log(idb);

    const dbRequest = idb.open("toll-logs", 1);

    dbRequest.onerror = (event) => {
      console.log("Error", event);
    };

    dbRequest.onupgradeneeded = (event) => {
      const db = dbRequest.result;

      if (!db.objectStoreNames.contains("vehiclelogs")) {
        db.createObjectStore("vehiclelogs", {
          keyPath: "id",
          autoIncrement: true
        });
      }

      if (!db.objectStoreNames.contains("tollrates")) {
        db.createObjectStore("tollrates", {
            keyPath: "id",
            autoIncrement: true
         })
      }

    };

    dbRequest.onsuccess = () => {
      console.log("Database opened successfully");
      setCollectionCreated(true)
    };
  };

  useEffect(() => {
    createCollectionInDB();
  }, []);

  return (
    <Router>
      <div>
        
        <Home idb={idb} collectionCreated={collectionCreated}/>
      </div>
      {/* {collectionCreated ?  */}
      <div>
        <Switch>
          <Route exact path="/">
            <VehicleLogs idb={idb} collectionCreated={collectionCreated}/>
          </Route>
          <Route exact path="/tolls">
            <TollList idb={idb}/>
          </Route> 
        </Switch>
      </div>
     {/* : "Loading" } */}
    </Router>
   
  )
}

export default App;
