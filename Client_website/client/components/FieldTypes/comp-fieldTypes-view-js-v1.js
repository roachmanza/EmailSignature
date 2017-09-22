function FieldTypesViewViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.FieldTypesHasError = ko.observable(false);
    self.FieldTypesError = ko.observable();

    self.FieldTypesLoading = ko.observable(false);
    self.FieldTypesList = ko.observableArray([]);

	self.apiUrl = {
        getAllContactTypeById: "api/v1/FieldTypes",
        getAllFieldTypes : "api/v1/FieldTypes"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model,itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenFieldTypesList = function(){
        window.location.replace("../FieldTypes/list");
    }
    
    self.EditFieldTypes = function(){
        window.location.replace("../FieldTypes/edit?id="+ currentId);
    }
       

    self.GetFieldTypesById = function () {
        self.FieldTypesLoading(true);
        self.FieldTypesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllContactTypeById+ "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateFieldTypesItem, url, null, null, null, headers);
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self._populateFieldTypesItem = function (result) {
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
             if(result.errorMessage==="error"){
                self.FieldTypesHasError(true);
                self.FieldTypesError("");
            }else{
                self.FieldTypesHasError(true);
                self.FieldTypesError(result.errorMessage);
            }
        }
        self.FieldTypesLoading(false);
    };
    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

}
