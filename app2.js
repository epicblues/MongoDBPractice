const express = require('express');
const http = require('http');
const app = express();

// db 객체 생성 및 접속
const {MongoClient} = require('mongodb');



app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views', __dirname + "/views");
app.set('etag', false);

// body-parser 등록
// POst 방식 요청 처리
app.use(express.urlencoded({extended:false}));


// 라우터 설정
const KmsRouter = require('./router/KmsRouter')(app);
app.use('/kms', KmsRouter);


// 연결된 db 등록
function connectDbAndCreateServer() {
    MongoClient.connect('mongodb://localhost:27017')
    .then(client => {
        const db = client.db('mydb');
        app.set('db', db);
    })
    .then(() => {
        http.createServer(app).listen(app.get('port'), () => {
            console.log("Server Started");
        })
    })
    .catch(console.log)
}

connectDbAndCreateServer();



