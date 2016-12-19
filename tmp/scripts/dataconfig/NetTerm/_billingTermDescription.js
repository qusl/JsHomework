
window.CmpTool.configBillingTermDescriptionColumns = function (scope) {
    var result = [
        { dataField: "Id", allowEditing: false, cssClass: 'gray', width: 120 },
        {
            dataField: "DisplayType",
            caption: "Display Type",
            lookup: {
                dataSource: scope.billingTermDisplayTypeDropdown,
                valueExpr: 'Id',
                displayExpr: 'DispName'
            },
            width: 200
        },
        { dataField: "IsActive", width: 100 },
        { dataField: "ExtendedDescription"}
        
    ];
    return result;
}