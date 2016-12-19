
window.CmpTool.configResellerContentValueColumns = function(scope) {
    var result = [
        {
            dataField: "ContentId",
            caption: "Reseller Content",
            lookup: {
                dataSource: scope.resellerContentDropdown,
                valueExpr: 'ContentId',
                displayExpr: 'DispName'
            },
            width: 290
        },
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
        { dataField: "ValueIndex", caption: "ValueIndex", width: 120 },
        { dataField: "Value", caption: "Value", width: 380 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "IsActive", caption: "IsActive", width: 120 }
    ];
    return result;
}