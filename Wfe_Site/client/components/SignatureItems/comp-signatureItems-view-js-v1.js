function SignatureItemsViewViewModel(hostThisContext) {
    var self = this;
    self.hostContext = hostThisContext;
    var parent;
    var currentDomainLogin;
    var environment;
    var currentId;

    self.ApiBaseUri = ko.observable();

    self.SignatureItemsHasError = ko.observable(false);
    self.SignatureItemsError = ko.observable();

    self.SignatureItemsLoading = ko.observable(false);
    self.SignatureItemsList = ko.observableArray([]);

    self.apiUrl = {
        getAllSignatureItemsById: "api/v1/SignatureItems",
        getAllContactTypes: "api/v1/ContactTypes",
        getAllFieldItems: "api/v1/FieldItems"
    }
    //Initialize and get the nominations
    self.Initialize = function (env, parentContext, model, itemId) {
        currentId = itemId;
        parent = parentContext;
        environment = env;
        self.ApiBaseUri(applicationTools.baseUrl(environment));
    };

    self.OpenSignatureItemsList = function () {
        window.location.replace("../SignatureItems/list");
    }

    self.EditSignatureItems = function () {
        window.location.replace("../SignatureItems/edit?id=" + currentId);
    }


    self.GetSignatureItemById = function () {
        self.SignatureItemsLoading(true);
        self.SignatureItemsList.removeAll();
        var url = "";
        var headers = [applicationTools.appAuth.claimsHeader([applicationTools.appAuth.domainNameClaim("metmom\\roolivier")])];
        url = self.ApiBaseUri() + self.apiUrl.getAllSignatureItemsById + "/" + currentId;
        console.log("Getting all people : for " + currentDomainLogin);
        ajaxAsync.ajaxGet(self, self._populateSignatureItemsItem, url, null, null, null, headers);
    };

    self.signatureitemid = ko.observable("");
    self.contacttypeid = ko.observable("");
    self.contacttypeidname = ko.observable("");
    self.fielditemidname = ko.observable("");
    self.fielditemlabel = ko.observable("");
    self.fielditemvalue = ko.observable("");
    self.fielditemdescription= ko.observable("");
    self.fielditemid = ko.observable("");
    self.sequence = ko.observable("");
    self.inactivedate = ko.observable("");
    self.inactive = ko.observable("");
    self.inactivechecked = ko.observable("");
    self._populateSignatureItemsItem = function (result) {
        if (result.success) {
            if (result.success) {
                var data = result.data.data;
                self.signatureitemid(data[0].signatureitemid);
                self.contacttypeid(data[0].contacttypeid);
                self.fielditemid(data[0].fielditemid);
                self.sequence(data[0].sequence);

                //dropdown values
                self.contacttypeidname(data[0].contacttypeidname);
                self.fielditemidname(data[0].fielditemidname);

                self.fielditemlabel(data[0].fielditemlabel);
                self.fielditemvalue(data[0].fielditemvalue);
                self.fielditemdescription(data[0].fielditemdescription);

                
                
                

                self.inactivechecked(self.getInActive(data[0].inactive));
                self.inactivedate(data[0].inactivedate);
            }
        } else {
            if (result.errorMessage === "error") {
                self.SignatureItemsHasError(true);
                self.SignatureItemsError("");
            } else {
                self.SignatureItemsHasError(true);
                self.SignatureItemsError(result.errorMessage);
            }
        }
        self.SignatureItemsLoading(false);
    };

    self.getInActive = function (inactiveValue) {
        var isckecked = false;
        if (inactiveValue === "1") {
            isckecked = true;
        }
        return isckecked;
    };

}

