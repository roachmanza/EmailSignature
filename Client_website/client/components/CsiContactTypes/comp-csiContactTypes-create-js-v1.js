function CsiContactTypesCreateViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;

    self.ApiBaseUri = ko.observable();

    self.CsiContactTypesHasError = ko.observable(false);
    self.CsiContactTypesError = ko.observable();

    self.CsiContactTypesLoading = ko.observable(false);
    self.CsiContactTypesList = ko.observableArray([]);

    self.apiUrl = {
        getAllContactTypeById: "api/v1/CsiContactTypes",
        getAllCsiContactTypes: "api/v1/CsiContactTypes",
        createContactType: "api/v1/CsiContactTypes",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactTypesList = function () {
        window.location.replace("../CsiContactTypes/list");
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self.SaveCsiContactTypes = function () {
        self.CsiContactTypesHasError(false);
        self.CsiContactTypesError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.name()) {
            self.CsiContactTypesHasError(true);
            self.CsiContactTypesError("Please supply a name");
            return;
        };
        if (!self.description()) {
            self.CsiContactTypesHasError(true);
            self.CsiContactTypesError("Please supply a description");
            return;
        };
        var jsonObject = JSON.stringify({
            name: self.name(),
            description: self.description(),
            inActive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.createContactType ;
        ajaxAsync.ajaxPost(self, self._SaveCsiContactTypes, url, null, jsonObject, null, headers);
    };
    self._SaveCsiContactTypes = function (result) {
        if (result.success) {
            self.OpenCsiContactTypesList();
        } else {
            self.CsiContactTypesHasError(true);
            self.CsiContactTypesError(result.errorMessage);
        }
    };



}
