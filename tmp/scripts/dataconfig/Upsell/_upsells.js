
window.CmpTool.configUpsellsColumns = function(scope) {
    var result = [
        { dataField: "UpsellId", allowEditing: false, cssClass: 'gray', width: 120 },
        {
            dataField: "PlanNum",
            caption: "Plan",
            lookup: {
                dataSource: scope.internalPlansWithPlanNumDropdown,
                valueExpr: 'PlanNum',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 450
        },
        { dataField: "UpsellName", validationRules: [{ type: "required" }], width: 280 },
        { dataField: "UpsellDesc", width: 560 },
        { dataField: "IsSelectedByDefault", width: 190 },
        { dataField: "UpsellLogo", width: 280 },
        { dataField: "LearnMore", width: 260 },
        { dataField: "IsVisible", width: 130 },
        { dataField: "IsRequired", width: 140 },
        {
            dataField: "ResourceNum",
            caption: "Resource",
            lookup: {
                dataSource: scope.internalResourcesWithNumDropdown,
                valueExpr: 'ResourceNum',
                displayExpr: 'DispName'
            },
            width: 450
        },
        { dataField: "SelectorType", width: 180 },
        { dataField: "SelectorDesc", width: 200 },
        {
            dataField: "UpgradePlanNum",
            caption: "UpgradePlan",
            lookup: {
                dataSource: scope.internalPlansWithPlanNumDropdown,
                valueExpr: 'PlanNum',
                displayExpr: 'DispName'
            },
            width: 450
        },
        { dataField: "MinValue", width: 130 },
        { dataField: "MaxValue", width: 130 },
        { dataField: "Multiplier", width: 130 },
        { dataField: "DefaultQuantityValue", width: 220 },
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