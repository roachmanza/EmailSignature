function FieldItemsListViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    
    self.ApiBaseUri = ko.observable();

    self.FieldItemsHasError = ko.observable(false);
    self.FieldItemsError = ko.observable();

    self.FieldItemsLoading = ko.observable(false);
    self.FieldItemsList = ko.observableArray([]);

	self.apiUrl = {
        getAllFieldItems: "api/v1/FieldItems"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenFieldItems = function(){
        var id = this.fielditemid;
        console.log("Opening "+ id);
        window.location.replace("../FieldItems/view?id="+ id);
    }
    
    self.EditFieldItems = function(){
         var id = this.fielditemid;
        console.log("Opening "+ id);
        window.location.replace("../FieldItems/edit?id="+ id);
    }
    
    self.CreateFieldItems = function(){
        console.log("Create new ");
        window.location.replace("/FieldItems/create");
    }
    

    self.GetFieldItems = function () {
        self.FieldItemsLoading(true);
        self.FieldItemsList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllFieldItems;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateFieldItems, url, null, null, null, headers);
    };

    self._populateFieldItems = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.FieldItemsList.push(data[i]);
            }
        } else {
             if(result.errorMessage==="error"){
                self.FieldItemsHasError(true);
                self.FieldItemsError("");
            }else{
                self.FieldItemsHasError(true);
                self.FieldItemsError(result.errorMessage);
            }
            
            
        }
        self.FieldItemsLoading(false);
    };

    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

}
