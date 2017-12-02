require('dotenv').config();
const express = require('express')
    , cors = require('cors')
    , bodyParser = require('body-parser')
    , app = express();

const yelpController = require('./yelpController');

app.use(cors());
app.use(bodyParser.json());

app.post('/api/yelp', yelpController.getBusinesses)

const PORT = 4200;
app.listen(PORT, console.log(`Listening on SERVER_PORT... ${PORT}`))