
window.CmpTool.configCountryRulesColumns = function (scope) {
    var result = [
         { dataField: "AccountID", caption: "AccountID", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "CountryID", caption: "CountryID", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "TaxRegReqPers", caption: "TaxRegReqPers", allowEditing: false, cssClass: 'gray', width: 180 },
        { dataField: "AdditVerifAlgPers", caption: "AdditVerifAlgPers", allowEditing: false, cssClass: 'gray', width: 200 },
        { dataField: "TaxRegIDRegExpPers", caption: "TaxRegIDRegExpPers", allowEditing: false, cssClass: 'gray', width: 200 },
        { dataField: "TaxRegReqComp", caption: "TaxRegReqComp", allowEditing: false, cssClass: 'gray', width: 180 },
        { dataField: "AdditVerifAlgComp", caption: "AdditVerifAlgComp", allowEditing: false, cssClass: 'gray', width: 200 },
        { dataField: "TaxRegIDRegExpComp", caption: "TaxRegIDRegExpComp", allowEditing: false, cssClass: 'gray', width: 480 },
        { dataField: "StateProvinceReq", caption: "StateProvinceReq", allowEditing: false, cssClass: 'gray', width: 200 },
        { dataField: "LastModifiedTime", caption: "LastModifiedTime", allowEditing: false, cssClass: 'gray', width: 190 }
    ];
    return result;
}