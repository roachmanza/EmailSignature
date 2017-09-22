function CsiContactCategoriesCreateViewModel(hostThisContext) {
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
        getAllContactTypeById: "api/v1/CsiContactCategories",
        getAllCsiContactCategories: "api/v1/CsiContactCategories",
        createContactType: "api/v1/CsiContactCategories",
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model) {
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenCsiContactCategoriesList = function () {
        window.location.replace("../CsiContactCategories/list");
    };

    self.contacttypeid = ko.observable("");
    self.name = ko.observable("");
    self.description = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self.inactivedate = ko.observable("");
    self.SaveCsiContactCategories = function () {
        self.CsiContactCategoriesHasError(false);
        self.CsiContactCategoriesError("");
        var inactive = "0";
        if (self.inactivechecked() === true) {
            inactive = "1"
        };
        if (!self.name()) {
            self.CsiContactCategoriesHasError(true);
            self.CsiContactCategoriesError("Please supply a name");
            return;
        };
        if (!self.description()) {
            self.CsiContactCategoriesHasError(true);
            self.CsiContactCategoriesError("Please supply a description");
            return;
        };
        var jsonObject = JSON.stringify({
            name: self.name(),
            description: self.description(),
            inActive: inactive
        });
        console.log(jsonObject)
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim(currentDomainLogin)])];
        url = self.ApiBaseUri() + self.apiUrl.createContactType ;
        ajaxAsync.ajaxPost(self, self._SaveCsiContactCategories, url, null, jsonObject, null, headers);
    };
    self._SaveCsiContactCategories = function (result) {
        if (result.success) {
            self.OpenCsiContactCategoriesList();
        } else {
            self.CsiContactCategoriesHasError(true);
            self.CsiContactCategoriesError(result.errorMessage);
        }
    };



}
