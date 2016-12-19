
window.CmpTool.configInternalResourcesMapMLColumns = function (scope) {
    var result = [
        {
            dataField: "ResourceID",
            caption: "Resource",
            lookup: {
                dataSource: scope.internalResourcesMapDropdown,
                valueExpr: 'ResourceID',
                displayExpr: 'DispName'
            },
            width: 450
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
        { dataField: "ResourceName", caption: "ResourceName", width: 290 },
        { dataField: "ResourceDescription", caption: "ResourceDescription", width: 590 },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray', width: 220 }
        //,
        //{ dataField: "IsActive", caption: "IsActive", width: 120 },
        //{ dataField: "SortOrder", caption: "SortOrder", width: 120 }
    ];
    return result;
}