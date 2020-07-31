const quickSort = require('../functions/sortingFunctions');
const db = require('../database');
const router = require('express').Router();

// Load input validation
const validateInput = require("../validation/validation");

//Get all sorts
router.route("/all").get((req, res) => {
    let sql = "SELECT * FROM [Sorts]"
    let params = [];
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

// Sorts the value and stores the steps in the database
router.route('/').post((req, res) => {
    // Form validation
    const { errors, isValid } = validateInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // set data object
    let data = {
        type: req.body.type,
        value: req.body.value
    }
    
    // convert data from string to array
    let dataArray = data.value.split(',').map(i => i.trim());

    // change values to integers if type is INT
    if (data.type === 'INT') {
        dataArray = dataArray.map(i => +i)
    }

    // change strings to be lowercase for proper comparisson
    if (data.type === 'STR') {
        dataArray = dataArray.map(i => i.toLowerCase())
    }

    //insert initial value to database
    let sql = 'INSERT INTO [Values] (type) VALUES (?)'; // sql statement
    let params = [data.type]; // params

    // run sql statement
    db.run(sql, params, function (err) {
        // error check fro sqlite
        if (err) {
            return console.error(err);
        }

        let stepNum = 0; // number of current step. Increments
        let result = []; // array to store final result

        // callback function for storing steps to the database
        let insertStep = (array) => {
            // Save to DB here
            console.log(array);

            result.push((array.slice(0)).join(','));
            
            sql = 'INSERT INTO [Sorts] (fk_ValueID, stepNum, value) VALUES (?,?,?)'; // sql statement
            params = [this.lastID, stepNum, array.join(',')] // lastID is the rowID of the input. Store values as string

            db.run(sql, params, function (err) {
                // error check
                if (err) {
                    return console.error(err);
                }
            });

            stepNum++; // increment step number
        };

        insertStep(dataArray); // insert first step to db

        quickSort(dataArray, 0, dataArray.length - 1, insertStep); // run quicksort and insert steps to db
        
        // return json object
        res.json({
            "message":"success",
            "data": result
        })
    })
})

// export router
module.exports = router;
