const MongoClient = require('mongodb').MongoClient; // 몽고 클라이언트 클래스를 메모리에 로드

const url = "mongodb://localhost:27017"; // Connection URL
const dbName = "mydb";
const assert = require('assert');
//클라이언트 생성

const client = new MongoClient(url, {useNewUrlParser : true});

function testConnect() {
    // client.connect((err, client) => {
    //     // callback
    //     assert.equal(null, err);
    //     console.log(client)
    //     console.log("MongoDB Connected");
    //     client.close();
    // })
    client.connect()
        .then(client => {
            console.log(client);
            client.close();
        })
        .catch(reason => {
            console.error(reason);
        })
}

// testConnect();

// 한개 문서 insert
// INSERT INTO mydb.friends VALUES();
// db.friends.insert({문서})
function testInsertOne(name) {
    client.connect()
    .then(client => {
        // DB 선택
        const db = client.db("mydb");
        console.log(db);
        // 컬렉션 선택 후 쿼리 수행.
        db.collection('friends').insertOne({name}) // es6 문법 : key와value가 같은 경우
            .then(result => {
                
                console.log("새로 삽입된 문서의 ID : ",result.insertedId);
                client.close();
            })
        
    })
    .catch(reason => {
        console.log(reason);
    })
}

// testInsertOne('홍길동');

// 다수 문서 삽입
// INSERT INTO friends VALUES(...), (...), (...)
// db.friends.insertMany([{문서1}, {문서2}, ...])

function testInsertMany(names) {
    if (!Array.isArray(names)) {
        testInsertOne(names);
        return;
    }
    client.connect()
    .then(client => {
        const db = client.db('mydb')
        db.collection('friends').insertMany(names.map(item =>{ return {name: item}}))
        .then(result => console.log(result.insertedCount, "개 삽입되었습니다."))
        .catch(console.log);
    })
}

// testInsertMany(["김미성", "김수수", "김만수"]);
// testInsertMany('장길산');