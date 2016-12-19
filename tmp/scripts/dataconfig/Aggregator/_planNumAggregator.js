
window.CmpTool.configPlanNumAggregatorColumns = function (scope) {
    var result = [
        {
            dataField: "PlanId",
            caption: "Plan",
            lookup: {
                dataSource: scope.internalPlansDropdown,
                valueExpr: 'PlanID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 680
        },
        {
            dataField: "MasterNum",
            caption: "Master Plan",
            lookup: {
                dataSource: scope.masterPlansDropdown,
                valueExpr: 'PlanNum',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        { dataField: "PlanNum", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 220}
    ];
    return result;
}