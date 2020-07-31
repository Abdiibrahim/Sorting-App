const db = require('../database');
const router = require('express').Router();

// Get all values
router.route("/all").get((req, res) => {
    var sql = "SELECT * FROM [Values]"
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            return console.error(err);
        }
        res.json({
            "message":"success",
            "data": rows
        })
    });
});

// Get values by id
router.route("/:id").get((req, res) => {
    var sql = "SELECT * FROM [Values] WHERE rowID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            return console.error(err);
        }
        res.json({
            "message":"success",
            "data": row
        })
    });
});

module.exports = router;
