function CsiMainContactTypesCreateViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;

    self.ApiBaseUri = ko.observable();

    self.CsiMainContactTypesHasError = ko.observable(false);
    self.CsiMainContactTypesError = ko.observable();

    self.CsiMainContactTypesLoading = ko.observable(false);
    self.CsiMainContactTypesList = ko.observableArray([]);

    self.apiUrl = {
        getAllContactTypeById: "api/v1/CsiMainContactTypes",
        getAllCsiMainContactTypes: "api/v1/CsiMainContactTypes",
        createContactType: "api/v1/CsiMainContactTypes",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiMainContactTypesList = function () {
        window.location.replace("../CsiMainContactTypes/list");
    };

    self.csimaincontacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self.SaveCsiMainContactTypes = function () {
        self.CsiMainContactTypesHasError(false);
        self.CsiMainContactTypesError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.name()) {
            self.CsiMainContactTypesHasError(true);
            self.CsiMainContactTypesError("Please supply a name");
            return;
        };
        if (!self.description()) {
            self.CsiMainContactTypesHasError(true);
            self.CsiMainContactTypesError("Please supply a description");
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
        ajaxAsync.ajaxPost(self, self._SaveCsiMainContactTypes, url, null, jsonObject, null, headers);
    };
    self._SaveCsiMainContactTypes = function (result) {
        if (result.success) {
            self.OpenCsiMainContactTypesList();
        } else {
            self.CsiMainContactTypesHasError(true);
            self.CsiMainContactTypesError(result.errorMessage);
        }
    };



}
