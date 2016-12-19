
window.CmpTool.configPlanGroupSubscriptionPeriodsMLColumns = function (scope) {
    var result = [
        {
            dataField: "PlanGroupID",
            caption: "PlanGroup",
            lookup: {
                dataSource: scope.allPlanGroupDropdown,
                valueExpr: 'PlanGroupID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 430
        },
        { dataField: "SubscriptionPeriod", caption: "SubscriptionPeriod", width: 190 },
        { dataField: "SubscriptionPeriodType", caption: "SubscriptionPeriodType", width: 190 },
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
        { dataField: "Description", caption: "Description", width: 420 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 }
    ];
    return result;
}