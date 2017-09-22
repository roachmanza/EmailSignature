function FieldTypesCreateViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;

    self.ApiBaseUri = ko.observable();

    self.FieldTypesHasError = ko.observable(false);
    self.FieldTypesError = ko.observable();

    self.FieldTypesLoading = ko.observable(false);
    self.FieldTypesList = ko.observableArray([]);

    self.apiUrl = {
        getAllContactTypeById: "api/v1/FieldTypes",
        getAllFieldTypes: "api/v1/FieldTypes",
        createContactType: "api/v1/FieldTypes",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenFieldTypesList = function () {
        window.location.replace("../FieldTypes/list");
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self.SaveFieldTypes = function () {
        self.FieldTypesHasError(false);
        self.FieldTypesError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.name()) {
            self.FieldTypesHasError(true);
            self.FieldTypesError("Please supply a name");
            return;
        };
        if (!self.description()) {
            self.FieldTypesHasError(true);
            self.FieldTypesError("Please supply a description");
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
        ajaxAsync.ajaxPost(self, self._SaveFieldTypes, url, null, jsonObject, null, headers);
    };
    self._SaveFieldTypes = function (result) {
        if (result.success) {
            self.OpenFieldTypesList();
        } else {
            self.FieldTypesHasError(true);
            self.FieldTypesError(result.errorMessage);
        }
    };



}
