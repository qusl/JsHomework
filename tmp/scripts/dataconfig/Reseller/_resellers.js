
window.CmpTool.configResellerColumns = function (scope) {
    var result = [
        { dataField: "ResellerID", caption: "ReselerID", width: 130 },
        { dataField: "ResellerName", caption: "ReselerName", width: 280 },
        { dataField: "IMResellerID", caption: "IMResellerID", width: 250 },
        { dataField: "ProvisioningStatus", caption: "ProvisioningStatus", width: 220 },
        { dataField: "IsParent", caption: "IsParent", width: 120 },
        {
            dataField: "RFId",
            caption: "RFId",
            lookup: {
                dataSource: scope.activedResellerFoldersDropdown,
                valueExpr: 'RFId',
                displayExpr: 'DispName'
            },
            width: 150
        },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "Memo", caption: "Memo", width: 120 }

    ];
    return result;
}