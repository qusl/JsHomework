
window.CmpTool.configDisplayPlanColumns = function (scope) {
    var result = [
        {
            dataField: "PlanID",
            caption: "Plan",
            lookup: {
                dataSource: scope.internalPlansWithPlanNumDropdown,
                valueExpr: 'PlanID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
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
        { dataField: "PlanNum", allowEditing: false,  cssClass: 'gray', width: 120 },
        { dataField: "Title", validationRules: [{ type: "required" }], width: 380 },
        { dataField: "Pricing", validationRules: [{ type: "required" }], width: 680 },
        //{ dataField: "ShortDescription", width: 380},
        //{ dataField: "LongDescription", width: 380 },
        { dataField: "Href", width: 420 },
        { dataField: "Icon", width: 660 },
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
        {
            dataField: "ParentPlanId",
            caption: "ParentPlan",
            lookup: {
                dataSource: scope.internalPlansWithPlanNumDropdownWithEmptyRow,
                valueExpr: 'PlanID',
                displayExpr: 'DispName'
            },
            width: 580
        },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 100 }
    ];
    return result;
}