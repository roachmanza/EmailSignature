var applicationTools = {

    getDomainLoginFromPage: function () {
        return document.getElementById("muser").value;
    },
    getDomainUserNameFromPage: function () {
        var domainAndUsername = document.getElementById("muser").value;
        var arr = document.getElementById("muser").value.split("\\");
        if (arr[1] && arr[1] !== null) {
            return arr[1];
        }
        return domainAndUsername;
    },
    appAuth: {
        claimsHeader: function (claims) {
            return { "MMI-Authorization-Claims": claims.join(';') };
        },

        domainNameClaim: function (domainName) {
            return "Domain=" + domainName;
        },

        entityClaim: function (entityId) {
            return "Entity=" + entityId;
        }
    },
    baseUrl: function (env) {
        var webApiUrl = env;
        var urlError = false;

        if (env.length >= 3) {
            if (webApiUrl.toUpperCase() === "DEV") {
                webApiUrl = 'http://localhost:3000/';
            } else if (webApiUrl.toUpperCase() === "STAGING") {
                webApiUrl = 'http://localhost:3000/';
            } else if (webApiUrl.toUpperCase() === "PROD") {
                webApiUrl = 'http://localhost:3000/';
            }
            if (webApiUrl.length < 20) {
                urlError = true;
            }
        }
        if (urlError) {
            console.log("Need a web api url. Can be a full url or 'dev', 'staging', 'prod' for predefined urls.");
            return null;
        }
        return webApiUrl;
    },
    getqueryValue: function (parmName) {
        parmName = parmName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + parmName + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

var ajaxAsync = {

    AjaxData: function () {
        var success = false;
        var httpStatusCode = 0;
        var errorMessage = "";
        var data = {};
        var count = 0;
        var additionalInfo = "";
        var callbackData = null;
    },

    ajaxGet: function (context, onDoneFunction, url, token, params, callbackData, additionalHeaders) {
        return ajaxAsync.ajaxCall('GET', context, onDoneFunction, url, token, params, callbackData, additionalHeaders);
    },

    ajaxPost: function (context, onDoneFunction, url, token, params, callbackData, additionalHeaders) {
        return ajaxAsync.ajaxCall('POST', context, onDoneFunction, url, token, params, callbackData, additionalHeaders);
    },

    ajaxPut: function (context, onDoneFunction, url, token, params, callbackData, additionalHeaders) {
        return ajaxAsync.ajaxCall('PUT', context, onDoneFunction, url, token, params, callbackData, additionalHeaders);
    },

    ajaxDelete: function (context, onDoneFunction, url, token, params, callbackData, additionalHeaders) {
        return ajaxAsync.ajaxCall('DELETE', context, onDoneFunction, url, token, params, callbackData, additionalHeaders);
    },

    ajaxCall: function (method, context, onDoneFunction, url, token, params, callbackData, additionalHeaders, asyncMethod) {
        var returnData = new ajaxAsync.AjaxData();
        returnData.callbackData = callbackData;

        var requestHeaders = (token) ? {
            Authorization: "Bearer " + token
        } : {};

        if ((additionalHeaders !== undefined) && (additionalHeaders !== null)) {
            $.each(additionalHeaders, function (index, headerItem) {
                for (var attribName in headerItem) {
                    requestHeaders[attribName] = headerItem[attribName];
                }
            });
        }
        return $.ajax({
            async: true,
            type: method,
            url: url,
            headers: requestHeaders,
            contentType: 'application/json; charset=utf-8',
            context: context,
            cache: false,
            data: params,
            success: function (data) {
                returnData.success = true;
                returnData.errorMessage = data.errorMessage;
                returnData.data = data;
                returnData.additionalInfo = data.additionalInfo;
                onDoneFunction.call(context, returnData);
            },
            error: function (jqXhr, textStatus) {
                if (jqXhr.responseJSON != null) {
                    var error = jqXhr.responseJSON.Error;
                    if (error != null) {
                        returnData.success = false;
                        returnData.data = error;
                        returnData.errorCode = error.HttpStatusCode;
                        returnData.errorMessage = error.Message;
                        onDoneFunction.call(context, returnData);
                        return;
                    }
                }
                returnData.success = false;
                returnData.data = null;
                returnData.errorCode = -69000;
                returnData.errorMessage = textStatus;
                onDoneFunction.call(context, returnData);
            }
        });
    }



}