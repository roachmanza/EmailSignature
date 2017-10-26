function CsiContactCategoriesViewViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.CsiContactCategoriesHasError = ko.observable(false);
    self.CsiContactCategoriesError = ko.observable();

    self.CsiContactCategoriesLoading = ko.observable(false);
    self.CsiContactCategoriesList = ko.observableArray([]);

	self.apiUrl = {
        getAllContactTypeById: "api/v1/CsiContactCategories",
        getAllCsiContactCategories : "api/v1/CsiContactCategories"
	}
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model,itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactCategoriesList = function(){
        window.location.replace("../CsiContactCategories/list");
    }
    
    self.EditCsiContactCategories = function(){
        window.location.replace("../CsiContactCategories/edit?id="+ currentId);
    }
       

    self.GetContactTypeById = function () {
        self.CsiContactCategoriesLoading(true);
        self.CsiContactCategoriesList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllContactTypeById+ "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateCsiContactCategoriesItem, url, null, null, null, headers);
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self._populateCsiContactCategoriesItem = function (result) {
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
