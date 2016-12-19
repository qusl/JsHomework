
window.CmpTool.configResellerAttributesColumns = function (scope) {
    var result = [
        { dataField: "RABID", caption: "RABID", allowEditing: false, cssClass: 'gray', width: 120 },
        {
            dataField: "ResellerID",
            caption: "L1 Reseller",
            lookup: {
                dataSource: scope.parentResellerDropdown,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 390
        },
        {
            dataField: "RADID",
            caption: "Reseller Attribute",
            lookup: {
                dataSource: scope.resellerAttributeDropdown,
                valueExpr: 'RADID',
                displayExpr: 'DispName'
            },
            width: 290
        },
        { dataField: "Value", caption: "Value", width: 390 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "Memo", caption: "Memo", width: 120 }

    ];
    return result;
}