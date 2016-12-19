
window.CmpTool.configResellerAttributeMLColumns = function (scope) {
    var result = [
        {
            dataField: "ResellerId",
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
        { dataField: "DispValue", caption: "DispValue", width: 590 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 }
    ];
    return result;
}