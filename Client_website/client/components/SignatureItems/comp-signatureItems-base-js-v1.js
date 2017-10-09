function SignatureItemsListViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;

    self.ApiBaseUri = ko.observable();

    self.SignatureItemsHasError = ko.observable(false);
    self.SignatureItemsError = ko.observable();

    self.SignatureItemsLoading = ko.observable(false);
    self.SignatureItemsList = ko.observableArray([]);

    self.apiUrl = {
        getAllSignatureItemsForContactType: "api/v1/SignatureItems/ContactTypes",
        getAllContactTypes: "api/v1/ContactTypes"
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    //self.signaturesList = ko.observableArray([{ fielditemlabel: 'None', fielditemvalue : 'None' }]);
    self.signaturesList = ko.observableArray([]);
    self.ViewSignature = function () {
        self.SignatureItemsLoading(true);
        if (!self.contacttypes()) {
            self.SignatureItemsHasError(true);
            self.SignatureItemsError("Please select a contact type");
            return;
        };
        var id = self.contacttypes().contacttypeid;
        self.signaturesList.removeAll();
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        var url = self.ApiBaseUri() + self.apiUrl.getAllSignatureItemsForContactType + "/"+ id;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateSignatureItems, url, null, null, null, headers);
    };
    self._populateSignatureItems = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked = self.getInActive(data[i].inactive)
                self.signaturesList.push(data[i]);
            }
        } else {
            if (result.errorMessage === "error") {
                self.SignatureItemsHasError(true);
                self.SignatureItemsError("");
            } else {
                self.SignatureItemsHasError(true);
                self.SignatureItemsError(result.errorMessage);
            }
        }
        self.SignatureItemsLoading(false);
    };

    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if (inactiveValue === "1") {
            isckecked = true;
        }
        return isckecked;
    };



    //Get the ContactTypes dropdown
    self.availableContactTypes = ko.observableArray([{ name: 'NONE AVAILABLE' }]);
    self.contacttypes = ko.observable("");
    self.GetContactTypes = function () {
        self.availableContactTypes.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllContactTypes;
        ajaxAsync.ajaxGet(self, self._GetContactTypes, url, null, null, null, headers);
    };
    self._GetContactTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                dataItem.testvalue = data[i].Name + " " + data[i].Name
                self.availableContactTypes.push(dataItem);
            }
        }
    };
    self.getContactTypesItem = function (id) {
        for (var i = 0; i < self.availableContactTypes().length; i++) {
            var curId = self.availableContactTypes()[i].contacttypeid
            if (curId === id) {
                console.log(self.availableContactTypes()[i]);
                return self.availableContactTypes()[i];
            }
        }
    };



}
