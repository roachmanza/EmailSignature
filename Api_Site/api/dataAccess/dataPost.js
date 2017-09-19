var pg = require('pg');
module.exports = function (queryString, callback) {
    var client = new pg.Client({
        user: 'MailEnhancementUser',
        host: '127.0.0.1',
        database: 'MailEnhancement_Dev',
        password: 'MailEnhancementUser',
        port: 5432,
    });
    var jsonReturnResult = "";
    console.log(queryString);
    client.connect(function (err) {
        if (err) {
            console.error('CONNECTION ERROR...');
            var jsonString = JSON.stringify(err.message);
            var jsonResult = JSON.parse(jsonString);
            jsonReturnResult = jsonResult;
            client.end();
            console.log(jsonReturnResult);
            callback(jsonReturnResult);
        } else {
            console.log('CONNECTED...');
            client.query(queryString, function (err, result) {
                if (err) {
                    console.log("ERROR")
                    console.log(err.message);
                    var jsonString = JSON.stringify(err.message);
                    var jsonResult = JSON.parse(jsonString);
                    jsonReturnResult = jsonResult;
                    client.end();
                    console.log(jsonReturnResult);
                    callback(jsonReturnResult);
                } else {
                    console.log("SUCCESS")
                    var jsonString = JSON.stringify(result.rows);
                    var jsonResult = JSON.parse(jsonString);
                    jsonReturnResult = jsonResult;
                    client.end();
                    console.log(jsonReturnResult);
                    callback(jsonReturnResult);
                }
            });
        }
    });
};
