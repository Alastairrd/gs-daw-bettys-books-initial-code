const { check, validationResult } = require('express-validator');
const express = require("express")
const router = express.Router()

router.get('/search',function(req, res, next){
    res.render("search.ejs")
})

router.get('/search_result', function (req, res, next) {
    // Search the database
    let sqlquery = "SELECT * FROM books WHERE name LIKE '%" + req.santize(req.query.search_text) + "%'" // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("list.ejs", {availableBooks:result})
     }) 
})


router.get('/list', global.redirectLogin, function(req, res, next) {
    let sqlquery = "SELECT * FROM books" // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("list.ejs", {availableBooks:result})
     })
})

router.get('/addbook', function (req, res, next) {
    res.render('addbook.ejs')
})

router.post('/bookadded', 
    [check('name').notEmpty().isLength({max: 50}),
     check('price').notEmpty(),
     check('author').notEmpty().isLength({max: 64})], function (req, res, next) {
    // saving data in database
    let sqlquery = "CALL add_book_auth(?,?,?)"
    // execute sql query
    let newrecord = [req.sanitize(req.body.name), req.sanitize(req.body.price), req.sanitize(req.body.author)]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            console.log("Error posting")
            next(err)
        }
        else
            res.send(' This book and author is added to database, name: '+ req.sanitize(req.body.name) + ', price: '+ req.sanitize(req.body.price) + ', author: ' + req.sanitize(req.body.author))
    })
}) 

router.get('/bargainbooks', function(req, res, next) {
    let sqlquery = "SELECT * FROM books WHERE price < 20"
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("bargains.ejs", {availableBooks:result})
    })
}) 


// Export the router object so index.js can access it
module.exports = router