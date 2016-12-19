
window.CmpTool.configPlanGroupDependenciesColumns = function (scope) {
    var result = [
        {
            dataField: "PlanGroupId",
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
            dataField: "DependencyPlanGroupId",
            caption: "Dependency PlanGroup",
            lookup: {
                dataSource: scope.childPlanGroupDropdown,
                valueExpr: 'PlanGroupID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        { dataField: "FullPlanGroupRequired", width: 180 }
    ];
    return result;
}