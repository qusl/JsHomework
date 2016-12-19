
window.CmpTool.configInternalResourcesMapColumnsOsa = function (scope) {
    var result = [
        { dataField: "ResourceID", allowEditing: false, cssClass: 'gray', width: 150 },
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
        { dataField: "ResourceName", allowEditing: false, cssClass: 'gray', width: 380 },
        { dataField: "ResourceDescription", allowEditing: false, cssClass: 'gray', width: 1280 },
        { dataField: "MinValue", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "MaxValue", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "Unit", allowEditing: false, cssClass: 'gray', width: 120 }
    ];
    return result;
}