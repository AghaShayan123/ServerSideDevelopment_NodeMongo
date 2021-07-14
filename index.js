const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
const doper = require('./operations');

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log('connected succesfully to server');

    const db = client.db(dbname)

    doper.insertDocument(db, 
        {
            name: 'Vadonut', 
            description: 'Test'
        },
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            doper.findDocument(db, 'dishes', (docs) =>{
                console.log("Found Documents:\n", docs);

                doper.updateDocument(db, 
                    {
                        name: "Vadonut"
                    }, 
                    {
                        description: "Updated Test"
                    },
                    "dishes", (result) => {
                        console.log("Updated Document:\n", result.result);

                        doper.findDocument(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    }
                )
            })
        }
    )
})