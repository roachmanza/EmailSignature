function CsiContactTypesEditViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.CsiContactTypesHasError = ko.observable(false);
    self.CsiContactTypesError = ko.observable();

    self.CsiContactTypesLoading = ko.observable(false);
    self.CsiContactTypesList = ko.observableArray([]);

    self.apiUrl = {
        getAllContactTypeById: "api/v1/CsiContactTypes",
        getAllCsiContactTypes: "api/v1/CsiContactTypes",
        updateContactType: "api/v1/CsiContactTypes",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model, itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactTypesList = function () {
        window.location.replace("../CsiContactTypes/list");
    };

    self.OpenCsiContactTypes = function () {
        window.location.replace("../CsiContactTypes/view?id=" + currentId);
    };

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
        url = self.ApiBaseUri() + self.apiUrl.updateContactType + "/" + currentId;
        ajaxAsync.ajaxPut(self, self._SaveCsiContactTypes, url, null, jsonObject, null, headers);
    };
    self._SaveCsiContactTypes = function (result) {
        if (result.success) {
            self.OpenCsiContactTypes();
        } else {
            self.CsiContactTypesHasError(true);
            self.CsiContactTypesError(result.errorMessage);
        }
    };

    self.GetContactTypeById = function () {
        self.CsiContactTypesLoading(true);
        self.CsiContactTypesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllContactTypeById + "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateCsiContactTypesItem, url, null, null, null, headers);
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self._populateCsiContactTypesItem = function (result) {
        if (result.success) {
            if (result.success) {
                var data = result.data.data;
                self.contacttypeid(data[0].contacttypeid);
                self.name(data[0].name);
                self.description(data[0].description);
                self.inactive(data[0].inactive);
                self.inactivechecked(self.getInActive(data[0].inactive));
                self.inactivedate(data[0].inactivedate);
            }
        } else {
            if (result.errorMessage === "error") {
                self.CsiContactTypesHasError(true);
                self.CsiContactTypesError("");
            } else {
                self.CsiContactTypesHasError(true);
                self.CsiContactTypesError(result.errorMessage);
            }
        }
        self.CsiContactTypesLoading(false);
    };
    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };



}
