
window.CmpTool.configDisplayCategoryColumns = function (scope) {
    var result = [
        { dataField: "CategoryID", allowEditing: false, cssClass: 'gray', width: 140 },
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
        { dataField: "CategoryName", validationRules: [{ type: "required" }], width: 280 },
        { dataField: "CategoryDescription", width: 280 },
        { dataField: "CategoryHTML", visible: false },
        {
            dataField: 'VendorId',
            caption: "Vendor Name",
            lookup: {
                dataSource: scope.vendorNameSlugDropdown,
                valueExpr: 'VendorId',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 180
        },
        {
            dataField: 'ProductId',
            caption: "Product Name",
            lookup: {
                dataSource: scope.productNameSlugDropdown,
                valueExpr: 'ProductId',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 180
        },
        { dataField: "IsParent", width: 100 },
        {
            dataField: "PermissionTypeId",
            caption: "PermissionType",
            lookup: {
                dataSource: scope.permissionTypeDropdown,
                valueExpr: 'PermissionTypeId',
                displayExpr: 'DispName'
            },
            width: 180
        },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 100 }
    ];
    return result;
}