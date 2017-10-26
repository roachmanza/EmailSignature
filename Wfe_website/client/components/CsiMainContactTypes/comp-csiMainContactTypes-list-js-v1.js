function CsiMainContactTypesListViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    
    self.ApiBaseUri = ko.observable();

    self.CsiMainContactTypesHasError = ko.observable(false);
    self.CsiMainContactTypesError = ko.observable();

    self.CsiMainContactTypesLoading = ko.observable(false);
    self.CsiMainContactTypesList = ko.observableArray([]);

	self.apiUrl = {
        getAllCsiMainContactTypes: "api/v1/CsiMainContactTypes"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiMainContactTypes = function(){
        var id = this.csimaincontacttypeid;
        console.log("Opening "+ id);
        window.location.replace("../CsiMainContactTypes/view?id="+ id);
    }
    
    self.EditCsiMainContactTypes = function(){
         var id = this.csimaincontacttypeid;
        console.log("Opening "+ id);
        window.location.replace("../CsiMainContactTypes/edit?id="+ id);
    }
    
    self.CreateCsiMainContactTypes = function(){
        console.log("Create new ");
        window.location.replace("/CsiMainContactTypes/create");
    }
    

    self.GetCsiMainContactTypes = function () {
        self.CsiMainContactTypesLoading(true);
        self.CsiMainContactTypesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllCsiMainContactTypes;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateCsiMainContactTypes, url, null, null, null, headers);
    };

    self._populateCsiMainContactTypes = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.CsiMainContactTypesList.push(data[i]);
            }
        } else {
             if(result.errorMessage==="error"){
                self.CsiMainContactTypesHasError(true);
                self.CsiMainContactTypesError("");
            }else{
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
