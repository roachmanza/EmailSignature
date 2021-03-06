function ContactTypesViewViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.ContactTypesHasError = ko.observable(false);
    self.ContactTypesError = ko.observable();

    self.ContactTypesLoading = ko.observable(false);
    self.ContactTypesList = ko.observableArray([]);

	self.apiUrl = {
        getAllContactTypeById: "api/v1/ContactTypes",
        getAllContactTypes : "api/v1/ContactTypes"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model,itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenContactTypesList = function(){
        window.location.replace("../ContactTypes/list");
    }
    
    self.EditContactTypes = function(){
        window.location.replace("../ContactTypes/edit?id="+ currentId);
    }
       

    self.GetContactTypeById = function () {
        self.ContactTypesLoading(true);
        self.ContactTypesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllContactTypeById+ "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateContactTypesItem, url, null, null, null, headers);
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.emailaddress = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable(false);
    self.inactivedate = ko.observable("");
    self._populateContactTypesItem = function (result) {
        if (result.success) {
            if (result.success) {
                var data = result.data.data;
                self.contacttypeid(data[0].contacttypeid);
                self.name(data[0].name);
                self.description(data[0].description);
                self.emailaddress(data[0].emailaddress);
                self.inactive(data[0].inactive);
                self.inactivechecked(self.getInActive(data[0].inactive));
                self.inactivedate(data[0].inactivedate);
            }
        } else {
             if(result.errorMessage==="error"){
                self.ContactTypesHasError(true);
                self.ContactTypesError("");
            }else{
                self.ContactTypesHasError(true);
                self.ContactTypesError(result.errorMessage);
            }
        }
        self.ContactTypesLoading(false);
    };
    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

}
