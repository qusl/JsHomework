
window.CmpTool.configExclusivePlanGroupIdColumns = function (scope) {
    var result = [
        {
            dataField: "PlanGroupId",
            caption: "PlanGroup",
            lookup: {
                dataSource: scope.allPlanGroupDropdown,
                valueExpr: 'PlanGroupID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        {
            dataField: "ExclusivePlanGroupId",
            caption: "Exclusive PlanGroup",
            lookup: {
                dataSource: scope.allPlanGroupDropdown,
                valueExpr: 'PlanGroupID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }]
        }
    ];
    return result;
}