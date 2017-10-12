function SignatureItemsCreateViewModel(hostThisContext) {
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
        getAllContactTypes: "api/v1/ContactTypes",
        getAllFieldItems: "api/v1/FieldItems",
        createSignatureItem : "api/v1/SignatureItems"
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenSignatureItemsList = function () {
        window.location.replace("../SignatureItems/list");
    };

    self.signatureitemid = ko.observable("");
    self.contacttypeid = ko.observable("");
    self.fielditemid = ko.observable("");
    self.sequence = ko.observable("");
    self.inactivedate = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");

    self.SaveSignatureItems = function () {
        self.SignatureItemsHasError(false);
        self.SignatureItemsError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.contacttypes()) {
            self.SignatureItemsHasError(true);
            self.SignatureItemsError("Please select a contact type");
            return;
        };
        if (!self.fielditems()) {
            self.SignatureItemsHasError(true);
            self.SignatureItemsError("Please select a field item");
            return;
        };
        if (!self.sequence()) {
            self.SignatureItemsHasError(true);
            self.SignatureItemsError("Please select a sequence number");
            return;
        };
        var jsonObject = JSON.stringify({
            contacttypeid: self.contacttypes().contacttypeid + '',
            fielditemid: self.fielditems().fielditemid + '',
            sequence: self.sequence() + '',
            inactive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.createSignatureItem;
        ajaxAsync.ajaxPost(self, self._SaveSignatureItems, url, null, jsonObject, null, headers);
    };
    self._SaveSignatureItems = function (result) {
        if (result.success) {
            self.OpenSignatureItemsList();
        } else {
            self.SignatureItemsHasError(true);
            self.SignatureItemsError(result.errorMessage);
        }
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

    //Get the FieldTypes dropdown
    self.availableFieldItems = ko.observableArray([{ name: 'NONE AVAILABLE' }]);
    self.fielditems = ko.observable("");
    self.GetFieldItems = function () {
        self.availableFieldItems.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.getAllFieldItems;
        ajaxAsync.ajaxGet(self, self._GetFieldItems, url, null, null, null, headers);
    };
    self._GetFieldItems = function (result) {
        if (result.success) {
            var data = result.data.data;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                self.availableFieldItems.push(dataItem);
            }
        }
    };
    self.getFieldItemsItem = function (id) {
        for (var i = 0; i < self.availableFieldItems().length; i++) {
            var curId = self.availableFieldItems()[i].fielditemid
            if (curId === id) {
                return self.availableFieldItems()[i];
            }
        }
    };

}
