// express 모듈 불러오기

const express = require('express');
const http = require('http'); // 노드 기본 http 모듈

// express 생성
const app = express();

// 설정, 속성을 집어넣을 때
// set(키 , 값)
// get(키)

// 환경변수에 PORT가 설정되어 있으면 그 값을 쓰고,
// 설정이 안 되어 있으면 3000번을 사용한다.
app.set('port', process.env.PORT || 3000);

// 로거 추가
// npm install morgan
const logger = require('morgan');  // 로거 불러오기

// 로거를 express에 추가 : 미들웨어 추가
// 본격적으로 요청 처리 하기 전에 public 폴더에 url에 맞는 파일명이 있는지 확인한다.

app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));

//body-parser 등록
//4.16
//Post 방식 요청 처리 가능.
app.use(express.urlencoded({extended: false}));


// GET 메서드 : 요청의 처리
// app.get(url, callback)

// 응답 객체의 상태 메시지의 자체적인 변경을 막는다?
app.set("etag", false);

const {MongoClient} = require('mongodb');



app.get('/welcome', (req, res) => {
    // express의 추가 응답 처리 메서드
    console.log("[GET] /welcome ");
    res.status(200)
        .header("Content-Type", "text/html;charset=utf-8")
        .send("Welcome!");
})

// GET 요청 파라미터의 처리
app.get("/request", (req, res) => {
    console.log('[GET] /request');
    console.log('[QUERY name:' + req.query.name + ']');
    console.log(req.query)
    let paramName = req.query.name;
    if (paramName === undefined || paramName.length == 0) { //name 파라미터가 전달되지 않음
        res.status(404)  // Not Found
            .contentType("text/html;charset=utf-8")
            .send("Name 정보를 확인할 수 없습니다")
            .end();
    } else {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(`Welcome ${req.query.name}님 
        나이는 ${req.query.age}이시군요! wow`);
        res.end();
    }
})

// URL 파라미터 처리(Fancy URL, Pretty URL)
// URL의 경로 일부로 데이터를 전송
app.get('/urlparam/:booya', (req,res) => {
    const booya = req.params.booya;
    res.status(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .header("Set-Cookie", "kms=babo")
        .send(`<h1>안녕하세요 ${booya}님!<h1>`);
    
})
// 뷰엔진 활용
app.set("view engine", "ejs");
// 응답 객체의 render 메서드 활용
app.set('views', __dirname + "/views");

app.get('/render', (req, res) => {
    res.status(200)
        .contentType("text/html;charset=utf-8")
        .render("render");
})


app.get('/', (req, res) => {
    // http 모듈의 응답 처리 메서드
    console.log("[GET] : /");
    res.contentType("text/html;charset=utf-8")
    .render("home");
    
})

// 라우터 등록(미들웨어)
const webRouter = require('./router/WebRouter')(app);
const apiRouter = require('./router/APIRouter')(app);
app.use("/web",webRouter);
app.use("/api",apiRouter);



function startServer() {
    // database 연결 정보
    const dbUrl = 'mongodb://localhost:27017'
    // database 연결
    MongoClient.connect(dbUrl,{useNewUrlParser : true})
    .then(client => {
        // db 선택
        console.log('데이터베이스에 연결되었습니다.');
        // 선택된 db를 express에 추가
        let db = client.db('mydb');
        
        // 익스프레스에 추가
        app.set("db", db); // db 키로 몽고 db 객체 추가 필요할 때 가져올 수 있다.
        // 서버 start
        startExpress();

    })
    .catch(reason => {
        console.error(reason);
    })
}
startServer();

function startExpress() {
    http.createServer(app).listen(app.get('port'), () => {
        console.log('Web Server is running on port : ', app.get('port'));
    })
}


console.log('end of main()');

