
window.CmpTool.configPlanGroupSubscriptionPeriodsColumns = function (scope) {
    var result = [
        {
            dataField: "PlanGroupID",
            caption: "PlanGroup",
            lookup: {
                dataSource: scope.parentPlanGroupDropdown,
                valueExpr: 'PlanGroupID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 500
        },
        { dataField: "SubscriptionPeriod", caption: "SubscriptionPeriod", width: 200 },
        { dataField: "SubscriptionPeriodType", caption: "SubscriptionPeriodType", width: 200 },
        { dataField: "Description", caption: "Description", width: 380 },
        { dataField: "IsActive", caption: "IsActive" }
    ];
    return result;
}