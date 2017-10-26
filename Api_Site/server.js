
var _env = require('./config/env');
var _env_settings = require('./config/env_variables');
var _config = "";
var init_environment = function (res) {
  _env_settings.PopulateEnvironmentSettings(_env.name,
    function (result, haserror, errormessage) {
      _config = result;
      return result;
    });
}
init_environment();

var express = require('express');
var cors = require('cors');
var webserver = express();
var port = process.env.PORT || _config.http.http_port;
var bodyParser = require('body-parser');
var path = require('path');
const swaggerUi = require('swagger-ui-express');

//CORS
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', _config.http.cors_allow_origin);
  res.header('Access-Control-Allow-Methods', _config.http.cors_allow_methods);
  res.header('Access-Control-Allow-Headers', _config.http.cors_allow_headers);
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
webserver.use(bodyParser.urlencoded({ limit: _config.parser.urlencoded_max, extended: true }));
webserver.use(bodyParser.json({ limit: _config.parser.json_max }));

// SWAGGER
const swaggerDocument = require('./swagger/' + _config.swagger.filename);
var showExplorer = false;
var options = {
  validatorUrl: null
};
webserver.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, showExplorer, options));

// CSS
webserver.get('/client/content/css/default', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/content/css/client.css'));
});
webserver.get('/client/content/css/bootstrap', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/content/css/bootstrap.css'));
});

// JS
webserver.get('/client/content/js/jquery', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/content/js/jquery1-12-4.min.js'));
});
webserver.get('/client/content/js/bootstrap', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/content/js/bootstrap.min.js'));
});
// IMAGES
webserver.get('/client/content/img/favicon', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/img/MailIcon32.png')); });
webserver.get('/client/content/img/base', function (req, res) { res.sendFile(path.join(__dirname + '/client/content/img/MailIcon32.png')); });
// STATIC PATH
webserver.get('/', function (req, res) { res.sendFile(path.join(__dirname + '/client/index.html')); });
webserver.get('/home/', function (req, res) { res.sendFile(path.join(__dirname + '/client/index.html')); });


//Listen on port number
webserver.listen(port);
console.log('Email signature API site started on: ' + port +' for environment : '+_env.name);


//API's
//Apis are defined as /MailEnhancement/api/v1/ for the version and to denote that you are calling an api
var contactTypesRoutes = require('./api/routes/ContactTypesRoutes');
contactTypesRoutes(webserver);

var fieldTypesRoutes = require('./api/routes/FieldTypesRoutes');
fieldTypesRoutes(webserver);

var languagesRoutes = require('./api/routes/LanguagesRoutes');
languagesRoutes(webserver);

var fieldItemsRoutes = require('./api/routes/FieldItemsRoutes');
fieldItemsRoutes(webserver);

var signatureItemsRoutes = require('./api/routes/SignatureItemsRoutes');
signatureItemsRoutes(webserver);