import React, { useEffect } from 'react'
import Header from './components/Navbar'


const Home = () => {
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

      if (!db.objectStoreNames.contains("logs")) {
        db.createObjectStore("logs", {
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
    };
  };

  useEffect(() => {
    createCollectionInDB();
    
  }, []);

  return (
    <div>
        <h4>Toll Management Application</h4>
        <Header idb={idb}/>
    </div>
  )
}

export default Home