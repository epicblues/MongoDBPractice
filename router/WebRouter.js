
const express = require('express');
const router = express.Router();
const {ObjectId} = require('mongodb'); // ObejctId를 처리하기 위한 객체



module.exports = (app) => {
    router.get(["/friends/list",'/friends'], (req,res) => {
        // express에서 db 객체를 꺼내고
        let db = app.get('db');
        // 쿼리 수행
        db.collection('friends').find().toArray()
        .then(result => {
            // 결과를 템플릿에 반영
            res.render("friends_list",{result :result});
        })
        .catch(reason => {
            console.error(reason);
        })
        
        

        // res.status(200)
        //     .contentType("text/html; charset=utf-8")
        //     .send("<p>Web Router 응답</p>");
    });

    // 새 친구 등록 폼
    router.get("/friends/new", (req,res) => {
        res.render('friend_insert_form');
    })

    router.post("/friends/save", (req,res) => {
        // 폼 정보는 req.body로 넘어온다. (모두 문자열으로 넘어오는 것 주의);
        const name = req.body.name;
        const species = req.body.species;
        const age= parseInt(req.body.age);

        const db = app.get('db');
        db.collection('friends').insertOne({name,species,age})
        .then(result => {
            console.log(result);
            res.status(200)
            .redirect("/web/friends");
        })
        .catch(reason => {
            console.error(reason);
            res.status(500) // Internal Server Error
                .send("ERROR : 친구를 추가하지 못했습니다.");
        })
        
    })

    router.get("/friends/delete/:oid", (req,res) => {
        const oid = req.params.oid;
        const db = app.get('db');
        
        
        db.collection('friends').deleteOne({_id : ObjectId(oid)})
        .then(() => {
            res.redirect('/web/friends');
        })
        .catch(reason => {
            res.status(500)
                .send("<p>삭제할 수 없습니다.")
        })
    })
    // 사용자 정보 확인
    router.get("/friends/show/:id", (req,res) => {
        const id = req.params.id;
        const db = app.get('db');
        db.collection('friends').findOne({_id : ObjectId(id)})
        .then(result => {
            res.render('friend_show', {friend:result});
        })
        .catch(console.error);

    })

    // 사용자 정보 수정
    router.get("/friends/modify/:id", (req,res) => {
        const id=req.params.id;
        const db=app.get('db');
        db.collection('friends').findOne({_id : ObjectId(id)})
        .then(result => {
            res.render('friend_update_form', {friend:result});
        })
        .catch(console.error);
    })
    // 사용자 정보 수정 전송 폼
    router.post("/friends/update", (req,res) => {
        // 폼 정보는 req.body로 넘어온다. (모두 문자열으로 넘어오는 것 주의);
        const id = req.body.id;
        const name = req.body.name;
        const species = req.body.species;
        const age = parseInt(req.body.age);

        const db = app.get('db');
        db.collection('friends').updateOne({_id : ObjectId(id)}, {$set : {name,species,age}})
        .then(result => {
            console.log(result);
            res.status(200)
            .redirect("/web/friends");
        })
        .catch(reason => {
            console.error(reason);
            res.status(500) // Internal Server Error
                .send("ERROR : 친구를 추가하지 못했습니다.");
        })
        
    })





    return router;
}
