const express = require('express');

const router = require('express').Router();


const KmsRouter = (app) => {
    // router 객체에 온갖 기능들을 탑재한 다음에 app의 미들웨어에 싣는 방식?
    router.get('/' , (req,res) => {
        res.status(200)
            .contentType('text/html; charset=utf-8')
            .render('render');
    })

    router.get('/list', (req,res) => {
        // db 객체 가져오기
        const db = app.get('db');
        db.collection('friends').find().toArray()
        .then(list => {
            res.status(200)
            .contentType('text/html; charset=utf-8')
            .render('list',{list})
        })
    })

    router.post('/insert', (req,res) => {
        const age = parseInt(req.body.age);
        const name = req.body.name;
        const species = req.body.species;

        const db = app.get('db');
        db.collection('friends').insertOne({age,name,species})
        .then((result) => {
            console.log(result);
            res.redirect('/kms/list');
        })
    })




    return router
}




module.exports = KmsRouter