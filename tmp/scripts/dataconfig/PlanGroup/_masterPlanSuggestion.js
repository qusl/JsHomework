
window.CmpTool.configMasterPlanSuggestionColumns = function (scope) {
    var result = [
        {
            dataField: "SourcePlanNum",
            caption: "SourcePlan",
            lookup: {
                dataSource: scope.internalPlansWithPlanNumDropdown,
                valueExpr: 'PlanNum',
                displayExpr: 'DispName'
            },
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
            width: 580
        },

        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "IsActive", caption: "IsActive", width: 100 },
        { dataField: "Memo", caption: "Memo", width: 150 },

        { dataField: "Icon", caption: "Icon", width: 300 },
        { dataField: "Href", caption: "Href", width: 300 },
        { dataField: "Title", caption: "Title", width: 300 },
        { dataField: "Description", caption: "Description", width: 850 }
    ];
    return result;
}