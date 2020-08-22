// Setup empty JS object to act as endpoint for all routes
projectData = {
    tempreature: '',
    date: '',
    userReasponse: ''
};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;

function listening() {
    console.log('server running');
    console.log(`running on local : ${port}`);

}
// Setup Server
const server = app.listen(port, listening);



// get rout
app.get('/getData', receiveData);

function receiveData(req, response) {
    response.send(projectData);
}

// post rout 
app.post('/UpdateData', sendData);

function sendData(req, res) {
    console.log(req.body);
    projectData.userReasponse = req.body.userReasponse;
    projectData.tempreature = req.body.tempreature;
    projectData.date = req.body.date;

    res.send('Success')
}