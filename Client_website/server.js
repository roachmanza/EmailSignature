var express = require('express');
var webserver = express();
var port = process.env.PORT || 4011;
var bodyParser = require('body-parser');
var path = require('path');



//PARSER
webserver.use(bodyParser.urlencoded({ extended: true }));
webserver.use(bodyParser.json());

//client css
webserver.get('/client/content/css/default', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/css/client.css')); });
webserver.get('/client/content/img/favicon', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/img/MailIcon24.png')); });
webserver.get('/client/content/img/config', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/img/ConfigIcon64.png')); });

//client js
webserver.get('/client/content/js/default', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/client.js')); });
webserver.get('/client/content/js/bootstrap', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/bootstrap.min.js')); });
webserver.get('/client/content/js/webcomponentslite', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/webcomponents-lite.js')); });
webserver.get('/client/content/js/appframework', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/js/appFrameWork.js')); });

// static folders to be able to point to css, js etc files in a directory
webserver.get('/', function (req, res) { res.sendFile(path.join(__dirname + '/client/index.html')); });
webserver.get('/home/', function (req, res) { res.sendFile(path.join(__dirname + '/client/index.html')); });
webserver.get('/AwdContactTypeMappings', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/AwdContactTypeMappings.html')); });
webserver.get('/ContactTypes', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/ContactTypes.html')); });
webserver.get('/CsiContactCategories', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/CsiContactCategories.html')); });
webserver.get('/CsiContactTypes', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/CsiContactTypes.html')); });
webserver.get('/FieldTypes', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/FieldTypes.html')); });
webserver.get('/Languages', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/Languages.html')); });
webserver.get('/SignatureItems', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/SignatureItems.html')); });
webserver.get('/Signatures', function (req, res) { res.sendFile(path.join(__dirname + '/client/pages/Signatures.html')); });


//Listen on port number
webserver.listen(port);
console.log('Mail enhancement site server started on: ' + port);