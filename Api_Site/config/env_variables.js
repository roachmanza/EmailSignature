exports.PopulateEnvironmentSettings = function (env, callback) {

    var httpEnvAttributes = {};
    var postgresEnvAttributes = {};
    var httpresponcecodesEnvAttributes = {};
    var swaggerEnvAttributes = {};
    var parserEnvAttributes = {};

    var result = {};
    var haserror = true;
    var errormessage = "No environment found";

    //GLOBALs
    httpresponcecodesEnvAttributes = {
        "DBConnection_error": 503,
        "No_Record_found": 404,
        "Sql_error": 400,
        "Ok": 200,
        "Created": 201,
        "Deleted": 204,
        "Forbidden": 403
    };
    parserEnvAttributes = {
        "urlencoded_max": "50mb",
        "json_max": "50mb"
    };

    //SPECIFIC TO ENVIRONMENT
    if (env === "local") {
        httpEnvAttributes = {
            "http_port": 4010,
            "cors_allow_origin": "*",
            "cors_allow_methods": "GET,PUT,POST,DELETE",
            "cors_allow_headers": "Content-Type,MMI-Authorization-Claims"
        };
        postgresEnvAttributes = {
            "host": "10.0.0.2",
            "database": "MailEnhancement_Dev",
            "port": 5432,
            "user": "MailEnhancementUser",
            "password": "MailEnhancementUser"
        };
        swaggerEnvAttributes = {
            "filename": "swagger.local.json"
        }
        haserror = false;
        errormessage = "";
    }
    else if (env === "dev") {
        httpEnvAttributes = {
            "http_port": 4010,
            "cors_allow_origin": "*",
            "cors_allow_methods": "GET,PUT,POST,DELETE",
            "cors_allow_headers": "Content-Type,MMI-Authorization-Claims"
        };
        postgresEnvAttributes = {
            "host": "devtest.mmiholdings.co.za",
            "database": "MailEnhancement_Dev",
            "port": 5432,
            "user": "MailEnhancementUser",
            "password": "MailEnhancementUser"
        };
        swaggerEnvAttributes = {
            "filename": "swagger.dev.json"
        }
        haserror = false;
        errormessage = "";
    }
    else {
        //no valid env in the env file
        //the defaut results will show as an error.
    };

    if (haserror) {
        callback(result, haserror, errormessage);
    }
    else {
        result = {
            "http": httpEnvAttributes,
            "postgres": postgresEnvAttributes,
            "httpcode": httpresponcecodesEnvAttributes,
            "swagger": swaggerEnvAttributes,
            "parser": parserEnvAttributes
        };
        callback(result, haserror, errormessage);
    }


}
