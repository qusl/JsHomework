
window.CmpTool.configResellerAliasColumns = function (scope) {
    var result = [
        { dataField: "RAID", caption: "RAID", allowEditing: false, cssClass: 'gray', width: 120 },
        {
            dataField: "ResellerID",
            caption: "Reseller",
            lookup: {
                dataSource: scope.childResellerDropdown,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 390
        },
        {
            dataField: "AliasID",
            caption: "ALias",
            lookup: {
                dataSource: scope.parentResellerDropdown,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 390
        },
        { dataField: "NewDummy", caption: "NewDummy", width: 150 },
        { dataField: "NewPlans", caption: "NewPlans", width: 150 },
        { dataField: "NewPaytool", caption: "NewPaytool", width: 150 },
        { dataField: "NewUpsell", caption: "NewPlans", width: 150 },
        { dataField: "NewAttributes", caption: "NewAttributes", width: 180 },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 120 }
    ];
    return result;
}