
window.CmpTool.configMasterPlanSuggestionMLColumns = function (scope) {
    var result = [
        {
            dataField: "SourcePlanNum",
            caption: "SourcePlan",
            lookup: {
                dataSource: scope.internalPlansWithPlanNumDropdown,
                valueExpr: 'PlanNum',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        {
            dataField: "SuggestedPlanNum",
            caption: "SuggestedPlan",
            lookup: {
                dataSource: scope.internalPlansWithPlanNumDropdown,
                valueExpr: 'PlanNum',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
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
        { dataField: "Title", caption: "Title", width: 290 },
        { dataField: "Description", caption: "Description", width: 490 },
        { dataField: "Icon", caption: "Icon", width: 390 },
        { dataField: "Href", caption: "Href", width: 390 }

    ];
    return result;
}