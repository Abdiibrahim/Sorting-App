const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// import Routes
const valuesRouter = require('./routes/values');
const sortsRouter = require('./routes/sorts')

// add routes to app
app.use("/api/values", valuesRouter);
app.use("/api/sort", sortsRouter);

// Open connection on port 5000
app.listen(port,  () => {
    console.log(`Server listening on port: ${port}!`);
});
