
window.CmpTool.configResellerAggregatorColumns = function (scope) {
    var result = [
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
        { dataField: "AggregatorAmount", caption: "AggregatorAmount", width: 220 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "Memo", caption: "Memo" }

    ];
    return result;
}