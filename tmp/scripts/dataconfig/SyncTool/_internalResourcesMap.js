
window.CmpTool.configInternalResourcesMapColumns = function (scope) {
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
        { dataField: "ResourceNum", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "ResourceName", allowEditing: false, cssClass: 'gray', width: 380 },
        { dataField: "ResourceDescription", allowEditing: false, cssClass: 'gray', width: 580 },
        { dataField: "MinValue", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "MaxValue", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "Unit", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "Increment", width: 120 },
        { dataField: "ShowUnit", width: 120 },
        { dataField: "UnitOfMeasureIconCSS", width: 320 },
        { dataField: "AmountLimit", width: 150 },
        {
            dataField: "PermissionTypeId",
            caption: "PermissionType",
            validationRules: [{ type: "required" }],
            lookup: {
                dataSource: scope.permissionTypeDropdown,
                valueExpr: 'PermissionTypeId',
                displayExpr: 'DispName'
            },
            width: 180
        },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 220 },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray', width: 220 }
    ];
    return result;
}