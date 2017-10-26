function CsiContactTypesListViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    
    self.ApiBaseUri = ko.observable();

    self.CsiContactTypesHasError = ko.observable(false);
    self.CsiContactTypesError = ko.observable();

    self.CsiContactTypesLoading = ko.observable(false);
    self.CsiContactTypesList = ko.observableArray([]);

	self.apiUrl = {
        getAllCsiContactTypes: "api/v1/CsiContactTypes"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactTypes = function(){
        var id = this.csicontacttypeid;
        console.log("Opening "+ id);
        window.location.replace("../CsiContactTypes/view?id="+ id);
    }
    
    self.EditCsiContactTypes = function(){
         var id = this.csicontacttypeid;
        console.log("Opening "+ id);
        window.location.replace("../CsiContactTypes/edit?id="+ id);
    }
    
    self.CreateCsiContactTypes = function(){
        console.log("Create new ");
        window.location.replace("/CsiContactTypes/create");
    }
    

    self.GetCsiContactTypes = function () {
        self.CsiContactTypesLoading(true);
        self.CsiContactTypesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllCsiContactTypes;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateCsiContactTypes, url, null, null, null, headers);
    };

    self._populateCsiContactTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.CsiContactTypesList.push(data[i]);
            }
        } else {
             if(result.errorMessage==="error"){
                self.CsiContactTypesHasError(true);
                self.CsiContactTypesError("");
            }else{
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
