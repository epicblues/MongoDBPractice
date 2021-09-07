const {MongoClient} = require('mongodb');

const client = new MongoClient("mongodb://localhost:27017");

function findAll() {
    client.connect()
    .then(client => {
    const db = client.db('playground');
    db.collection('playlist').find({$and : [
        {age : {$lt : 50}},
        {name : /^\w{4}$/}
    ]})
    .sort({power:-1})
    .project({_id:0, name:1, age:1, location:1})
    .toArray()
    .then(arr => {
        arr.forEach(doc => {
            console.log(doc);
        })
    });

})
}
findAll();


function update() {
    client.connect()
    .then(client => {
        client.db('playground').collection('playlist').updateMany({age:{$gt : 30}},{$set : {
            updateDate: Date(),
            power:Math.floor(Math.random()*100),
            favFood : [
                'dunkin',
                'donas',
                'avril lavigne'
            ]
        }})
    })
    .then(
        () => {
            findAll();
        }
    )
    .catch(console.log)
}

// update();







