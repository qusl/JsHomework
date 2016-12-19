
window.CmpTool.configPlanGroupMapsColumns = function (scope) {
    var result = [
        {
            dataField: "PlanGroupID",
            caption: "PlanGroup",
            lookup: {
                dataSource: scope.childPlanGroupDropdown,
                valueExpr: 'PlanGroupID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        {
            dataField: "PlanNum",
            caption: "Plan",
            lookup: {
                dataSource: scope.internalPlansWithPlanNumDropdown,
                valueExpr: 'PlanNum',
                displayExpr: 'DispName'
            },
            width: 580
        },
        { dataField: "IsActive", caption: "IsActive", width: 150 },
        { dataField: "SortOrder", caption: "SortOrder" }
    ];
    return result;
}