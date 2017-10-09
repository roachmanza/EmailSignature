var pg = require('pg');
var config = require('config');

module.exports = function (queryString, callback) {
    var connection;
    if (config.has('serverSettings.postgresDbConnection')) {
        connection = config.get('serverSettings.postgresDbConnection');
    } else {
        var errorstring = "Connection error, could not find the 'serverSettings.postgresDbConnection' file."
        callback(errorstring, true);
        return;
    }
    var client = new pg.Client(connection);
    var jsonReturnResult = "";
    client.connect(function (err) {
        if (err) {
            console.error('CONNECTION ERROR...');
            var jsonString = JSON.stringify(err.message);
            var jsonResult = JSON.parse(jsonString);
            jsonReturnResult = jsonResult;
            client.end();
            console.log(jsonReturnResult);
            callback(jsonReturnResult, true);
        } else {
            //console.log('CONNECTED...');
            client.query(queryString, function (err, result) {
                if (err) {
                    //console.log("ERROR")
                    //console.log(err.message);
                    var jsonString = JSON.stringify(err.message);
                    var jsonResult = JSON.parse(jsonString);
                    jsonReturnResult = jsonResult;
                    client.end();
                   // console.log(jsonReturnResult);
                    callback(jsonReturnResult, true);
                } else {
                    //console.log("SUCCESS")
                    var jsonString = JSON.stringify(result.rows);
                    var jsonResult = JSON.parse(jsonString);
                    jsonReturnResult = jsonResult;
                    client.end();
                    //console.log(jsonReturnResult);
                    callback(jsonReturnResult, false);
                }
            });
        }
    });
};
