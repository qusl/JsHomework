
window.CmpTool.configBillingTermsColumns = function (scope) {
    var result = [
        { dataField: "Id", allowEditing: false, cssClass: 'gray', width: 120 },
        {
            dataField: "AccountId",
            caption: "L1 Reseler",
            lookup: {
                dataSource: scope.parentResellerDropdown,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 390,
            allowEditing: false
        },
        { dataField: "CustomerClassId", width: 180 },
        { dataField: "Description", width: 190 },
        { dataField: "BackupCreditCard", width: 200 },
        {
            dataField: "TermType",
            caption: "Term Type",
            lookup: {
                dataSource: scope.billingTermTypeDropdown,
                valueExpr: 'TermTypeId',
                displayExpr: 'DispName'
            },
            width: 230
        },
        {
            dataField: "DisplayType",
            caption: "Display Type",
            lookup: {
                dataSource: scope.billingTermDisplayTypeDropdown,
                valueExpr: 'Id',
                displayExpr: 'DispName'
            },
            width: 230
        },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 120 }
    ];
    return result;
}