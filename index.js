const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
const doper = require('./operations');

MongoClient.connect(url)
.then((client) => {
    console.log('connected succesfully to server');

    const db = client.db(dbname)

    doper.insertDocument(db, 
        {
            name: 'Vadonut', 
            description: 'Test'
        }, "dishes") 
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return doper.findDocument(db, 'dishes')
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return doper.updateDocument(db, 
            {
                name: "Vadonut"
            }, 
            {
                description: "Updated Test"
            },"dishes");
        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            doper.findDocument(db, "dishes") 
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
            
            db.dropCollection("dishes", (result) => {
                console.log("Dropped Collection: ", result);

                client.close();
            });
        })
        .catch(err => console.log(err))
})
.catch(err => console.log(err))