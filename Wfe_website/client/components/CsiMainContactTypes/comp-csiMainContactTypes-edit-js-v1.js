function CsiMainContactTypesEditViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.CsiMainContactTypesHasError = ko.observable(false);
    self.CsiMainContactTypesError = ko.observable();

    self.CsiMainContactTypesLoading = ko.observable(false);
    self.CsiMainContactTypesList = ko.observableArray([]);

    self.apiUrl = {
        getAllContactTypeById: "api/v1/CsiMainContactTypes",
        getAllCsiMainContactTypes: "api/v1/CsiMainContactTypes",
        updateContactType: "api/v1/CsiMainContactTypes",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model, itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiMainContactTypesList = function () {
        window.location.replace("../CsiMainContactTypes/list");
    };

    self.OpenCsiMainContactTypes = function () {
        window.location.replace("../CsiMainContactTypes/view?id=" + currentId);
    };

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
        url = self.ApiBaseUri() + self.apiUrl.updateContactType + "/" + currentId;
        ajaxAsync.ajaxPut(self, self._SaveCsiMainContactTypes, url, null, jsonObject, null, headers);
    };
    self._SaveCsiMainContactTypes = function (result) {
        if (result.success) {
            self.OpenCsiMainContactTypes();
        } else {
            self.CsiMainContactTypesHasError(true);
            self.CsiMainContactTypesError(result.errorMessage);
        }
    };

    self.GetContactTypeById = function () {
        self.CsiMainContactTypesLoading(true);
        self.CsiMainContactTypesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllContactTypeById + "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateCsiMainContactTypesItem, url, null, null, null, headers);
    };

    self.csimaincontacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self._populateCsiMainContactTypesItem = function (result) {
        if (result.success) {
            if (result.success) {
                var data = result.data.data;
                self.csimaincontacttypeid(data[0].csimaincontacttypeid);
                self.name(data[0].name);
                self.description(data[0].description);
                self.inactive(data[0].inactive);
                self.inactivechecked(self.getInActive(data[0].inactive));
                self.inactivedate(data[0].inactivedate);
            }
        } else {
            if (result.errorMessage === "error") {
                self.CsiMainContactTypesHasError(true);
                self.CsiMainContactTypesError("");
            } else {
                self.CsiMainContactTypesHasError(true);
                self.CsiMainContactTypesError(result.errorMessage);
            }
        }
        self.CsiMainContactTypesLoading(false);
    };
    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };



}
