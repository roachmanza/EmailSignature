function CsiContactCategoriesListViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    
    self.ApiBaseUri = ko.observable();

    self.CsiContactCategoriesHasError = ko.observable(false);
    self.CsiContactCategoriesError = ko.observable();

    self.CsiContactCategoriesLoading = ko.observable(false);
    self.CsiContactCategoriesList = ko.observableArray([]);

	self.apiUrl = {
        getAllCsiContactCategories: "api/v1/CsiContactCategories"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactCategories = function(){
        var id = this.csicontactcategoryid;
        console.log("Opening "+ id);
        window.location.replace("../CsiContactCategories/view?id="+ id);
    }
    
    self.EditCsiContactCategories = function(){
         var id = this.csicontactcategoryid;
        console.log("Opening "+ id);
        window.location.replace("../CsiContactCategories/edit?id="+ id);
    }
    
    self.CreateCsiContactCategories = function(){
        console.log("Create new ");
        window.location.replace("/CsiContactCategories/create");
    }
    

    self.GetCsiContactCategories = function () {
        self.CsiContactCategoriesLoading(true);
        self.CsiContactCategoriesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllCsiContactCategories;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateCsiContactCategories, url, null, null, null, headers);
    };

    self._populateCsiContactCategories = function (result) {
        if (result.success) {
            var data = result.data.data;
            
            for (var i = 0; i < data.length; i++) {
                data[i].inactivechecked=self.getInActive(data[i].inactive)
                self.CsiContactCategoriesList.push(data[i]);
            }
        } else {
             if(result.errorMessage==="error"){
                self.CsiContactCategoriesHasError(true);
                self.CsiContactCategoriesError("");
            }else{
                self.CsiContactCategoriesHasError(true);
                self.CsiContactCategoriesError(result.errorMessage);
            }
            
            
        }
        self.CsiContactCategoriesLoading(false);
    };

    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if(inactiveValue==="1"){
            isckecked  = true;
        }
        return isckecked;
    };

}
