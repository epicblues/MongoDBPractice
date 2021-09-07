const MongoClient = require('mongodb').MongoClient; // 몽고 클라이언트 클래스를 메모리에 로드
const {testFindAll} =require('./mongodb-02-find')
const url = "mongodb://localhost:27017"; // Connection URL

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

// 삭제
// DELETE FROM friends [WHERE ...]
// db.friends.delete, db.friends.deleteMany({조건 객체}) 

function testDeleteAll() {
    client.connect()
    .then(client => {
        const db = client.db('mydb');
        db.collection('friends').deleteMany()
        .then(result => console.log(result.deletedCount));
    })
    .catch(console.log);
}

// testDeleteAll();

function testInsertOneDoc(doc) {
    client.connect()
    .then(client => {
        const db = client.db('mydb');
        db.collection('friends').insertOne(doc)
        .then(result => console.log(result.insertedId))
        .catch(console.error);
    })

}

// testInsertOneDoc({name:'임꺽정', job:"도적"});

function testInsertManyDocs(docs) {
    client.connect()
    .then(client => {
        const db = client.db('mydb');
        db.collection('friends').insertMany(docs)
        .then(result => console.log(result.insertedCount))
        .catch(console.error);
    })
}


function testUpdateByJob(name, job) {
    // name이 일치하는 문서, job 필드를 업데이트
    client.connect()
    .then(client => {
        const db = client.db('mydb');
        db.collection('friends').updateMany({name},{$set: {job}}).then(
            result => {
                console.log(result.modifiedCount);
            }
        )
    })
    .then(() => {
    })

}
testUpdateByJob('kms','청년식당');
testFindAll();
const friends = [
    {
    name: "고길동",
    gender:"남성",
    species:"인간",
    age : 50
    },
    {
        name:"둘리",
        gender:'남성',
        species:"공룡",
        age:1000000
    },
    {
        name:"도우너",
        gender:"남성",
        species:"외계인",
        age : 15
    },
    {
        name:"또치",
        gender:'여성',
        species:'조류',
        age: 15
    },
    {
        name:"영희",
        gender:'여성',
        species:'인간',
        age:12
    }
]


// testInsertManyDocs(friends);

// 함수 내보내기 : 다른 모듈에서 사용할 수 있게
// exports : Nodejs global module
// 좌변 : 내보낼 이름 
// 우변 : 바깥쪽에서 접근할 객체 (레퍼런스)
exports.testInsertOneDoc = testInsertOneDoc;
exports.testInsertManyDocs = testInsertManyDocs;
exports.testDeleteAll = testDeleteAll;
exports.friends = friends;
exports.CONST = 5;
