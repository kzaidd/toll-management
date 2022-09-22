const getAllData = (db, dbName, collection_name, usage) => {
    return new Promise(function (resolve, reject) {
        try {
            const dbaccess = db.open(dbName, 1);
            var result;

            dbaccess.onsuccess = () => {
            const adb = dbaccess.result;
            if (adb.objectStoreNames.contains(collection_name)) {
                const transaction = adb.transaction(collection_name, usage)
                const tollData = transaction.objectStore(collection_name)
    
                const allData = tollData.getAll();
    
                allData.onsuccess = (query) => {
                    result = query.srcElement.result;
                    resolve(result)
                }
    
                transaction.oncomplete = () => {
                    // console.log(result)
                    adb.close();
                }
    
                allData.onerror = () => {
                    return alert("Something went wrong!")
                }
    
                dbaccess.onerror = (e) => {
                    console.log(e)
                }
            } else {
                result = false
                resolve(result)
            }
           
        }

        } catch (error) {
          console.error(error);
            reject();
        }
    });
 } 


function isLessTha24HoursAge(datetime) {

    const twentyFourHrInMs = 24 * 60 * 60 * 1000;

    const twentyFourHoursAgo = Date.now() - twentyFourHrInMs;

    return datetime > twentyFourHoursAgo;

}


const ObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};




export { getAllData, isLessTha24HoursAge, ObjectId }