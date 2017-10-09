var pg = require('pg');
var config = require('config');
var _httpresponcecode = require('../../constants/httpresponcecodes');

module.exports = function (queryString, callback) {
    console.log(queryString);
    var connection;
    var jsonReturnResult = "";
    if (config.has('serverSettings.postgresDbConnection')) {
        connection = config.get('serverSettings.postgresDbConnection');
        var client = new pg.Client(connection);
        client.connect(function (err) {
            if (err) {
                jsonReturnResult = JSON.parse(JSON.stringify(err.message));;
                client.end();
                callback(jsonReturnResult, true, _httpresponcecode.DBConnection_error); //Throws a 503
            } else {
                client.query(queryString, function (err, result) {
                    if (err) {
                        jsonReturnResult = JSON.parse(JSON.stringify(err.message));
                        client.end();
                        callback(jsonReturnResult, true, _httpresponcecode.Sql_error); //Throws a 400
                    } else {
                        jsonReturnResult = JSON.parse(JSON.stringify(result.rows));
                        client.end();
                        callback(jsonReturnResult, false, _httpresponcecode.Ok); //Throws a 200
                    }
                });
            }
        });
    } else {
        callback(JSON.parse(JSON.stringify("Connection error, could not find the 'serverSettings.postgresDbConnection' file.")), true, _httpresponcecode.DBConnection_error);
        return;
    };
};
