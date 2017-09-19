var express = require('express');
var cors = require('cors');
var webserver = express();
var port = process.env.PORT || 4010;
var bodyParser = require('body-parser');
var path = require('path');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,MMI-Authorization-Claims');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};

webserver.use(allowCrossDomain);
// webserver.options('*', cors())
webserver.use(bodyParser.urlencoded({ extended: true }));
webserver.use(bodyParser.json());

//client css
webserver.get('/client/content/css/default', function (req, res) {res.sendFile(path.join(__dirname + '/client/content/css/client.css'));});
//img
webserver.get('/client/content/img/homeIcon', function (req, res) {res.sendFile(path.join(__dirname + '/client/content/img/MailIcon24.png'));});
webserver.get('/client/content/img/systemIcon', function (req, res) {res.sendFile(path.join(__dirname + '/client/content/img/MailIcon32.png'));});
// static folders to be able to point to css, js etc files in a directory
webserver.get('/', function (req, res) {res.sendFile(path.join(__dirname + '/client/apiIndex.html'));});
webserver.get('/home/', function (req, res) {res.sendFile(path.join(__dirname + '/client/apiIndex.html'));});
webserver.get('/api/help', function (req, res) {res.sendFile(path.join(__dirname + '/client/apiDocumentation.html'));});

//Listen on port number
webserver.listen(port);
console.log('RESTful API server started on: ' + port);


//API's
//Apis are defined as /api/v1/ for the version and to denote that you are calling an api
//1.1 Db table
var contactTypesRoutes = require('./api/routes/ContactTypesRoutes');
contactTypesRoutes(webserver);
