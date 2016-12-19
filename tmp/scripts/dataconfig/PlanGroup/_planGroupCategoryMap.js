
window.CmpTool.configPlanGroupCategoryMapColumns = function (scope) {
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
            dataField: "ParentPlanGroupID",
            caption: "Parent PlanGroup",
            lookup: {
                dataSource: scope.parentPlanGroupDropdown,
                valueExpr: 'PlanGroupID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        { dataField: "IsActive", caption: "IsActive", width: 150 },
        { dataField: "SortOrder", caption: "SortOrder" }
    ];
    return result;
}