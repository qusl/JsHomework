
window.CmpTool.configBillingTermPaymentMethodMapColumns = function (scope) {
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
            width: 380
        },
        {
            dataField: "PaymentMethodId",
            caption: "PaymentMethod",
            lookup: {
                dataSource: scope.paymentMethodsDropdown,
                valueExpr: 'Id',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder" }
    ];
    return result;
}