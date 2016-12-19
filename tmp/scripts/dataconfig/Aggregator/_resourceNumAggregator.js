
window.CmpTool.configResourceNumAggregatorColumns = function (scope) {
    var result = [
        {
            dataField: "ResourceId",
            caption: "Resource",
            lookup: {
                dataSource: scope.internalResourcesMapDropdown,
                valueExpr: 'ResourceID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 680
        },
        {
            dataField: "MasterNum",
            caption: "Master Resource",
            lookup: {
                dataSource: scope.masterResourcesDropdown,
                valueExpr: 'ResourceNum',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        { dataField: "ResourceNum", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 220}
    ];
    return result;
}