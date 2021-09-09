const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb');

function APIRouter(app) {
    router.get("/friends.json",(req,res)=> {
        let db = app.get('db');
        db.collection('friends').find().toArray()
        .then(result => {
            // json 결과 출력
            res.status(200)
                .header("Content-Type","text/json; charset=utf-8")
                .json(result);
        })
    })

    router.get("/friends/:filename", (req,res) => {
        let id= req.params.filename.split('.')[0];
        let db= app.get('db');
        db.collection('friends').findOne({_id : ObjectId(id)})
        .then(result => {
            res.status(200)
            .header("Content-Type", "text/json; charset=utf-8")
            .json(result)
        })

    })


    return router;
} 

// 라우터 내보내기
module.exports = APIRouter;