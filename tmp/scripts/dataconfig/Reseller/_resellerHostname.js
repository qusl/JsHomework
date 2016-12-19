
window.CmpTool.configResellerHostnameColumns = function (scope) {
    var result = [
        { dataField: "RHID", caption: "RHID", allowEditing: false, cssClass: 'gray' },
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
        { dataField: "Hostname", caption: "HostName", width: 320 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "Memo", caption: "Memo" }

    ];
    return result;
}