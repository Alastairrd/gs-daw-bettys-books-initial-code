const express = require('express')
const router = express.Router()


router.get('/books', function (req, res, next) {

    // Query database to get all the books
    term = '%' + req.query.search_term + '%'
    let sqlquery = "SELECT * FROM books"

    if(req.query.search_term !== undefined && req.query.search_term !== ''){
        sqlquery = "SELECT * FROM books WHERE name LIKE ?"
    }
    
    // Execute the sql query
    db.query(sqlquery, term, (err, result) => {
        // Return results as a JSON object
        if (err) {
            res.json(err)
            next(err)
        }
        else {
            res.json(result)
        }
    })
})

module.exports = router
