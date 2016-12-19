
window.CmpTool.configPayToolsColumns = function(scope) {
    var result = [
        { dataField: "PayToolID", allowEditing: false, cssClass: 'gray', width: 150 },
        {
            dataField: "AccountID",
            caption: "L1 Reseler",
            lookup: {
                dataSource: scope.parentResellerDropdown,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 390,
            allowEditing: false
        },
        { dataField: "PayToolName", width: 160 },
        { dataField: "PaySystem", width: 160 },
        { dataField: "PluginID", width: 160 },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 120 }
    ];
    return result;
}