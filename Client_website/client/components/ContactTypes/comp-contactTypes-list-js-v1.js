function ContactTypesListViewModel(hostThisContext) {
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
        getAllContactTypes: "api/v1/ContactTypes"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenContactTypes = function(){
        var id = this.contacttypeid;
        console.log("Opening "+ id);
        window.location.replace("../ContactTypes/view?id="+ id);
    }
    
    self.EditContactTypes = function(){
         var id = this.contacttypeid;
        console.log("Opening "+ id);
        window.location.replace("../ContactTypes/edit?id="+ id);
    }
    
    self.CreateContactTypes = function(){
        console.log("Create new ");
        window.location.replace("/ContactTypes/create");
    }
    

    self.GetContactTypes = function () {
        self.ContactTypesLoading(true);
        self.ContactTypesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllContactTypes;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateContactTypes, url, null, null, null, headers);
    };

    self._populateContactTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.ContactTypesList.push(data[i]);
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
