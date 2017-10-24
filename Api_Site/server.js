var httpsetup = require('./config/httpsetup');
var express = require('express');
var cors = require('cors');
var webserver = express();
var port = process.env.PORT || httpsetup.http_port;
var bodyParser = require('body-parser');
var path = require('path');
const swaggerUi = require('swagger-ui-express');


//CORS
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', httpsetup.cors_allow_origin );
  res.header('Access-Control-Allow-Methods', httpsetup.cors_allow_methods );
  res.header('Access-Control-Allow-Headers', httpsetup.cors_allow_headers );
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};
webserver.use(allowCrossDomain);

//PARSER
webserver.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
webserver.use(bodyParser.json({limit: '50mb'}));

// SWAGGER
const swaggerDocument = require('./swagger.json');
var showExplorer = false;
var options = {
    validatorUrl : null
};
webserver.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument,showExplorer,options));

//client css
webserver.get('/client/content/css/default', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/css/client.css')); });
//img
webserver.get('/client/content/img/homeIcon', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/img/home24.png')); });
webserver.get('/client/content/img/systemIcon', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/img/MailIcon32.png')); });
webserver.get('/client/content/img/homeimage', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/img/home64.png')); });
// static folders to be able to point to css, js etc files in a directory
webserver.get('/', function (req, res) { res.sendFile(path.join(__dirname + '/client/apiIndex.html')); });
webserver.get('/home/', function (req, res) { res.sendFile(path.join(__dirname + '/client/apiIndex.html')); });

//Listen on port number
webserver.listen(port);
console.log('RESTful API server started on: ' + port);

//API's
//Apis are defined as /MailEnhancement/api/v1/ for the version and to denote that you are calling an api
//1.1 Db table
var contactTypesRoutes = require('./api/routes/ContactTypesRoutes');
contactTypesRoutes(webserver);

//1.2 Db table
var fieldTypesRoutes = require('./api/routes/FieldTypesRoutes');
fieldTypesRoutes(webserver);

//1.3 Db table
var languagesRoutes = require('./api/routes/LanguagesRoutes');
languagesRoutes(webserver);

//2.5 Db table
var fieldItemsRoutes = require('./api/routes/FieldItemsRoutes');
fieldItemsRoutes(webserver);

//2.1 Db table
var signatureItemsRoutes = require('./api/routes/SignatureItemsRoutes');
signatureItemsRoutes(webserver);