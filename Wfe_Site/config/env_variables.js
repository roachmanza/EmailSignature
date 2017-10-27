exports.PopulateEnvironmentSettings = function (env, callback) {

    var httpEnvAttributes = {};
    var parserEnvAttributes = {};
    var fileEnvAttributes = {};

    var result = {};
    var haserror = true;
    var errormessage = "No environment found";

    //GLOBALs
    parserEnvAttributes = {
        "urlencoded_max": "50mb",
        "json_max": "50mb"
    };
    fileEnvAttributes = {
        "size_max": 307200,
        "size_max_Kb": 300,
        "allowed_type": ["image/gif", "image/png", "image/jpg"],
        "allowed_formats": ["gif", "png", "jpg"]
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
            "parser": parserEnvAttributes,
            "file": fileEnvAttributes
        };
        callback(result, haserror, errormessage);
    }


}
