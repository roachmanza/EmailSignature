function AwdContactTypeMappingsCreateViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;

    self.ApiBaseUri = ko.observable();

    self.AwdContactTypeMappingsHasError = ko.observable(false);
    self.AwdContactTypeMappingsError = ko.observable();

    self.AwdContactTypeMappingsLoading = ko.observable(false);
    self.AwdContactTypeMappingsList = ko.observableArray([]);

    self.apiUrl = {
        getAllAwdContactTypeMappingById: "api/v1/AwdContactTypeMappings",
        getAllContactTypes: "api/v1/ContactTypes",
        createAwdContactTypeMapping: "api/v1/AwdContactTypeMappings",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenAwdContactTypeMappingsList = function () {
        window.location.replace("../AwdContactTypeMappings/list");
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.awdcontactrole = ko.observable("");
    self.awdregion = ko.observable("");
    self.inactive = ko.observable("");
    self.inactiveState = ko.observable("");
    self.SaveAwdContactTypeMappings = function () {
        self.AwdContactTypeMappingsHasError(false);
        self.AwdContactTypeMappingsError("");
        var inactive = "0";
        if (self.inactiveState() === true) {
            inactive = "1"
        }
        if (!self.contacttypes()) {
            self.AwdContactTypeMappingsHasError(true);
            self.AwdContactTypeMappingsError("Please select a contact type");
            return;
        };
        if(!self.name()){
            self.AwdContactTypeMappingsHasError(true);
            self.AwdContactTypeMappingsError("Please supply a name");
            return;
        };
        if(!self.description()){
            self.AwdContactTypeMappingsHasError(true);
            self.AwdContactTypeMappingsError("Please supply a description");
            return;
        };
        if(!self.awdcontactrole()){
            self.AwdContactTypeMappingsHasError(true);
            self.AwdContactTypeMappingsError("Please supply a awdcontactrole");
            return;
        };
        if(!self.awdregion()){
            self.AwdContactTypeMappingsHasError(true);
            self.AwdContactTypeMappingsError("Please supply a awdregion");
            return;
        };
        var jsonObject = JSON.stringify({
            contacttypeid: self.contacttypes().contacttypeid + '',
            awdregion: self.awdregion(),
            awdcontactrole: self.awdcontactrole(),
            name: self.name(),
            description: self.description(),
            inActive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.createAwdContactTypeMapping ;
        ajaxAsync.ajaxPost(self, self._SaveAwdContactTypeMappings, url, null, jsonObject, null, headers);
    };
    self._SaveAwdContactTypeMappings = function (result) {
        if (result.success) {
            self.OpenAwdContactTypeMappingsList();
        } else {
            self.AwdContactTypeMappingsHasError(true);
            self.AwdContactTypeMappingsError(result.errorMessage);
        }
    };

    //Get the person types for the dropdown
    self.availableContactTypes = ko.observableArray([{name:'NONE AVAILABLE'}]);
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
        } else {
            self.AwdContactTypeMappingsHasError(true);
            self.AwdContactTypeMappingsError(result.errorMessage);
        }
    };


}
