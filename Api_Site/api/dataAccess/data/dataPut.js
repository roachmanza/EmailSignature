
var _env =  require('../../../config/env');
var _env_settings =  require('../../../config/env_variables');
var _config = "";
var init_environment = function(res){
    _env_settings.PopulateEnvironmentSettings(_env.name, 
  function(result, haserror, errormessage){
    _config = result;
    return result;
  });  
}
init_environment();

var pg = require('pg');

module.exports = function (queryString, callback) {
    var connection;
    var jsonReturnResult = "";
    var connection = "postgres://" + _config.postgres.user + ":" + _config.postgres.password + "@" + _config.postgres.host + ":" + _config.postgres.port + "/" + _config.postgres.database;
    var client = new pg.Client(connection);
    client.connect(function (err) {
        if (err) {
            jsonReturnResult = JSON.parse(JSON.stringify(err.message));;
            client.end();
            callback(jsonReturnResult, true, _config.httpcode.DBConnection_error); //Throws a 503
        } else {
            client.query(queryString, function (err, result) {
                if (err) {
                    jsonReturnResult = JSON.parse(JSON.stringify(err.message));
                    client.end();
                    callback(jsonReturnResult, true, _config.httpcode.Sql_error); //Throws a 400
                } else {
                    jsonReturnResult = JSON.parse(JSON.stringify(result.rows));
                    client.end();
                    callback(jsonReturnResult, false, _config.httpcode.Ok); //Throws a 200
                }
            });
        }
    });
};
