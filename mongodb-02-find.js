
// 객체 구조 할당(ES6)
const {MongoClient} = require("mongodb");
const {testInsertOneDoc, testInsertManyDoc, testDeleteAll, friends, CONST} = require("./mongodb-01-crud");

// console.log(friends);

const url = "mongodb://localhost:27017"; // 접속 URL

const client = new MongoClient(url, { useNewUrlParser:true});

// 문서 한 개 가져오기
function  testFindOne() {
    client.connect()
    .then(client => {
        const db= client.db('mydb');
        db.collection('friends').findOne().then(console.log);
        
        
    })
}

// testFindOne();

// find()의 경우 Promise를 return하지 않기 때문에 .toArray()를 통해 Promise를 받아야 한다. .
function testFindAll() {
    client.connect().then(client => {
        const db= client.db('mydb');
        db.collection('friends').find({age:{$gt : 14}}).toArray()
        .then(array => {
            array.forEach((...abc) => {
                console.log(abc[0])
            });
        })
    })
   
    
}

// testFindAll();

// 조건 검색
// SELECT FROM FRIENDS WHERE name='____'
// 조건 객체를 {name : 값} => equal 검색
function testFindByName(name) {
    client.connect()
    .then(client => {
        const db= client.db("mydb");
        db.collection('friends').find(
            // 조건 객체 
            {name}
        ).toArray()
        .then(array => {
            array.forEach(value => {
                console.log(value);
            })
        })
        .catch(console.log);
    })
}

// testFindByName('고길동');

// 조건 조합 검색
// SELECT * FROM ... WHERE cond1 and(or) cond2

function testFindCombinedWhere() {
    client.connect().then(client => {
        const db= client.db('mydb');
        db.collection('friends').find(
            // {$and : [{gender:"여성"}, {species:"인간"}]}
            {$or : [{species:"인간"}, {age : {$gt : 15}}]}
        ).sort({age:-1}).toArray()
        .then(array => {
            array.forEach(value => {
                console.log(value);
            })
        })
        .then(() => {
            client.close();
        })
    })
}

// testFindCombinedWhere()

// projection

function testFindProduction() {
    client.connect()
    .then(client => {
        const db = client.db('mydb');
        db.collection('friends').find({})
            .project({ _id:0,name:1,  age:1, species:1})
            .skip(0)
            .limit(0)
            .toArray()
            .then(array => {
                array.forEach(value => {
                    console.log(value)
                })
            })
    })

}

// testFindProduction();


exports.testFindAll = testFindAll;
