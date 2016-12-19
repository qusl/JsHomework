
window.CmpTool.configBillingTermsMLColumns = function (scope) {
    var result = [
        {
            dataField: "BillingTermId",
            caption: "BillingTerm",
            lookup: {
                dataSource: scope.billingTermsDropdown,
                valueExpr: 'Id',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 320
        },
        {
            dataField: "Language",
            caption: "Language",
            lookup: {
                dataSource: scope.activeLanguagesDropdown,
                valueExpr: 'LCName',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 190
        },
        { dataField: "Description", caption: "Description", width: 290 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 }
    ];
    return result;
}