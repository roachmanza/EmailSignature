function ContactTypesCreateViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;

    self.ApiBaseUri = ko.observable();

    self.ContactTypesHasError = ko.observable(false);
    self.ContactTypesError = ko.observable();

    self.ContactTypesLoading = ko.observable(false);
    self.ContactTypesList = ko.observableArray([]);

    self.apiUrl = {
        getAllContactTypeById: "api/v1/ContactTypes",
        getAllContactTypes: "api/v1/ContactTypes",
        createContactType: "api/v1/ContactTypes",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenContactTypesList = function () {
        window.location.replace("../ContactTypes/list");
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.emailaddress = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self.SaveContactTypes = function () {
        self.ContactTypesHasError(false);
        self.ContactTypesError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.name()) {
            self.ContactTypesHasError(true);
            self.ContactTypesError("Please supply a name");
            return;
        };
        if (!self.description()) {
            self.ContactTypesHasError(true);
            self.ContactTypesError("Please supply a description");
            return;
        };
        if (!self.emailaddress()) {
            self.ContactTypesHasError(true);
            self.ContactTypesError("Please supply a email address");
            return;
        };
        var jsonObject = JSON.stringify({
            name: self.name(),
            description: self.description(),
            emailAddress: self.emailaddress(),
            inActive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.createContactType ;
        ajaxAsync.ajaxPost(self, self._SaveContactTypes, url, null, jsonObject, null, headers);
    };
    self._SaveContactTypes = function (result) {
        if (result.success) {
            self.OpenContactTypesList();
        } else {
            self.ContactTypesHasError(true);
            self.ContactTypesError(result.errorMessage);
        }
    };



}
