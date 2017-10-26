exports.PopulateEnvironmentSettings = function (env, callback) {

    var httpEnvAttributes = {};
    var parserEnvAttributes = {};

    var result = {};
    var haserror = true;
    var errormessage = "No environment found";

    //GLOBALs
    parserEnvAttributes = {
        "urlencoded_max": "50mb",
        "json_max": "50mb"
    };

    //SPECIFIC TO ENVIRONMENT
    if (env === "local") {
        httpEnvAttributes = {
            "http_port": 4011
        };
        haserror = false;
        errormessage = "";
    }
    else if (env === "dev") {
        httpEnvAttributes = {
            "http_port": 4010
        };
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
            "parser": parserEnvAttributes
        };
        callback(result, haserror, errormessage);
    }


}
