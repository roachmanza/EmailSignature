var pg = require('pg');
var _httpresponcecode = require('../../constants/httpresponcecodes');
var dbconnections = require('../../../config/dbconnections');
module.exports = function (queryString, callback) {
    var connection;
    var jsonReturnResult = "";
    var username = dbconnections.DBConnection_user;
    var password = dbconnections.DBConnection_password;
    var host = dbconnections.DBConnection_host;
    var port = dbconnections.DBConnection_port;
    var database = dbconnections.DBConnection_database;
    var connection = "postgres://" + username + ":" + password + "@" + host + ":" + port + "/" + database;
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

};