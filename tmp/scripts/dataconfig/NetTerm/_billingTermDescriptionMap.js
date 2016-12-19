
window.CmpTool.configBillingTermDescriptionMapColumns = function (scope) {
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
            width: 230
        },
        {
            dataField: "BillingTermDescriptionId",
            caption: "BillingTermDescription",
            lookup: {
                dataSource: scope.billingTermDescriptionDropdown,
                valueExpr: 'Id',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 780
        },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder" }
    ];
    return result;
}