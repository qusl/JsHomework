
window.CmpTool.configPaymentMethodMLColumns = function (scope) {
    var result = [
        {
            dataField: "PaymentMethodId",
            caption: "PaymentMethod",
            lookup: {
                dataSource: scope.paymentMethodsDropdown,
                valueExpr: 'Id',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 190
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
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "Description", caption: "Description" }
    ];
    return result;
}